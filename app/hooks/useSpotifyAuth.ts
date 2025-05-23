
import { useState, useEffect, useCallback } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '@/app/utils/pkce';
import {
  CLIENT_ID,
  REDIRECT_URI,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  SPOTIFY_SCOPES,
  PKCE_LS_VERIFIER_KEY,
  SPOTIFY_LS_TOKEN_KEY,
  SPOTIFY_LS_REFRESH_TOKEN_KEY,
  SPOTIFY_LS_EXPIRES_AT_KEY
} from '../constants';
import { AccessTokenResponse } from '@/app/types';

// Helper function to safely access localStorage
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

// Helper function to safely set localStorage
const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// Helper function to safely remove localStorage item
const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const useSpotifyAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize state from localStorage on client-side only
  useEffect(() => {
    setToken(getLocalStorageItem(SPOTIFY_LS_TOKEN_KEY));
    setRefreshToken(getLocalStorageItem(SPOTIFY_LS_REFRESH_TOKEN_KEY));
    const storedExpiresAt = getLocalStorageItem(SPOTIFY_LS_EXPIRES_AT_KEY);
    setExpiresAt(storedExpiresAt ? Number(storedExpiresAt) : null);
    setLoading(false);
  }, []);

  const storeTokenData = useCallback((data: AccessTokenResponse) => {
    const newExpiresAt = Date.now() + data.expires_in * 1000;
    setLocalStorageItem(SPOTIFY_LS_TOKEN_KEY, data.access_token);
    setToken(data.access_token);
    if (data.refresh_token) {
      setLocalStorageItem(SPOTIFY_LS_REFRESH_TOKEN_KEY, data.refresh_token);
      setRefreshToken(data.refresh_token);
    }
    setLocalStorageItem(SPOTIFY_LS_EXPIRES_AT_KEY, newExpiresAt.toString());
    setExpiresAt(newExpiresAt);
  }, []);

  const login = useCallback(async () => {
    if (!CLIENT_ID) {
      alert('Please configure your Spotify Client ID in constants.ts');
      return;
    }
    const verifier = generateCodeVerifier(128);
    setLocalStorageItem(PKCE_LS_VERIFIER_KEY, verifier);
    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SPOTIFY_SCOPES,
      code_challenge_method: 'S256',
      code_challenge: challenge,
    });
    window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setExpiresAt(null);
    removeLocalStorageItem(SPOTIFY_LS_TOKEN_KEY);
    removeLocalStorageItem(SPOTIFY_LS_REFRESH_TOKEN_KEY);
    removeLocalStorageItem(SPOTIFY_LS_EXPIRES_AT_KEY);
    removeLocalStorageItem(PKCE_LS_VERIFIER_KEY);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      logout(); // No refresh token, force logout
      return null;
    }

    console.log('Attempting to refresh token');
    try {
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
        }),
      });

      if (!response.ok) {
        console.error('Failed to refresh token:', response.statusText);
        logout(); // Refresh failed, logout
        return null;
      }

      const data = await response.json() as AccessTokenResponse;
      storeTokenData(data);
      console.log('Token refreshed successfully');
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  }, [refreshToken, logout, storeTokenData]);


  useEffect(() => {
    const handleRedirect = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        setLoading(true);
        const verifier = getLocalStorageItem(PKCE_LS_VERIFIER_KEY);
        if (!verifier) {
          console.error('Code verifier not found in local storage.');
          logout();
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(SPOTIFY_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: CLIENT_ID,
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: REDIRECT_URI,
              code_verifier: verifier,
            }),
          });

          // Clear the code from URL and verifier from local storage
          window.history.replaceState({}, document.title, window.location.pathname);
          removeLocalStorageItem(PKCE_LS_VERIFIER_KEY);

          if (!response.ok) {
            throw new Error(`Failed to fetch token: ${response.statusText}`);
          }
          const data = await response.json() as AccessTokenResponse;
          storeTokenData(data);
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        // No code in URL, check if token is expired
        if (token && expiresAt && Date.now() > expiresAt) {
          console.log('Token expired, attempting refresh...');
          setLoading(true);
          refreshAccessToken().finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }
    };

    handleRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount to handle redirect or initial token check.

  // Set up interval to check for token expiry
  useEffect(() => {
    if (!token || !expiresAt || !refreshToken) return;

    const checkInterval = setInterval(() => {
      if (Date.now() > expiresAt - 5 * 60 * 1000) { // Refresh 5 mins before expiry
        console.log('Token nearing expiry, refreshing...');
        refreshAccessToken();
      }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [token, expiresAt, refreshToken, refreshAccessToken]);


  return { token, login, logout, loading };
};


