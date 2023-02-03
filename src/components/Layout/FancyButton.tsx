import Link from 'next/link';
import type { ReactNode } from 'react';

interface FancyButtonProps {
  className?: string;
  isLink?: boolean;
  href?: string;
  children?: ReactNode;
}

const FancyButton = ({
  className = '',
  isLink,
  href,
  children,
}: FancyButtonProps) => {
  if (isLink) {
    return (
      <Link
        className={`bg-button rounded-lg px-6 py-2 md:px-8 md:py-3 shadow-xl font-bold md:text-xl text-md hover:opacity-80 transition-all text-purple-900 ${className}`}
        href={href!}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`bg-button rounded-lg px-6 py-2 md:px-8 md:py-3 shadow-xl font-bold md:text-xl text-md hover:opacity-80 transition-all text-purple-900 ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;
