import Funds from '@/abi/Funds';
import { Address, useContractReads, useToken } from 'wagmi';
import FundDetails from './FundDetails';
import FundLiquidityGraph from './FundLiquidityGraph';
import useMediaQuery from 'src/components/Common/useMediaQuery';
import type { LPPosition } from '@/types/type';

interface FundProps {
  fundAddress: Address;
}

const FundCard = ({ fundAddress }: FundProps) => {
  const isMobile = useMediaQuery(768);

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
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'fundName',
      },
    ],
    cacheTime: 60 * 1000, // 1min
    enabled: !!fundAddress,
  });

  const { data: tokenData, isLoading: tokenIsLoading } = useToken({
    address: data?.length && data[3] && (data[3].toString() as Address),
    enabled: !!(data?.length && data[3]),
  });

  console.log(data, tokenData);

  return (
    <div
      style={{
        minHeight: isMobile ? 300 : 470,
        minWidth: isMobile ? 100 : 460,
      }}
      className="h-4600 flex flex-1 basis-[50%] rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-4 text-left shadow sm:py-8 sm:px-8"
    >
      <FundDetails
        fundAddress={fundAddress}
        description={''}
        fundName={
          data?.length && data[5] ? data[5].toString() : 'No fund found'
        }
        lpPositions={[]}
        yieldPercentage={1}
        isLoading={isLoading || tokenIsLoading}
        manager={
          data?.length && data[3] ? data[3].toString() : 'No manager found'
        }
        tokenA={'tokenA'}
        tokenB={'tokenB'}
        tvlSymbol={tokenData ? tokenData.symbol : 'No symbol found'}
        totalValueLocked={
          data?.length && data[0] ? data[0].toString() : 'No TVL Found'
        }
        startDate={
          data?.length && data[1]
            ? new Date(data[1]?.toNumber()).toLocaleDateString()
            : 'No date found'
        }
        matureDate={
          data?.length && data[2]
            ? new Date(data[2]?.toNumber()).toLocaleDateString()
            : 'No date found'
        }
      />
      {/* for mock data */}
      {/* <FundDetails
        fundName={fundName}
        fundAddress={fundAddress}
        isLoading={isLoading || tokenIsLoading}
        manager={manager}
        tokenA={tokenA}
        tokenB={tokenB}
        description={description}
        tvlSymbol={tokenData ? tokenData.symbol : 'No symbol found'}
        totalValueLocked={String(tvl)}
        startDate={startDate}
        matureDate={matureDate}
        yieldPercentage={20.5}
        lpPositions={lpPositions}
      /> */}
    </div>
  );
};

export default FundCard;
