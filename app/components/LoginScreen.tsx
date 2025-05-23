
import React from 'react';
import SpotifyLogo from './icons/SpotifyLogo'; // Assuming you have a SpotifyLogo component

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-green-900 p-6">
      <div className="text-center bg-neutral-800 bg-opacity-70 p-10 rounded-xl shadow-2xl backdrop-blur-md">
        <SpotifyLogo className="w-32 h-32 mx-auto mb-8 text-green-500" />
        <h1 className="text-4xl font-bold text-white mb-4">Spotify PWA Player</h1>
        <p className="text-neutral-300 mb-8 text-lg">
          Connect your Spotify Premium account to listen to your music.
        </p>
        <button
          onClick={onLogin}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Connect with Spotify
        </button>
        <p className="text-xs text-neutral-500 mt-8">
          This application requires a Spotify Premium account for playback.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
