import Funds from '@/abi/Funds';
import { Address, useContractReads, useToken } from 'wagmi';
import FundDetails from './FundDetails';
import FundLiquidityGraph from './FundLiquidityGraph';

interface FundProps {
  tokenA: string;
  tokenB: string;
  manager: string; // TODO: retrieve from smart contract
  fundAddress: Address;
  description: string;
  startDate: string;
  matureDate: string;
  tvl: number;
}

const Fund = ({
  fundAddress,
  manager,
  tokenA,
  tokenB,
  description,
  startDate,
  matureDate,
  tvl,
}: FundProps) => {
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
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'fundManager',
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
    <div className="flex flex-1 basis-[50%] rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-4 text-left shadow">
      {/* <FundDetails
        fundAddress={fundAddress}
        isLoading={isLoading || tokenIsLoading}
        manager={data ? data[3].toString() : 'No manager found'}
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
      /> */}
      {/* for mock data */}
      <FundDetails
        fundAddress={fundAddress}
        isLoading={isLoading || tokenIsLoading}
        manager={manager}
        tokenA={tokenA}
        tokenB={tokenB}
        description={description}
        tvlSymbol={tokenData ? tokenData.symbol : 'No symbol found'}
        totalValueLocked={tvl}
        startDate={startDate}
        matureDate={matureDate}
      />
    </div>
  );
};

export default Fund;
