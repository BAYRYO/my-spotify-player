
// IMPORTANT: Replace with your own Spotify App Client ID
export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

// IMPORTANT: This must match *exactly* one of the Redirect URIs you've 
// configured in your Spotify App settings on the Spotify Developer Dashboard.
// For local development, this is typically the URL where your app is running.
export const REDIRECT_URI = window.location.origin + window.location.pathname;

export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

export const SPOTIFY_SCOPES = [
  'streaming', // Required for Web Playback SDK
  'user-read-email', // Read user's email address
  'user-read-private', // Read user's subscription details, etc.
  'playlist-read-private', // Read user's private playlists
  'playlist-read-collaborative', // Read user's collaborative playlists
  'user-modify-playback-state', // Control playback on user's devices
  'user-read-playback-state', // Read current playback state
  'user-read-currently-playing', // Read currently playing track
  'user-library-read', // Read user's saved tracks and albums
  'user-top-read' // Read user's top artists and tracks
].join(' ');

export const PKCE_LS_VERIFIER_KEY = 'pkce_code_verifier';
export const SPOTIFY_LS_TOKEN_KEY = 'spotify_access_token';
export const SPOTIFY_LS_REFRESH_TOKEN_KEY = 'spotify_refresh_token';
export const SPOTIFY_LS_EXPIRES_AT_KEY = 'spotify_token_expires_at';
