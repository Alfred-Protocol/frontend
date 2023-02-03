import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '../Layout/Spinner';

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
}: FundDetailsProps) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center space-x-4 mb-2">
        <h3 className="font-bold text-purple-900 text-xl">
          {tokenA} / {tokenB}
        </h3>
        <Link
          className="py-2 px-4 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-800 transition-all"
          href={`/funds/${fundAddress}`}
        >
          More Details
          <ArrowRightIcon
            height={20}
            width={20}
            className="inline pb-1 ml-2 cursor-pointer stroke-2"
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
            className="inline pb-1 ml-2 cursor-pointer stroke-2 hover:stroke-purple-500 transition-all"
            onClick={() =>
              router.push(`https://polygonscan.com/address/${manager}`)
            }
          />
        </span>
      </div>
    </div>
  );
};

export default FundDetails;
