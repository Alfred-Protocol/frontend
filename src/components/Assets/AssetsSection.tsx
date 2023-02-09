// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import useDatabaseFunds from '@/hooks/useDatabaseFunds';
import useDeposits from '@/hooks/useDeposits';
import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
import { LPPositionsMock } from '../../mockData/mockData';
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

const mockData = [
  {
    fundName: 'Fund A',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1 },
      { assetName: 'USDC', assetValue: 1676.251 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
  {
    fundName: 'Fund B',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1.1 },
      { assetName: 'USDT', assetValue: 1556.251 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
  {
    fundName: 'Fund C',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 2 },
      { assetName: 'USDR', assetValue: 3212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
  {
    fundName: 'Fund D',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1.3 },
      { assetName: 'USDD', assetValue: 5432 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
];

const AssetsSection = () => {
  const { address } = useAccount();
  const { data, isLoading, refetch } = useDatabaseFunds();

  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
        <AssetsHeader
          managerAddress={address ?? ''}
          netDeposit={3232.3}
          netValue={3223.43}
        />
        <div className="flex w-full flex-col items-center space-y-4">
          {isLoading ? (
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
          ) : (
            data &&
            data.map((fund) => (
              <AssetCard
                key={fund.address}
                fundAddress={fund.address as Address}
                fund={fund}
                // deposits={deposits[address as Address]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default AssetsSection;
