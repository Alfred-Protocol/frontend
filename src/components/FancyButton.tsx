import { ReactNode } from 'react';
import { text } from 'stream/consumers';

interface FancyButtonProps {
  className?: string;
  children?: ReactNode;
}

const FancyButton = ({ className, children }: FancyButtonProps) => {
  return (
    <button
      className={`bg-button rounded-lg px-8 py-3 shadow-xl font-bold text-xl hover:opacity-80 transition-all text-purple-900 ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;
