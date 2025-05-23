'use client';

import React from 'react';

const SpotifySDKScript: React.FC = () => {
  React.useEffect(() => {
    // Load the script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    
    // Set up the callback
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK successfully loaded.');
      document.dispatchEvent(new CustomEvent('spotify-sdk-ready'));
    };
    
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  return null;
};

export default SpotifySDKScript;