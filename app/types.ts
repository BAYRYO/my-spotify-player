
export interface SpotifyUser {
  display_name: string;
  email: string;
  id: string;
  images: { url: string }[];
}

export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  uri: string;
  duration_ms: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: SpotifyImage[];
  uri: string;
  owner: { display_name: string; id: string };
  tracks: { href: string; total: number };
}

export interface SpotifyPagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyPlayerState {
  device: SpotifyDevice;
  shuffle_state: boolean;
  repeat_state: string;
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number | null;
}

export interface SpotifyDevice {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
}

// For Web Playback SDK
export interface SpotifyWebPlaybackSDKPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  getCurrentState: () => Promise<SpotifyWebPlaybackState | null>;
  getVolume: () => Promise<number>;
  nextTrack: () => Promise<void>;
  pause: () => Promise<void>;
  previousTrack: () => Promise<void>;
  resume: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  addListener: (event: string, callback: (eventData: any) => void) => boolean; // Simplified, SDK has specific event types
  removeListener: (event: string) => boolean; // Simplified
  _options: {
    id: string;
    name: string;
  };
}

export interface SpotifyWebPlaybackState {
  context: {
    uri: string | null;
    metadata: any | null;
  };
  disallows: {
    pausing?: boolean;
    peeking_next?: boolean;
    peeking_prev?: boolean;
    resuming?: boolean;
    seeking?: boolean;
    skipping_next?: boolean;
    skipping_prev?: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  track_window: {
    current_track: SpotifyWebPlaybackTrack;
    previous_tracks: SpotifyWebPlaybackTrack[];
    next_tracks: SpotifyWebPlaybackTrack[];
  };
}

export interface SpotifyWebPlaybackTrack {
  uri: string;
  id: string | null;
  type: 'track' | 'episode' | 'ad';
  media_type: 'audio' | 'video';
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: SpotifyImage[];
  };
  artists: { uri: string; name: string }[];
  duration_ms: number;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
}

// Replace any with proper types
export interface SpotifyPlayerCallback {
  (response: { device_id: string }): void;
}

export interface SpotifyPlayerErrorCallback {
  (error: Error): void;
}

