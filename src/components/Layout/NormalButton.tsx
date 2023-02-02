import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

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
      className={`rounded-lg px-6 py-2 md:px-6 md:py-2 font-semibold md:text-xl text-md text-purple-100 transition-all ${
        active
          ? 'bg-purple-700 text-purple-100 hover:bg-purple-800 underline'
          : 'bg-purple-600 hover:bg-purple-700'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NormalButton;
