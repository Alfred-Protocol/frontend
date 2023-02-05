import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    <div className="bg-blackfill text-whiteFont">
      <div>
        <p className="mb-2 text-3xl">Fund A</p>
        <p className="mb-2 text-sm">Manager: {manager}</p>
        <p className="mb-4 text-sm">{description}</p>
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
  );
};

export default FundDetails;

{
  /* <h3 className="text-xl font-bold text-purple-900">
{tokenA} / {tokenB}
</h3>
<Link
className="rounded-lg bg-purple-600 py-2 px-4 text-purple-100 transition-all hover:bg-purple-800"
href={`/funds/${fundAddress}`}
>
More Details
<ArrowRightIcon
  height={20}
  width={20}
  className="ml-2 inline cursor-pointer stroke-2 pb-1"
/>
</Link>
</div>
<div>
<span className="font-semibold">TVL: </span>
{isLoading ? (
<Spinner />
) : (
<span>
  {totalValueLocked} {tvlSymbol}
</span>
)}
</div>
<div>
<span className="font-semibold">Start Date: </span>
{isLoading ? <Spinner /> : <span>{startDate}</span>}
</div>
<div>
<span className="font-semibold">Mature Date: </span>
{isLoading ? <Spinner /> : <span>{matureDate}</span>}
</div>
<div className="mb-2">
<span className="font-semibold">Manager: </span>
<span>
{manager}
<ArrowTopRightOnSquareIcon
  height={20}
  width={20}
  className="ml-2 inline cursor-pointer stroke-2 pb-1 transition-all hover:stroke-purple-500"
  onClick={() =>
    router.push(`https://polygonscan.com/address/${manager}`)
  }
/>
</span> */
}
