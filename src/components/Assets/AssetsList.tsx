import PairValue from '../Common/PairValues';
import type { FundDetailsProps } from '../Funds/FundDetails';
import FundTableList from '../Funds/FundTableList';
// import ETH from 'src/components/Assets/ETH.png';
import USDT from 'src/assets/USDT.jpg';
import ETH from 'src/assets/ETH.png';

import Image from 'next/image';

const AssetsList = ({
  fundAddress,
  isLoading,
  tokenA,
  tokenB,
  tvlSymbol,
  totalValueLocked = '32',
  matureDate = '05/03/2023',
  startDate = '01/02/2023',
  manager,
  description,
  yieldPercentage = 20.4,
  logo1 = ETH,
  logo2 = USDT,
}: FundDetailsProps) => {
  return (
    <div className="flex w-3/5 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <div className="mr-12 text-left">
        <p className="mb-2 text-2xl sm:text-3xl">Fund A</p>
        <PairValue field="TVL" value={totalValueLocked + ' ETH'} />
        <div className="flex items-center space-x-2">
          <p className="font-semibold sm:text-xl">Yield:</p>
          <p className="text-greenGrowth">{yieldPercentage}%</p>
        </div>
        <PairValue field="Start Date" value={startDate} />
        <PairValue
          field="Mature Date"
          value={matureDate}
          style={{ marginBottom: 5 }}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-1 space-x-6">
          <div className="flex items-center justify-center space-x-2">
            <Image
              src={logo1}
              width={40}
              alt={''}
              style={{ borderRadius: 100 }}
            />
            <p className="text-2xl">2.00</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Image
              src={logo2}
              width={40}
              alt={''}
              style={{ borderRadius: 100 }}
            />
            <p className="text-2xl">2,000.10</p>
          </div>
        </div>
        <div className="flex-1">
          <FundTableList />
        </div>
      </div>
    </div>
  );
};

export default AssetsList;
