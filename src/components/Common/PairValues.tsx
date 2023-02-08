import type { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PairValueProps {
  field: string;
  value: string;
  valueClassName?: string;
  endComponent?: ReactNode;
  style?: CSSProperties;
}

const PairValue = ({
  field,
  value,
  endComponent,
  style,
  valueClassName,
}: PairValueProps) => {
  return (
    <div className="flex items-center sm:text-xl" style={style}>
      <p className="pr-2 font-bold">{field}:</p>
      <p className={twMerge('slashed-zero', valueClassName)}>{value}</p>
      {endComponent}
    </div>
  );
};

export default PairValue;
