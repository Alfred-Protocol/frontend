import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface NormalButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active?: boolean;
  className?: string;
}

const NormalButton = ({
  children,
  active = false,
  className = '',
  ...props
}: NormalButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        `text-md rounded-lg px-6 py-2 font-semibold text-purple-100 transition-all md:px-6 md:py-2 md:text-xl`,
        active
          ? 'bg-purple-700 text-purple-100 underline hover:bg-purple-800'
          : 'bg-purple-600 hover:bg-purple-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default NormalButton;
