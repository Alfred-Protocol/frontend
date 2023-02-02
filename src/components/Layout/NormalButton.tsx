import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface NormalButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  className?: string;
}

const NormalButton = ({
  title,
  className = '',
  ...props
}: NormalButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-lg px-6 py-2 md:px-6 md:py-2 font-semibold md:text-xl text-md text-purple-100 hover:bg-purple-700 transition-all ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default NormalButton;
