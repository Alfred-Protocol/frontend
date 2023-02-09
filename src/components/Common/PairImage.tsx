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
        className="rounded-full"
        width={20}
        height={20}
        alt={'ETH'}
      />
      <Image
        className="-translate-x-2 rounded-full"
        src={logo2}
        width={20}
        height={20}
        alt={'WMATIC'}
      />
    </div>
  );
};

export default PairImage;
