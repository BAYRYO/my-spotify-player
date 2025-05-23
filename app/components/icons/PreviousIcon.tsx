
import React from 'react';

interface PreviousIconProps {
  className?: string;
}

const PreviousIcon: React.FC<PreviousIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 6L14.5 12L6 18V6ZM16 6V18H18V6H16Z" fill="currentColor" />
    </svg>
  );
};

export default PreviousIcon;

