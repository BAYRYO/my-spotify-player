
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const PreviousIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 20L8 12l10-8v16zM6 4v16H4V4h2z" />
  </svg>
);

export default PreviousIcon;
