
import { useState, useEffect, useCallback, useRef } from 'react';
import { SpotifyWebPlaybackSDKPlayer, SpotifyWebPlaybackState, SpotifyWebPlaybackTrack } from '../types';

// Extend Window interface for Spotify objects
declare global {
  interface Window {
    Spotify: {
      Player: new (options: PlayerOptions) => SpotifyWebPlaybackSDKPlayer;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface PlayerOptions {
  name: string;
  getOAuthToken: (cb: (token: string) => void) => void;
  volume?: number;
}

export const useSpotifyPlayer = (accessToken: string | null) => {
  const playerRef = useRef<SpotifyWebPlaybackSDKPlayer | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [current_track, setCurrentTrack] = useState<SpotifyWebPlaybackTrack | null>(null);
  const [is_paused, setIsPaused] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const transferPlayback = useCallback(async (play: boolean = false) => {
    if (deviceId && accessToken) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player`, {
          method: 'PUT',
          body: JSON.stringify({ device_ids: [deviceId], play }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        console.log(`Playback transferred to device ${deviceId}`);
      } catch (error) {
        console.error('Error transferring playback:', error);
      }
    }
  }, [deviceId, accessToken]);

  useEffect(() => {
    const initializePlayer = () => {
      if (!accessToken || !window.Spotify) {
        console.log('Spotify SDK not loaded or no access token.');
        return;
      }
      
      if (playerRef.current) {
        console.log('Player already initialized.');
        // Potentially update token if it changed? SDK handles this internally via getOAuthToken
        return;
      }

      const player = new window.Spotify.Player({
        name: 'Spotify PWA Player',
        getOAuthToken: (cb) => {
          // This callback will be called by the SDK when it needs a new token
          // or to verify the current one.
          if (accessToken) {
            cb(accessToken);
          } else {
            // Handle case where token is null (e.g., after logout)
            // cb(''); // Or handle error, SDK might disconnect
            console.warn('getOAuthToken called but accessToken is null');
          }
        },
        volume: 0.5, // Default volume
      });

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Spotify Player Ready with Device ID:', device_id);
        setDeviceId(device_id);
        setIsPlayerReady(true);
      });

      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline:', device_id);
        setIsPlayerReady(false);
        setDeviceId(null);
      });

      player.addListener('initialization_error', ({ message }: { message: string }) => {
        console.error('Failed to initialize Spotify Player:', message);
        setIsPlayerReady(false);
      });

      player.addListener('authentication_error', ({ message }: { message: string }) => {
        console.error('Authentication error with Spotify Player:', message);
        setIsPlayerReady(false);
        // Potentially trigger logout or token refresh here
      });

      player.addListener('account_error', ({ message }: { message: string }) => {
        console.error('Account error with Spotify Player:', message);
        // E.g. premium required
        setIsPlayerReady(false);
      });

      player.addListener('player_state_changed', (state: SpotifyWebPlaybackState | null) => {
        if (!state) {
          // This can happen e.g. if playback is stopped on all devices
          // or if the player is not active on this device.
          console.warn('Player state is null. Playback might be inactive on this device.');
          // setCurrentTrack(null); // Keep last track or clear?
          // setIsPaused(true);
          // Consider if this device is still the active one.
          return;
        }
        
        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);
        setPosition(state.position);
        setDuration(state.duration);
        console.log('Player state changed:', state);
      });
      
      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        } else {
          console.error('The Web Playback SDK failed to connect to Spotify.');
        }
      }).catch(error => {
        console.error('Error connecting Web Playback SDK:', error);
      });

      playerRef.current = player;
    };
    
    const handleSdkReady = () => {
      console.log('spotify-sdk-ready event received');
      initializePlayer();
    };

    if (window.Spotify) { // SDK might be loaded already
       initializePlayer();
    } else { // Wait for the SDK to load
      document.addEventListener('spotify-sdk-ready', handleSdkReady);
    }
    
    return () => {
      document.removeEventListener('spotify-sdk-ready', handleSdkReady);
      if (playerRef.current) {
        console.log('Disconnecting player');
        playerRef.current.disconnect();
        playerRef.current = null; // Clear ref
      }
      setIsPlayerReady(false);
      setDeviceId(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]); // Re-initialize if accessToken changes

  return { 
    player: playerRef.current, 
    isPlayerReady, 
    deviceId, 
    current_track, 
    is_paused,
    position,
    duration,
    transferPlayback
  };
};
