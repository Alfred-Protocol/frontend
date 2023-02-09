import Funds from '@/abi/Funds';
import type { Deposit } from '@/hooks/useDeposits';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { Fund } from '@prisma/client';
import { BigNumber, ethers } from 'ethers';
import { Tooltip } from 'flowbite-react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import {
  Address,
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import CustomButton from '../Common/CustomButton';
import PairValue from '../Common/PairValues';
import { WMATIC_MUMBAI_ADDRESS } from '../Funds/WithdrawFundModal';

interface AssetsDetailProps {
  fundAddress: Address;
  deposits?: Deposit[];
  fund: Fund;
  setTotalDeposits: Dispatch<SetStateAction<number>>;
  setTotalNetValue: Dispatch<SetStateAction<number>>;
}

const AssetCard = ({
  fundAddress,
  deposits,
  fund,
  setTotalDeposits,
  setTotalNetValue,
}: AssetsDetailProps) => {
  const router = useRouter();

  const { address } = useAccount();
  const { data, refetch } = useContractReads({
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

  // hacky way to update total deposit / net assets
  const hasUpdatedRef = useRef(false);
  useEffect(() => {
    if (!hasUpdatedRef.current && depositedAmount.gt(0)) {
      hasUpdatedRef.current = true;
      const amountInEther = ethers.utils.formatEther(depositedAmount);
      setTotalDeposits((prev) => prev + +amountInEther);
      setTotalNetValue((prev) => prev + +amountInEther);
    }
  }, [depositedAmount, setTotalDeposits, setTotalNetValue]);

  // toasts
  const [hasCreated, setHasCreated] = useState(false);

  useEffect(() => {
    if (txIsSuccess && !hasCreated) {
      setHasCreated(true);
      console.log(`Successfully withdrawn, transaction hash:`, txReceipt);
      toast.success(
        `Successfully withdrawn, transaction hash: ${txReceipt?.transactionHash}`
      );

      const amountInEther = ethers.utils.formatEther(depositedAmount);
      setTotalDeposits((prev) => prev - +amountInEther);
      setTotalNetValue((prev) => prev - +amountInEther);
      refetch();
    }
  }, [hasCreated, txIsSuccess, txReceipt?.transactionHash]);

  if (!fundAddress || !data || depositedAmount.lte(0)) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div
        className="cursor-pointer rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 pb-6 text-left text-fuchsia-100 transition-colors hover:bg-gray-800"
        onClick={() => {
          router.push(`/funds/${fundAddress}`);
        }}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex space-x-8">
            <h3 className="mb-4 text-2xl font-bold sm:text-4xl">
              {fund?.name || 'No fund name found'}
            </h3>
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
          </div>
        </div>
        <div className="flex space-x-8">
          <div>
            <h4 className="text-3xl font-semibold">Your Deposits</h4>
            <span className="text-4xl">
              {ethers.utils.formatEther(depositedAmount).toString() || '0'}{' '}
              MATIC
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-semibold">Your Share</h4>
            {/* Update the text-green-300 based on amount relative to deposit */}
            <span className={twMerge('text-4xl', 'text-green-400')}>
              {ethers.utils.formatEther(depositedAmount).toString() || '0'}{' '}
              MATIC
            </span>
          </div>
        </div>
      </div>
      {write && (
        <CustomButton
          title="Withdraw"
          theme="solidPurple"
          className="absolute right-[2.5%] top-[10%]"
          isLoading={txIsLoading}
          onClick={write}
        />
      )}
    </div>
  );
};

export default AssetCard;
