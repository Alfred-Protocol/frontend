import truncateString from '@/utils/truncateString';
import {
  ClipboardDocumentIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { BigNumber, ethers } from 'ethers';
import { Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Address, erc20ABI, useAccount, useContractReads } from 'wagmi';
import Funds from '../../abi/Funds';
import CustomButton from '../Common/CustomButton';
import PairValue from '../Common/PairValues';
import DepositFundModal from './DepositFundModal';
import FundTableList from './FundTableList';
import SwapTokensModal from './SwapTokensModal';
import WithdrawFundModal from './WithdrawFundModal';

export interface FundDetailsProps {
  isLoading: boolean;
  fundAddress: Address;
  totalValueLocked: string;
  startDate: string;
  matureDate: string;
  manager: string;
  stableCoinAddress: string;
  description?: string;
  yieldPercentage?: number;
  fundName: string;
}

const FundDetails = ({
  fundName,
  fundAddress,
  isLoading,
  description,
  totalValueLocked,
  matureDate,
  startDate,
  manager,
  stableCoinAddress,
  yieldPercentage = 20.4,
}: FundDetailsProps) => {
  const account = useAccount();

  const [showDepositFundModal, setDepositFundModal] = useState<boolean>(false);
  const [showSwapTokensModal, setSwapTokensModal] = useState<boolean>(false);
  const [showWithdrawFundModal, setWithdrawFundModal] =
    useState<boolean>(false);

  const { data: stableCoin } = useContractReads({
    contracts: [
      {
        address: stableCoinAddress as Address,
        abi: erc20ABI,
        functionName: 'decimals',
      },
      {
        address: stableCoinAddress as Address,
        abi: erc20ABI,
        functionName: 'symbol',
      },
      {
        address: fundAddress as Address,
        abi: Funds,
        functionName: 'depositedAmount',
        args: [account.address as Address],
      },
    ],
    enabled:
      stableCoinAddress != ethers.constants.AddressZero && !!account?.address,
  });

  const [stableCoinDecimals, stableCoinSymbol, userDepositedAmount] =
    stableCoin ?? [18, 'ETH', BigNumber.from(0)];

  return (
    <div
      className="min-h-40 w-full text-whiteFont"
      style={{ position: 'relative' }}
    >
      <div className="flex flex-col justify-between">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-2xl font-bold sm:text-4xl">{fundName}</h3>
          <div className="flex space-x-2">
            <CustomButton
              title="Deposit"
              theme="solidPurple"
              onClick={() => setDepositFundModal(true)}
            />
            {manager.toLowerCase() === account?.address?.toLowerCase() && (
              <CustomButton
                title="Manage"
                theme="solidPurple"
                onClick={() => setSwapTokensModal(true)}
              />
            )}
            {userDepositedAmount.gt(0) && (
              <CustomButton
                title="Withdraw"
                theme="solidPurple"
                onClick={() => setWithdrawFundModal(true)}
              />
            )}
          </div>
        </div>
        <div>
          <p className="mb-xs sm:text-md flex items-center space-x-1">
            <span>Manager:</span>
            <span className="slashed-zero">{truncateString(manager)} </span>
            <ClipboardDocumentIcon
              width={16}
              height={16}
              className="inline transition-colors hover:cursor-pointer hover:stroke-fuchsia-300"
              onClick={() => {
                navigator.clipboard.writeText(manager);
                toast.success('Copied manager address to clipboard!');
              }}
            />
          </p>
          <p className="mb-xs sm:text-md flex items-center space-x-1">
            <span>Fund Address:</span>
            <span className="slashed-zero">{truncateString(fundAddress)}</span>
            <ClipboardDocumentIcon
              width={16}
              height={16}
              className="inline transition-colors hover:cursor-pointer hover:stroke-fuchsia-300"
              onClick={() => {
                navigator.clipboard.writeText(fundAddress);
                toast.success('Copied manager address to clipboard!');
              }}
            />
          </p>
          <p className="max-w-mlg mt-4 mb-8 text-lg">
            {description || 'No description found.'}
          </p>
        </div>
        <div className="">
          <PairValue
            field="TVL"
            value={
              ethers.utils.formatUnits(totalValueLocked, stableCoinDecimals) +
              ' ' +
              stableCoinSymbol
            }
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
            field="Yield"
            value={`${yieldPercentage}%`}
            valueClassName="text-green-500"
            endComponent={
              <Tooltip
                content="Lifetime yield earned"
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
          <PairValue field="Start Date" value={startDate} />
          <PairValue
            field="Mature Date"
            value={matureDate}
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
          <FundTableList />
        </div>
      </div>
      <DepositFundModal
        fundAddress={fundAddress}
        show={showDepositFundModal}
        onClose={() => setDepositFundModal(false)}
      />
      <SwapTokensModal
        fundAddress={fundAddress}
        show={showSwapTokensModal}
        onClose={() => setSwapTokensModal(false)}
      />
      <WithdrawFundModal
        fundAddress={fundAddress}
        show={showWithdrawFundModal}
        onClose={() => setWithdrawFundModal(false)}
      />
    </div>
  );
};

export default FundDetails;
