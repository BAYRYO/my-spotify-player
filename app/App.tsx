
import React, { useEffect, useState } from 'react';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { useSpotifyPlayer } from './hooks/useSpotifyPlayer';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerControls from './components/PlayerControls';
import { SpotifyTrack, SpotifyUser, SpotifyPlaylist } from '@/app/types';
import { spotifyApi } from './services/spotifyApi';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const { token, login, logout, loading: authLoading } = useSpotifyAuth();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const {
    player,
    deviceId,
    isPlayerReady,
    current_track: sdkTrack,
    is_paused: sdkIsPaused,
    transferPlayback,
  } = useSpotifyPlayer(token);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        setIsLoadingData(true);
        const userData = await spotifyApi.getUserProfile(token);
        setUser(userData);

        const playlistsData = await spotifyApi.getUserPlaylists(token);
        setPlaylists(playlistsData.items); // Extract the items array from the paging object
        setIsLoadingData(false);
      } catch (error: unknown) {
        console.error('Error fetching user data:', error);
        setIsLoadingData(false);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (sdkTrack) {
      setCurrentTrack({
        id: sdkTrack.id || '',
        name: sdkTrack.name,
        artists: sdkTrack.artists.map((a: { name: string; id?: string }) => ({
          name: a.name,
          id: a.id || ''
        })),
        album: {
          name: sdkTrack.album.name,
          images: sdkTrack.album.images,
          id: sdkTrack.album.id || ''
        },
        uri: sdkTrack.uri,
        duration_ms: sdkTrack.duration_ms,
      });
    }
    setIsPlaying(!sdkIsPaused);
  }, [sdkTrack, sdkIsPaused]);

  const handlePlayPlaylist = async (playlistUri: string) => {
    if (!deviceId || !token) return;
    try {
      await spotifyApi.playContext(token, deviceId, playlistUri);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing playlist:', error);
    }
  };

  const handlePlayTrack = async (trackUri: string) => {
    if (!deviceId || !token) return;
    try {
      await spotifyApi.playTracks(token, deviceId, [trackUri]);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const togglePlayPause = async () => {
    if (!player) return;
    await player.togglePlay();
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = async () => {
    if (!player) return;
    await player.nextTrack();
  };

  const playPreviousTrack = async () => {
    if (!player) return;
    await player.previousTrack();
  };

  useEffect(() => {
    // Attempt to transfer playback to this device when ready
    if (isPlayerReady && deviceId && token) {
      console.log('Player ready, attempting to transfer playback to device:', deviceId);
      // Check if any other device is active first? For now, just try to transfer.
      // This might interrupt playback on other devices. A more nuanced approach may be needed.
      // spotifyApi.transferPlayback(token, [deviceId], true); // `play: true` might be too aggressive.
    }
  }, [isPlayerReady, deviceId, token, transferPlayback]);


  if (authLoading || (token && isLoadingData)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-900">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-neutral-300">Loading your music experience...</p>
      </div>
    );
  }

  if (!token) {
    return <LoginScreen onLogin={login} />;
  }

  if (!isPlayerReady || !deviceId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-900 p-8 text-center">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-neutral-300">Initializing Spotify Player...</p>
        <p className="mt-2 text-sm text-neutral-400">
          Make sure you have Spotify open on another device or allow this app to control playback.
          If this persists, try refreshing.
        </p>
        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }


  return (
    <div className="h-screen flex flex-col bg-neutral-900">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} playlists={playlists} onPlayPlaylist={handlePlayPlaylist} onLogout={logout} />
        <MainContent
          currentTrack={currentTrack}
          playlists={playlists}
          onPlayTrack={handlePlayTrack}
          onPlayPlaylist={handlePlayPlaylist}
        />
      </div>
      {deviceId && (
        <PlayerControls
          isPlaying={isPlaying}
          onTogglePlay={togglePlayPause}
          onNext={playNextTrack}
          onPrevious={playPreviousTrack}
          currentTrack={currentTrack}
        // Add volume and seek controls later
        />
      )}
    </div>
  );
};

export default App;





