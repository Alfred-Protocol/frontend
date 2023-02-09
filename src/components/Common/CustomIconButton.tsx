import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { THEME_MAP } from './CustomButton';

interface CustomIconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactNode;
  iconDescription: string;
  theme?: 'solidPurple' | 'solidBlue' | 'transparentPurple';
  className?: string;
}

const CustomIconButton = ({
  icon,
  iconDescription,
  theme = 'solidBlue',
  className = '',
  ...props
}: CustomIconButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        `mr-2 inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium text-fuchsia-50 transition-colors focus:outline-none focus:ring-2`,
        THEME_MAP[theme],
        className
      )}
      {...props}
    >
      {icon}
      <span className="sr-only">{iconDescription}</span>
    </button>
  );
};

export default CustomIconButton;
