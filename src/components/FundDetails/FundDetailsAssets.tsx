import USDT from 'src/assets/USDT.jpg';
import ETH from 'src/assets/ETH.png';
import Image from 'next/image';

interface Props {
  logo0: any;
  logo1: any;
  freeAmount0: number;
  freeAmount1: number;
  lockedAmount0: number;
  lockedAmount1: number;
}

const renderSection = ({
  logo0,
  logo1,
  amount0,
  amount1,
}: {
  logo0: any;
  logo1: any;
  amount0: number;
  amount1: number;
}) => {
  return (
    <>
      <div className="mb-2 flex items-center space-x-2">
        <Image src={logo0} width={48} alt={''} style={{ borderRadius: 100 }} />
        <p className="text-3xl">{amount0}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Image src={logo1} width={48} alt={''} style={{ borderRadius: 100 }} />
        <p className="mb-2 text-3xl">{amount1}</p>
      </div>
    </>
  );
};

const FundDetailAssets = ({
  logo0 = USDT,
  logo1 = ETH,
  freeAmount0,
  freeAmount1,
  lockedAmount0,
  lockedAmount1,
}: Props) => {
  return (
    <div className="flex-1 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <div className="mb-2 text-3xl font-bold">Assets</div>
      <div className="flex">
        <div className="flex-1">
          <div className="mb-2 font-semibold text-grayDark">FREE</div>
          {renderSection({
            logo0,
            logo1,
            amount0: freeAmount0,
            amount1: freeAmount1,
          })}
        </div>
        <div className="flex-1">
          <div className="mb-2 font-semibold text-grayDark">LOCKED</div>
          {renderSection({
            logo0,
            logo1,
            amount0: lockedAmount0,
            amount1: lockedAmount1,
          })}
        </div>
      </div>
    </div>
  );
};

export default FundDetailAssets;
