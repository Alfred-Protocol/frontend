import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomButton from '../Common/CustomButton';
import FundTable from '../FundDetails/FundTable';
import Spinner from '../Layout/Spinner';
import FundTableList from './FundTableList';

interface FundDetailsProps {
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
}

const PairValue = ({
  field,
  value,
  endComponent,
  style,
}: {
  field: string;
  value: string;
  endComponent?: any;
  style?: any;
}) => {
  return (
    <div className="flex items-center space-x-2" style={style}>
      <p className="text-xl font-semibold">{field}:</p>
      <p>{value}</p>
      {endComponent}
    </div>
  );
};

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
}: FundDetailsProps) => {
  const router = useRouter();
  return (
    <div
      className="min-h-40 bg-blackfill text-whiteFont"
      style={{ position: 'relative' }}
    >
      <div className="">
        <CustomButton
          title="Deposit"
          type="solidPurple"
          className="absolute right-1 top-1"
          onClick={() => {}}
        />
        <p className="mb-2 text-3xl">Fund A</p>
        <p className="mb-2 text-sm">Manager: {manager}</p>
        <p className="max-w-mlg mb-8 text-sm">{description}</p>
        <div className="b-20 absolute">
          <PairValue
            field="Current Value"
            value={totalValueLocked + ' ETH'}
            endComponent={<div className="text-greenGrowth">(+20.0%)</div>}
          />
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
