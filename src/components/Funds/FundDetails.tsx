import FundCreate from '@/pages/funds/create';
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomButton from '../Common/CustomButton';
import PairValue from '../Common/PairValues';
import FundTable from '../FundDetails/FundTable';
import Spinner from '../Layout/Spinner';
import FundTableList from './FundTableList';

export interface FundDetailsProps {
  tokenA: string;
  tokenB: string;
  isLoading: boolean;
  fundAddress: string;
  tvlSymbol: string;
  totalValueLocked: string;
  startDate: string;
  matureDate: string;
  manager: string;
  description: string;
  yieldPercentage: number;
}

const FundDetails = ({
  fundAddress,
  isLoading,
  tokenA,
  tokenB,
  tvlSymbol,
  totalValueLocked,
  matureDate,
  startDate,
  manager,
  description,
  yieldPercentage = 20.4,
}: FundDetailsProps) => {
  const router = useRouter();
  return (
    <div
      className="min-h-40 bg-blackfill text-whiteFont"
      style={{ position: 'relative' }}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <CustomButton
            title="Deposit"
            type="solidPurple"
            className="absolute right-1 top-1"
            onClick={() => {}}
          />
          <p className="mb-2 text-2xl sm:text-3xl">Fund A</p>
          <p className="text-l mb-xs mt-6 sm:text-sm">Manager: {manager}</p>
          <p className="max-w-mlg mt-4 mb-8 text-xs sm:text-sm">
            {description}
          </p>
        </div>
        <div className="">
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
          <FundTableList />
        </div>
      </div>
    </div>
  );
};

export default FundDetails;
