// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import useDatabaseFunds from '@/hooks/useDatabaseFunds';
import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
import AssetCard from './AssetCard';
import AssetsHeader from './AssetsHeader';

export type Fund = {
  fundName: string;
  tvl: number;
  manager: string;
  assets: { assetName: string; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
};

const AssetsSection = () => {
  const { address } = useAccount();
  const { data, isLoading, refetch } = useDatabaseFunds();
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalNetValue, setTotalNetValue] = useState(0);

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  // Necessary due to some hydration error
  if (!isDomLoaded) {
    return null;
  }

  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
        <AssetsHeader
          managerAddress={address ?? ''}
          // 1633.56 is ETH to USDC, 1.1 to show profit
          netDeposit={totalDeposits}
          netValue={totalNetValue}
        />
        <div className="flex w-full flex-col items-center space-y-4">
          {isLoading ? (
            <div role="status" className="h-48 w-full animate-pulse">
              <div className="h-full w-full rounded-xl border-[1px] border-[#EF5DA8] bg-blackfillLess dark:bg-blackfill"></div>
            </div>
          ) : (
            data?.length &&
            data.map((fund) => (
              <AssetCard
                key={fund.address}
                fundAddress={fund.address as Address}
                fund={fund}
                setTotalDeposits={setTotalDeposits}
                setTotalNetValue={setTotalNetValue}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default AssetsSection;
