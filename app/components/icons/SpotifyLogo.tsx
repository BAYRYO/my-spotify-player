
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const SpotifyLogo: React.FC<IconProps> = (props) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor"
    {...props}
  >
    <title>Spotify</title>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.383 17.398c-.232.359-.75.483-1.109.25L12 14.122l-5.273 3.525c-.359.232-.877.108-1.109-.25-.231-.359-.108-.877.25-1.109L11.14 12.53l-4.999-3.757c-.359-.232-.483-.75-.25-1.109.232-.359.75-.483 1.109-.25L12 11.137l5.273-3.723c.359-.232.877-.108 1.109.25.231.359.108.877-.25 1.109L12.86 12.53l4.999 3.757c.358.232.482.75.224 1.111z"/>
  </svg>
);

export default SpotifyLogo;
