import type { CSSProperties } from 'react';

interface Props {
  title: string;
  onClick: () => void;
  type: 'solidPurple' | 'solidBlue';
  style: CSSProperties;
  className?: string;
}

const typeMap: { [x in string]: string } = {
  solidPurple:
    'px-7 py-2.5 bg-white rounded-md bg-solidPurpleDark hover:bg-solidPurple',
  solidBlue: 'px-4 py-2 bg-white rounded-md bg-[#413AB8]',
};

const CustomButton = ({
  title,
  onClick,
  type = 'solidBlue',
  style,
  className = '',
}: Props) => {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      className={typeMap[type] + ' ' + className}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default CustomButton;
