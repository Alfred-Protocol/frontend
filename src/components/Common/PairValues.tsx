import type { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PairValueProps {
  field: string;
  value: string;
  valueClassName?: string;
  containerClassName?: string;
  endComponent?: ReactNode;
  style?: CSSProperties;
}

const PairValue = ({
  field,
  value,
  endComponent,
  style,
  valueClassName,
  containerClassName,
}: PairValueProps) => {
  return (
    <div
      className={twMerge('flex items-center sm:text-xl', containerClassName)}
      style={style}
    >
      <span className="pr-2 font-bold">{field}:</span>
      <span className={twMerge('slashed-zero', valueClassName)}>{value}</span>
      {endComponent}
    </div>
  );
};

export default PairValue;
