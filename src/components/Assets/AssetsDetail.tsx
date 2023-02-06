import PairValue from '../Common/PairValues';
import type { FundDetailsProps } from '../Funds/FundDetails';
import FundTableList from '../Funds/FundTableList';
// import ETH from 'src/components/Assets/ETH.png';
import USDT from 'src/assets/USDT.jpg';
import ETH from 'src/assets/ETH.png';

import Image from 'next/image';
import CustomButton from '../Common/CustomButton';
import type { LPPosition } from '@/types/type';

interface AssetsDetailProps {
  totalValueLocked: number;
  matureDate: string;
  startDate: string;
  yieldPercentage: number;
  logo1: any;
  logo2: any;
  fundName: string;
  lpPositions: LPPosition[];
  amount0: number;
  amount1: number;
}

const AssetsDetail = ({
  totalValueLocked = 32,
  matureDate = '05/03/2023',
  startDate = '01/02/2023',
  yieldPercentage = 20.4,
  logo1 = ETH,
  logo2 = USDT,
  fundName = 'Fund A',
  lpPositions = [],
  amount0,
  amount1,
}: AssetsDetailProps) => {
  return (
    <div className="relative flex w-3/5 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-white">
      <CustomButton
        title="Add Position"
        type="solidPurple"
        className="absolute right-5 top-5"
        onClick={() => {}}
      />
      <div className="mr-12 text-left">
        <p className="mb-2 text-2xl sm:text-3xl">{fundName}</p>
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
            <p className="text-2xl">{amount0.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Image
              src={logo2}
              width={40}
              alt={''}
              style={{ borderRadius: 100 }}
            />
            <p className="text-2xl">{amount1.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex-1">
          <FundTableList data={lpPositions} />
        </div>
      </div>
    </div>
  );
};

export default AssetsDetail;
