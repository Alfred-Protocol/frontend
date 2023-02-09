import useDatabaseFunds from '@/hooks/useDatabaseFunds';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import AssetsHeader from '../Assets/AssetsHeader';
import ManageFundCard from './ManageFundCard';

export type Fund = {
  fundName: string;
  tvl: number;
  manager: string;
  assets: { assetName: string; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
};

const MaangeFundsSection = () => {
  const { address } = useAccount();
  const { data, isLoading } = useDatabaseFunds(address);
  const [totalFund, setTotalFund] = useState(0);

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        <AssetsHeader
          managerAddress={address || ''}
          netDeposit={totalFund}
          netValue={totalFund * 1.1}
        />
        <div className="flex w-full flex-col items-center space-y-4">
          {isLoading ? (
            <div
              role="status"
              className="h-52 w-full animate-pulse border-[1px] border-[#EF5DA8]"
            >
              <div className="mb-4 h-full w-full rounded-xl bg-blackfillLess dark:bg-blackfill"></div>
            </div>
          ) : (
            data?.map((fund) => (
              <ManageFundCard
                key={fund.address}
                fund={fund}
                onGetTVL={(tvl) => setTotalFund(tvl)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default MaangeFundsSection;
