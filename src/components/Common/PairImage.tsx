import Image from 'next/image';
import type { CSSProperties } from 'react';
import logo from 'src/assets/USDT.jpg';

const PairImage = ({ style }: { style?: CSSProperties }) => {
  return (
    <div className="flex" style={style}>
      <Image src={logo} width={20} alt={''} />
      <Image className="-translate-x-2" src={logo} width={20} alt={''} />
    </div>
  );
};

export default PairImage;
