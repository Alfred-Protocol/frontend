import type { CSSProperties } from 'react';

interface Props {
  title: string;
  onClick: () => void;
  type: 'solidPurple' | 'solidBlue' | 'transparentPurple';
  style?: CSSProperties;
  className?: string;
  frontIcon?: any;
  backIcon?: any;
}

const typeMap: { [x in string]: string } = {
  solidPurple:
    'px-7 py-2.5 text-white rounded-md bg-solidPurpleDark hover:bg-solidPurple',
  solidBlue:
    'px-7 py-2.5 text-white rounded-md bg-solidBlueDark hover:bg-solidBlue',
  transparentPurple:
    'px-5 py-2.5 text-white hover:bg-pupleLight bg-transparent border-pupleLight border-2 rounded-md',
};

const CustomButton = ({
  title,
  onClick,
  type = 'solidBlue',
  style,
  className = '',
  frontIcon,
  backIcon,
}: Props) => {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      className={typeMap[type] + ' ' + className + 'flex items-center'}
      onClick={onClick}
    >
      {frontIcon && <div className="mr-2 w-6">{frontIcon}</div>}
      <div>{title}</div>
      {backIcon && <div className="ml-2 w-6">{backIcon}</div>}
    </div>
  );
};

export default CustomButton;
