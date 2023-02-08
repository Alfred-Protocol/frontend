import { Spinner } from 'flowbite-react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  theme: 'solidPurple' | 'solidBlue' | 'transparentPurple';
  className?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const THEME_MAP: Record<string, string> = {
  solidPurple: 'bg-solidPurpleDark hover:bg-solidPurple focus:ring-blue-400',
  solidBlue: 'bg-solidBlueDark hover:bg-solidBlue focus:ring-blue-400',
  transparentPurple:
    'hover:bg-purpleLight bg-transparent border-purpleLight focus:ring-blue-400',
};

const CustomButton = ({
  title,
  theme = 'solidBlue',
  className = '',
  isLoading,
  leftIcon,
  rightIcon,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={twMerge(
        `flex cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-transparent px-2 py-3 font-semibold text-fuchsia-50 transition-all focus:outline-none focus:ring-2 sm:px-7 sm:py-2.5`,
        isLoading ? 'cursor-not-allowed opacity-70' : '',
        THEME_MAP[theme],
        className
      )}
      {...props}
    >
      {leftIcon}
      {isLoading ? (
        <Spinner className="fill-white text-transparent" />
      ) : (
        <span>{title}</span>
      )}
      {rightIcon}
    </button>
  );
};

export default CustomButton;
