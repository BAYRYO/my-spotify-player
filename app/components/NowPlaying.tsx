
import React from 'react';
import { SpotifyTrack } from '../types';

interface NowPlayingProps {
  track: SpotifyTrack | null;
}

// Note: Most of this functionality is now within PlayerControls.
// This component can be used if a larger "Now Playing" view is desired elsewhere.
const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
  if (!track) {
    return (
      <div className="p-4 text-center text-neutral-400">
        No track is currently playing.
      </div>
    );
  }

  return (
    <div className="p-4 bg-neutral-800 rounded-lg shadow-md flex items-center space-x-4">
      {track.album.images.length > 0 && (
        <img 
          src={track.album.images[0].url} 
          alt={track.album.name} 
          className="w-24 h-24 rounded-md object-cover"
        />
      )}
      <div>
        <h3 className="text-xl font-bold text-white">{track.name}</h3>
        <p className="text-neutral-300">{track.artists.map(artist => artist.name).join(', ')}</p>
        <p className="text-sm text-neutral-400">{track.album.name}</p>
      </div>
    </div>
  );
};

export default NowPlaying;
