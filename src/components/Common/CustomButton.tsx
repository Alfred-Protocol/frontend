import type { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  theme: 'solidPurple' | 'solidBlue' | 'transparentPurple';
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const themeMap: Record<string, string> = {
  solidPurple: 'bg-solidPurpleDark hover:bg-solidPurple',
  solidBlue: 'bg-solidBlueDark hover:bg-solidBlue',
  transparentPurple:
    'text-white hover:bg-purpleLight bg-transparent border-purpleLight',
};

const CustomButton = ({
  title,
  theme = 'solidBlue',
  className = '',
  leftIcon,
  rightIcon,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={twMerge(
        `flex cursor-pointer items-center justify-center space-x-2 rounded-md border-2 border-transparent px-2 py-3 font-semibold text-fuchsia-50 transition-all sm:px-7 sm:py-2.5`,
        themeMap[theme],
        className
      )}
      {...props}
    >
      {leftIcon}
      <span>{title}</span>
      {rightIcon}
    </button>
  );
};

export default CustomButton;
