
import React from 'react';
import { SpotifyUser, SpotifyPlaylist } from '../types';
import SpotifyLogo from './icons/SpotifyLogo';

interface SidebarProps {
  user: SpotifyUser | null;
  playlists: SpotifyPlaylist[];
  onPlayPlaylist: (playlistUri: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, playlists, onPlayPlaylist, onLogout }) => {
  return (
    <div className="w-64 bg-black p-6 flex flex-col space-y-6 h-full overflow-y-auto">
      <div>
        <div className="flex items-center space-x-3 mb-6">
           <SpotifyLogo className="w-10 h-10 text-green-500" />
           <h1 className="text-2xl font-bold text-white">Spotify PWA</h1>
        </div>
        {user && (
          <div className="mb-6 p-3 bg-neutral-800 rounded-lg">
            <div className="flex items-center space-x-3">
              {user.images && user.images[0] ? (
                <img src={user.images[0].url} alt={user.display_name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-semibold">
                  {user.display_name?.[0]?.toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white truncate" title={user.display_name}>{user.display_name}</p>
                <p className="text-xs text-neutral-400 truncate" title={user.email}>{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-grow">
        <h2 className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-3 px-1">Playlists</h2>
        <ul className="space-y-1">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <button
                onClick={() => onPlayPlaylist(playlist.uri)}
                className="w-full text-left px-3 py-2 text-neutral-300 hover:bg-neutral-700 hover:text-white rounded-md transition-colors duration-150 truncate"
                title={playlist.name}
              >
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
