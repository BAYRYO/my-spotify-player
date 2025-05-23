
import React from 'react';
import PlaylistList from './PlaylistList';
import TrackList from './TrackList';
import { SpotifyPlaylist } from '@/app/types';

interface MainContentProps {
  playlists: SpotifyPlaylist[];
  onPlayPlaylist: (playlistId: string) => void;
  // We'll keep these in the interface but mark them as optional
  currentTrack?: SpotifyTrack | null;
  onPlayTrack?: (trackUri: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  playlists,
  onPlayPlaylist,
  // Not destructuring these since we're not using them
}) => {
  // This component would typically display the content of a selected playlist,
  // search results, or album details. For now, it's a placeholder.
  // The NowPlaying details are more likely part of the bottom PlayerControls bar.

  return (
    <main className="flex-1 p-8 bg-neutral-800 overflow-y-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Welcome</h2>
      <p className="text-neutral-300 mb-8">
        Select a playlist from the sidebar to start listening. The player controls will appear at the bottom once playback begins.
      </p>

      {/* Example: Displaying playlists in main content as well */}
      {playlists.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Your Playlists</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                onClick={() => onPlayPlaylist(playlist.uri)}
                className="bg-neutral-700 p-4 rounded-lg hover:bg-neutral-600 transition-colors group"
              >
                {playlist.images && playlist.images[0] ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-md mb-3"
                  />
                ) : (
                  <div className="w-full aspect-square bg-neutral-600 rounded-md mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                )}
                <h4 className="text-white font-semibold truncate group-hover:text-green-400">{playlist.name}</h4>
                <p className="text-xs text-neutral-400 truncate">{playlist.owner.display_name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder for track list / search results */}
      {/* If a playlist is selected, its tracks would be listed here */}
      {/* <div className="mt-8">
        {currentTrack && <NowPlaying track={currentTrack} />}
      </div> */}
    </main>
  );
};

export default MainContent;


