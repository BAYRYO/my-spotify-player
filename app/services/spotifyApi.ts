
import { SPOTIFY_API_BASE_URL } from '../constants';
import { SpotifyUser, SpotifyPagingObject, SpotifyPlaylist, SpotifyTrack } from '../types';

const makeRequest = async <T,>(endpoint: string, token: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${SPOTIFY_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    console.error('Spotify API Error:', response.status, errorData);
    const err = new Error(errorData.error?.message || response.statusText) as any;
    err.status = response.status;
    throw err;
  }
  // For 204 No Content, response.json() will fail.
  if (response.status === 204) {
    return undefined as unknown as T; // Or an appropriate empty response
  }
  return response.json() as Promise<T>;
};

export const spotifyApi = {
  getUserProfile: (token: string): Promise<SpotifyUser> => {
    return makeRequest<SpotifyUser>('/me', token);
  },

  getUserPlaylists: (token: string, limit: number = 20, offset: number = 0): Promise<SpotifyPagingObject<SpotifyPlaylist>> => {
    return makeRequest<SpotifyPagingObject<SpotifyPlaylist>>(`/me/playlists?limit=${limit}&offset=${offset}`, token);
  },

  getPlaylistTracks: (token: string, playlistId: string): Promise<SpotifyPagingObject<SpotifyTrack>> => {
    // Note: Spotify API returns playlist track objects which are slightly different.
    // This is a simplified version. You might need to map { track: SpotifyTrack } objects.
    return makeRequest<SpotifyPagingObject<SpotifyTrack>>(`/playlists/${playlistId}/tracks`, token);
  },

  playContext: (token: string, deviceId: string, contextUri: string, offset?: { uri?: string, position?: number }): Promise<void> => {
    const body: { context_uri: string, offset?: any, position_ms?: number } = { context_uri: contextUri };
    if (offset) {
      if (offset.uri) body.offset = { uri: offset.uri };
      else if (offset.position !== undefined) body.offset = { position: offset.position };
    }
    return makeRequest<void>(`/me/player/play?device_id=${deviceId}`, token, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  playTracks: (token: string, deviceId: string, trackUris: string[], positionMs?: number): Promise<void> => {
    const body: { uris: string[], position_ms?: number } = { uris: trackUris };
    if (positionMs) {
      body.position_ms = positionMs;
    }
    return makeRequest<void>(`/me/player/play?device_id=${deviceId}`, token, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  pausePlayback: (token: string, deviceId: string): Promise<void> => {
    return makeRequest<void>(`/me/player/pause?device_id=${deviceId}`, token, {
      method: 'PUT',
    });
  },

  resumePlayback: (token: string, deviceId: string): Promise<void> => {
    return makeRequest<void>(`/me/player/play?device_id=${deviceId}`, token, {
      method: 'PUT',
    });
  },

  nextTrack: (token: string, deviceId: string): Promise<void> => {
    return makeRequest<void>(`/me/player/next?device_id=${deviceId}`, token, {
      method: 'POST',
    });
  },

  previousTrack: (token: string, deviceId: string): Promise<void> => {
    return makeRequest<void>(`/me/player/previous?device_id=${deviceId}`, token, {
      method: 'POST',
    });
  },

  transferPlayback: (token: string, deviceIds: string[], play: boolean = false): Promise<void> => {
    return makeRequest<void>('/me/player', token, {
      method: 'PUT',
      body: JSON.stringify({ device_ids: deviceIds, play }),
    });
  },
  
  search: async <T,>(token: string, query: string, type: string | string[], limit: number = 20): Promise<T> => {
    const typeString = Array.isArray(type) ? type.join(',') : type;
    const params = new URLSearchParams({
      q: query,
      type: typeString,
      limit: limit.toString(),
    });
    return makeRequest<T>(`/search?${params.toString()}`, token);
  },
};
