import type { Fund } from '@prisma/client';
import { AssetTransfersCategory, AssetTransfersResponse } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
import useAlchemy from './useAlchemy';
import useDatabaseFunds from './useDatabaseFunds';
import useFunds from './useFunds';

export interface Deposit {
  fundAddress: Address;
  amount: number;
}

const generateDeposits = (
  funds: Fund[],
  transactions: AssetTransfersResponse
) => {
  const validToAddresses = new Set(
    funds.map((fund) => fund.address.toLowerCase())
  );
  const deposits: Record<string, Deposit[]> = {};
  transactions.transfers.forEach((transaction) => {
    if (transaction.to && validToAddresses.has(transaction.to.toLowerCase())) {
      if (deposits[transaction.to] === undefined) {
        deposits[transaction.to] = [
          {
            fundAddress: transaction.to as Address,
            amount: transaction.value!,
          },
        ];
      } else {
        deposits[transaction.to].push({
          fundAddress: transaction.to as Address,
          amount: transaction.value!,
        });
      }
    }
  });
  return deposits;
};

const useDeposits = () => {
  const { address } = useAccount();
  const { data: funds, isLoading } = useDatabaseFunds();

  const [transactions, setTransactions] = useState<
    AssetTransfersResponse | undefined
  >(undefined);
  const [deposits, setDeposits] = useState<
    Record<Address, Deposit[]> | undefined
  >(undefined);
  const [isFetching, setIsFetching] = useState(true);

  const { alchemy } = useAlchemy();

  useEffect(() => {
    if (alchemy) {
      setIsFetching(true);
      alchemy.core
        .getAssetTransfers({
          fromAddress: address,
          category: [AssetTransfersCategory.ERC20],
        })
        .then((data) => {
          setTransactions(data);
        });
    }
  }, [address, alchemy]);

  useEffect(() => {
    if (funds && transactions) {
      setDeposits(generateDeposits(funds, transactions));
      setIsFetching(false);
    }
  }, [funds, transactions]);
  return { deposits, isLoading: isLoading || isFetching };
};

export default useDeposits;
