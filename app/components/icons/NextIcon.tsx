
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const NextIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 4l10 8-10 8V4zm11 0v16h2V4h-2z" />
  </svg>
);

export default NextIcon;
