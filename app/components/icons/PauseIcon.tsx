
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const PauseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
  </svg>
);

export default PauseIcon;
