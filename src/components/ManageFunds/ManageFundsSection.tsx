import { useState } from 'react';
import FundsFactory from '@/abi/FundsFactory';
import { Address, useAccount, useContractRead, useSigner } from 'wagmi';
import { LPPositionsMock } from '../../mockData/mockData';
import AssetsHeader from '../Assets/AssetsHeader';
import ManageFundCard from './ManageFundCard';
import useFunds from '@/hooks/useFunds';

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
  const { data, isLoading } = useFunds(address);

  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
        <AssetsHeader
          managerAddress="0x7730b4cdc1b1e7a33a309ab7205411fad009c106"
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
