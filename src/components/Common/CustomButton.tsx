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
  titleProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
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
  titleProps,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={twMerge(
        `flex cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-transparent px-2 py-3 text-lg font-semibold text-fuchsia-50 transition-colors focus:outline-none focus:ring-2 sm:px-4 sm:py-2`,
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
        <span {...titleProps}>{title}</span>
      )}
      {rightIcon}
    </button>
  );
};

export default CustomButton;
