
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const PlayIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 4l15 8-15 8z" />
  </svg>
);

export default PlayIcon;
