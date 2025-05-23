
import React from 'react';

interface NextIconProps {
  className?: string;
}

const NextIcon: React.FC<NextIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 18V6H8V18H6ZM9.5 12L18 6V18L9.5 12Z" fill="currentColor" />
    </svg>
  );
};

export default NextIcon;


