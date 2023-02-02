import Funds from '@/abi/Funds';
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Address, useContractReads, useToken } from 'wagmi';
import Spinner from '../Layout/Spinner';
import FundLiquidityGraph from './FundLiquidityGraph';

interface FundProps {
  tokenA: string;
  tokenB: string;
  manager: string; // TODO: retrieve from smart contract
  fundAddress: Address;
}

const Fund = ({ fundAddress, manager, tokenA, tokenB }: FundProps) => {
  const router = useRouter();
  const { data, isLoading } = useContractReads({
    scopeKey: fundAddress,
    contracts: [
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'totalValueLocked',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'startDate',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'matureDate',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'stablecoin',
      },
    ],
    cacheTime: 60 * 1000, // 1min
  });
  const { data: tokenData, isLoading: tokenIsLoading } = useToken({
    address: data![3].toString() as Address,
    enabled: data !== undefined,
  });

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
          <span className="font-semibold">TVL: </span>
          {isLoading || tokenIsLoading ? (
            <Spinner />
          ) : (
            <span>
              {data![0].toString() || ''} {tokenData?.symbol}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold">Start Date: </span>
          {isLoading ? (
            <Spinner />
          ) : (
            <span>{new Date(data![1]?.toNumber()).toLocaleDateString()}</span>
          )}
        </div>
        <div>
          <span className="font-semibold">Mature Date: </span>
          {isLoading ? (
            <Spinner />
          ) : (
            <span>{new Date(data![2].toNumber()).toLocaleDateString()}</span>
          )}
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
