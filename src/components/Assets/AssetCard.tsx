import PairValue from '../Common/PairValues';
// import ETH from 'src/components/Assets/ETH.png';
import ETH from 'src/assets/ETH.png';
import USDT from 'src/assets/USDT.jpg';

import Funds from '@/abi/Funds';
import type { Deposit } from '@/hooks/useDeposits';
import useDatabaseFund from '@/hooks/useDatabaseFund';
import { ethers, BigNumber } from 'ethers';
import Image from 'next/image';
import {
  Address,
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
  useContractRead,
} from 'wagmi';
import CustomButton from '../Common/CustomButton';
import { useRouter } from 'next/router';
import type { Fund } from '@prisma/client';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Spinner, Tooltip } from 'flowbite-react';
import { WMATIC_MUMBAI_ADDRESS } from '../Funds/WithdrawFundModal';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AssetsDetailProps {
  fundAddress: Address;
  deposits?: Deposit[];
  fund: Fund;
}

const AssetCard = ({ fundAddress, deposits, fund }: AssetsDetailProps) => {
  const router = useRouter();

  const { address } = useAccount();
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
        functionName: 'stablecoin',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'depositedAmount',
        args: [address!],
      },
    ],
    cacheTime: 60 * 1000, // 1min
    enabled: !!fundAddress && !!address,
  });

  const [tvl, stablecoin, depositedAmount] =
    data !== undefined && data.every(Boolean)
      ? data
      : [BigNumber.from(0), WMATIC_MUMBAI_ADDRESS, BigNumber.from(0)];

  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'withdraw',
    enabled: depositedAmount?.gt(0),
  });
  const { data: withdrawAmount, isSuccess, write } = useContractWrite(config);
  const {
    data: txReceipt,
    isSuccess: txIsSuccess,
    isLoading: txIsLoading,
  } = useWaitForTransaction({
    hash: withdrawAmount?.hash,
    enabled: isSuccess,
  });

  if (isLoading) {
    return (
      <div role="status" className="h-48 w-full animate-pulse">
        <div className="mb-4 h-full w-full rounded-xl border-[1px] border-[#EF5DA8] bg-blackfillLess dark:bg-blackfill" />
      </div>
    );
  }

  if (!fundAddress || !data || depositedAmount.lte(0)) {
    return null;
  }

  return (
    <div
      className="w-full cursor-pointer rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 pb-6 text-left text-fuchsia-100 transition-all hover:bg-gray-800"
      onClick={() => {
        router.push(`/funds/${fundAddress}`);
      }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="max-w-xs space-y-2">
          <h3 className="mb-4 text-2xl font-bold sm:text-4xl">
            {fund?.name || 'No fund name found'}
          </h3>
        </div>

        <div className="flex flex-col justify-center">
          <PairValue
            field="TVL"
            containerClassName="sm:text-md"
            value={ethers.utils.formatUnits(tvl, 18) + ' WMATIC'}
            endComponent={
              <Tooltip
                content="Total Value Locked"
                className="px-2 text-center"
              >
                <InformationCircleIcon
                  height={16}
                  width={16}
                  className="ml-1 transition-colors hover:stroke-fuchsia-300"
                />
              </Tooltip>
            }
          />
          <PairValue
            field="Mature Date"
            containerClassName="sm:text-md"
            value={
              fund
                ? new Date(fund.matureDate).toLocaleDateString()
                : 'No mature date found'
            }
            endComponent={
              <Tooltip
                content="The date at which the fund will be disabled, and withdrawals will be enabled"
                className="px-2 text-center"
              >
                <InformationCircleIcon
                  height={16}
                  width={16}
                  className="ml-1 transition-colors hover:stroke-fuchsia-300"
                />
              </Tooltip>
            }
          />
        </div>
        <div>
          <CustomButton
            title="Withdraw"
            theme="solidPurple"
            isLoading={txIsLoading}
            onClick={write}
          />
        </div>
      </div>
      <div className="flex space-x-8">
        <div>
          <h4 className="text-3xl font-semibold">Your Deposits</h4>
          <span className="text-4xl">
            {ethers.utils.formatEther(depositedAmount).toString() || '0'} MATIC
          </span>
        </div>
        <div>
          <h4 className="text-3xl font-semibold">Your Share</h4>
          {/* Update the text-green-300 based on amount relative to deposit */}
          <span className={twMerge("text-4xl", "text-green-400")}>
            {ethers.utils.formatEther(depositedAmount).toString() || '0'} MATIC
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
