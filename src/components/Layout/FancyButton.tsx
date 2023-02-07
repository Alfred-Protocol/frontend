import Link from 'next/link';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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
        className={twMerge(
          `text-md rounded-lg bg-button px-6 py-2 font-bold text-purple-900 shadow-xl transition-all hover:opacity-80 md:px-8 md:py-3 md:text-xl`,
          className
        )}
        href={href!}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={twMerge(
        `text-md rounded-lg bg-button px-6 py-2 font-bold text-purple-900 shadow-xl transition-all hover:opacity-80 md:px-8 md:py-3 md:text-xl`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default FancyButton;
