import { AssetTransfersCategory, AssetTransfersResponse } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
import useAlchemy from './useAlchemy';
import useFunds from './useFunds';

export interface Deposit {
  fundAddress: Address;
  amount: number;
}

const generateDeposits = (
  fundAddresses: readonly Address[],
  transactions: AssetTransfersResponse
) => {
  const validToAddresses = new Set(
    fundAddresses.map((address) => address.toLowerCase())
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
  const { data: fundAddresses, isLoading } = useFunds();

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
    if (fundAddresses && transactions) {
      setDeposits(generateDeposits(fundAddresses, transactions));
      setIsFetching(false);
    }
  }, [fundAddresses, transactions]);
  return { deposits, isLoading: isLoading || isFetching };
};

export default useDeposits;
