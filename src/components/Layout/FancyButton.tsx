import { ReactNode } from 'react';
import { text } from 'stream/consumers';

interface FancyButtonProps {
  className?: string;
  children?: ReactNode;
}

const FancyButton = ({ className, children }: FancyButtonProps) => {
  return (
    <button
      className={`bg-button rounded-lg px-6 py-2 md:px-8 md:py-3 shadow-xl font-bold md:text-xl text-md hover:opacity-80 transition-all text-purple-900 ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;
