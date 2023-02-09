import Image, { StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';
import USDT from 'src/assets/USDT.jpg';
import ETH from 'src/assets/ETH.png';

const PairImage = ({
  style,
  logo1 = USDT,
  logo2 = ETH,
}: {
  style?: CSSProperties;
  logo1?: string | StaticImageData;
  logo2?: string | StaticImageData;
}) => {
  return (
    <div className="flex" style={style}>
      <Image src={logo1} width={24} alt={''} style={{ borderRadius: 100 }} />
      <Image
        className="-translate-x-2"
        src={logo2}
        width={24}
        alt={''}
        style={{ borderRadius: 100 }}
      />
    </div>
  );
};

export default PairImage;
