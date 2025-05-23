
import React from 'react';
import { SpotifyTrack } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import NextIcon from './icons/NextIcon';
import PreviousIcon from './icons/PreviousIcon';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentTrack: SpotifyTrack | null;
  // Add progress, volume later
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious,
  currentTrack,
}) => {
  const trackName = currentTrack?.name ?? 'No track selected';
  const artistName = currentTrack?.artists?.map(a => a.name).join(', ') ?? 'Spotify PWA';
  const albumArtUrl = currentTrack?.album?.images?.[0]?.url;

  return (
    <footer className="bg-neutral-800 border-t border-neutral-700 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3 w-1/3">
        {albumArtUrl ? (
          <img src={albumArtUrl} alt={currentTrack?.album?.name} className="w-14 h-14 rounded" />
        ) : (
          <div className="w-14 h-14 rounded bg-neutral-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-white truncate" title={trackName}>{trackName}</p>
          <p className="text-xs text-neutral-400 truncate" title={artistName}>{artistName}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevious}
            className="text-neutral-400 hover:text-white transition-colors p-2"
            aria-label="Previous track"
          >
            <PreviousIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onTogglePlay}
            className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform shadow-md"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={onNext}
            className="text-neutral-400 hover:text-white transition-colors p-2"
            aria-label="Next track"
          >
            <NextIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Progress bar placeholder */}
        {/* <div className="w-full max-w-xs h-1 bg-neutral-600 rounded-full mt-2">
          <div className="h-1 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
        </div> */}
      </div>
      
      <div className="w-1/3 flex justify-end items-center">
        {/* Volume control placeholder */}
        {/* <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          <input type="range" min="0" max="100" defaultValue="50" className="w-24 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
        </div> */}
      </div>
    </footer>
  );
};

export default PlayerControls;
