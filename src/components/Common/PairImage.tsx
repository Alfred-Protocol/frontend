import Image, { StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';

const PairImage = ({
  style,
  logo1 = '/WMATIC.png',
  logo2 = '/ETH.png',
}: {
  style?: CSSProperties;
  logo1?: string | StaticImageData;
  logo2?: string | StaticImageData;
}) => {
  return (
    <div className="flex" style={style}>
      <Image
        src={logo1}
        width={24}
        height={24}
        alt={'ETH'}
        style={{ borderRadius: 100 }}
      />
      <Image
        className="-translate-x-2"
        src={logo2}
        width={24}
        height={24}
        alt={'WMATIC'}
        style={{ borderRadius: 100 }}
      />
    </div>
  );
};

export default PairImage;
