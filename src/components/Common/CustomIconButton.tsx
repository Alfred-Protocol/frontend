import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomIconButtonProps {
  icon: ReactNode;
  iconDescription: string;
  className?: string;
}

const CustomIconButton = ({
  icon,
  iconDescription,
  className = '',
}: CustomIconButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        `mr-2 inline-flex items-center rounded-lg border-solidBlue bg-solidBlueDark p-2.5 text-center text-sm font-medium text-white transition-all hover:border-solidBlueDark hover:bg-blue-800 hover:bg-solidBlue focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-solidBlue dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
        className
      )}
    >
      {icon}
      <span className="sr-only">{iconDescription}</span>
    </button>
  );
};

export default CustomIconButton;
