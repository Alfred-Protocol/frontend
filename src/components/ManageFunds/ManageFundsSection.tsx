import useDatabaseFunds from '@/hooks/useDatabaseFunds';
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

type modalType = 'success' | 'deposit' | 'withdraw';

const FundsSectionLoading = () => {
  return (
    <>
      <div role="status" className="h-60 w-full animate-pulse">
        <div className="mb-4 h-full w-full rounded-xl bg-blackfillLess dark:bg-blackfill"></div>
      </div>
      <div role="status" className="h-60 w-full animate-pulse">
        <div className="mb-4 h-full w-full rounded-xl bg-blackfillLess dark:bg-blackfill"></div>
      </div>
      <div role="status" className="h-60 w-full animate-pulse">
        <div className="mb-4 h-full w-full rounded-xl bg-blackfillLess dark:bg-blackfill"></div>
      </div>
    </>
  );
};

const MaangeFundsSection = () => {
  const { address } = useAccount();
  const { data, isLoading } = useDatabaseFunds(address);

  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
        <AssetsHeader
          managerAddress={address || ''}
          netDeposit={3232.3}
          netValue={3223.43}
        />
        <div className="flex w-full flex-col items-center space-y-4">
          {isLoading ? (
            <FundsSectionLoading />
          ) : (
            data?.map((fund) => (
              <ManageFundCard key={fund.address} fund={fund} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default MaangeFundsSection;
