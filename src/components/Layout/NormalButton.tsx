import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

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
      className={`rounded-lg px-6 py-2 md:px-6 md:py-2 font-bold md:text-xl text-md bg-purple-200 text-purple-900 hover:bg-purple-300 transition-all ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default NormalButton;
