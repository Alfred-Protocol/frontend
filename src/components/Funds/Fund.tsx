import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FundLiquidityGraph from './FundLiquidityGraph';

interface FundProps {
  tokenA: string;
  tokenB: string;
  manager: string;
  totalLiquidity: number;
  fundAddress: string;
}

const Fund = ({
  fundAddress,
  manager,
  tokenA,
  tokenB,
  totalLiquidity,
}: FundProps) => {
  const router = useRouter();
  return (
    <div className="bg-slate-100 py-4 px-4 flex-1 rounded-lg shadow text-left flex">
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
          <span className="font-semibold">Total Liquidity: </span>
          <span>{totalLiquidity}</span>
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
      <div className="flex h-full flex-1">
        <FundLiquidityGraph />
      </div>
    </div>
  );
};

export default Fund;
