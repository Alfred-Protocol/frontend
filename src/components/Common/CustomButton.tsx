import type { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  title: string;
  onClick: () => void;
  theme: 'solidPurple' | 'solidBlue' | 'transparentPurple';
  style?: CSSProperties;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const themeMap: Record<string, string> = {
  solidPurple: 'bg-solidPurpleDark hover:bg-solidPurple',
  solidBlue: 'bg-solidBlueDark hover:bg-solidBlue',
  transparentPurple:
    'text-white hover:bg-purpleLight border-2 bg-transparent border-purpleLight',
};

const CustomButton = ({
  title,
  onClick,
  theme = 'solidBlue',
  style,
  className = '',
  leftIcon,
  rightIcon,
}: Props) => {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      className={twMerge(
        `flex items-center justify-center space-x-2 rounded-md border-2 border-transparent px-2 py-3 font-semibold text-fuchsia-50 transition-all sm:px-7 sm:py-2.5`,
        themeMap[theme],
        className
      )}
      onClick={onClick}
    >
      {leftIcon}
      <span>{title}</span>
      {rightIcon}
    </div>
  );
};

export default CustomButton;
