
import React from 'react';
import { SpotifyTrack } from '@/app/types';

interface TrackItemProps {
  track: SpotifyTrack;
  onPlayTrack: (trackUri: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onPlayTrack }) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <button
      onClick={() => onPlayTrack(track.uri)}
      className="w-full flex items-center p-3 hover:bg-neutral-700 rounded-md transition-colors group"
    >
      {track.album.images[0] ? (
        <img src={track.album.images[0].url} alt={track.album.name} className="w-10 h-10 rounded mr-3" />
      ) : (
        <div className="w-10 h-10 rounded bg-neutral-600 mr-3 flex items-center justify-center text-neutral-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
        </div>
      )}
      <div className="flex-1 text-left">
        <p className="text-sm text-white truncate group-hover:text-green-400">{track.name}</p>
        <p className="text-xs text-neutral-400 truncate">
          {track.artists.map(a => a.name).join(', ')}
        </p>
      </div>
      <p className="text-xs text-neutral-400 ml-3">{formatDuration(track.duration_ms)}</p>
    </button>
  );
};

export default TrackItem;
