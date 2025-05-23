
import React from 'react';
import { SpotifyPlaylist } from '../types';

interface PlaylistListProps {
  playlists: SpotifyPlaylist[];
  onPlaylistSelect: (playlistId: string, playlistUri: string) => void;
}

// Note: This functionality is largely handled by Sidebar and potentially MainContent.
// This component is kept for conceptual separation or if a dedicated list view is needed.
const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onPlaylistSelect }) => {
  if (playlists.length === 0) {
    return <p className="text-neutral-400">No playlists found.</p>;
  }

  return (
    <ul className="space-y-2">
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <button
            onClick={() => onPlaylistSelect(playlist.id, playlist.uri)}
            className="w-full text-left p-3 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
          >
            <div className="flex items-center space-x-3">
              {playlist.images[0] && (
                <img src={playlist.images[0].url} alt={playlist.name} className="w-12 h-12 rounded" />
              )}
              <div>
                <p className="font-semibold text-white">{playlist.name}</p>
                <p className="text-sm text-neutral-300">{playlist.owner.display_name}</p>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistList;
