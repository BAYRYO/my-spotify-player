
import React from 'react';

interface PauseIconProps {
  className?: string;
}

const PauseIcon: React.FC<PauseIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
    </svg>
  );
};

export default PauseIcon;

