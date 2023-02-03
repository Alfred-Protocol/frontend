import Funds from '@/abi/Funds';
import { Address, useContractReads, useToken } from 'wagmi';
import FundDetails from './FundDetails';
import FundLiquidityGraph from './FundLiquidityGraph';

interface FundProps {
  tokenA: string;
  tokenB: string;
  manager: string; // TODO: retrieve from smart contract
  fundAddress: Address;
}

const Fund = ({ fundAddress, manager, tokenA, tokenB }: FundProps) => {
  const { data, isLoading } = useContractReads({
    scopeKey: fundAddress, // cache with individual fund page
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
    enabled: !!fundAddress,
  });

  const { data: tokenData, isLoading: tokenIsLoading } = useToken({
    address: (data ? data[3].toString() : '') as Address,
    enabled: data !== undefined,
  });

  return (
    <div className="bg-slate-100 py-4 px-4 flex-1 rounded-lg shadow text-left flex">
      <FundDetails
        fundAddress={fundAddress}
        isLoading={isLoading || tokenIsLoading}
        manager={manager}
        tokenA={tokenA}
        tokenB={tokenB}
        tvlSymbol={tokenData ? tokenData.symbol : 'No symbol found'}
        totalValueLocked={data ? data[0].toString() : 'No TVL Found'}
        startDate={
          data
            ? new Date(data[1]?.toNumber()).toLocaleDateString()
            : 'No date found'
        }
        matureDate={
          data
            ? new Date(data[2]?.toNumber()).toLocaleDateString()
            : 'No date found'
        }
      />
      <div className="flex h-full flex-1">
        <FundLiquidityGraph />
      </div>
    </div>
  );
};

export default Fund;
