import useFund from '@/hooks/useFund';
import truncateString from '@/utils/truncateString';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Address, erc20ABI, useAccount, useContractReads } from 'wagmi';
import CustomButton from '../Common/CustomButton';
import PairValue from '../Common/PairValues';
import DepositFundModal from './DepositFundModal';
import FundTableList from './FundTableList';
import SwapTokensModal from './SwapTokens';

export interface FundDetailsProps {
  isLoading: boolean;
  fundAddress: Address;
  tvlSymbol: string;
  totalValueLocked: string;
  startDate: string;
  matureDate: string;
  manager: string;
  stableCoinAddress: string;
  // description: string;
  // yieldPercentage: number;
  // lpPositions: LPPosition[];
  // fundName: string;
}

const FundDetails = ({
  // fundName,
  fundAddress,
  isLoading,
  tvlSymbol,
  totalValueLocked,
  matureDate,
  startDate,
  manager,
  stableCoinAddress,
}: // description,
// yieldPercentage = 20.4,
// lpPositions = [],
FundDetailsProps) => {
  const router = useRouter();
  const { data } = useFund(fundAddress);
  const account = useAccount();

  const [showDepositFundModal, setDepositFundModal] = useState<boolean>(false);
  const [showSwapTokensModal, setSwapTokensModal] = useState<boolean>(false);

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
    ],
    enabled: stableCoinAddress != ethers.constants.AddressZero,
  });

  const [stableCoinDecimals, stableCoinSymbol] = stableCoin ?? [18, 'ETH'];

  const redirect = () => {
    router.push(`funds/${fundAddress}`);
  };

  return (
    <div
      className="min-h-40 w-full bg-blackfill text-whiteFont"
      style={{ position: 'relative' }}
    >
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold sm:text-3xl">
            {data?.name || 'No name found'}
          </h3>
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
        </div>
        <div>
          <p className="text-l mb-xs sm:text-md">
            Manager:{' '}
            <span className="slashed-zero">{truncateString(manager)}</span>
          </p>
          <p className="text-l mb-xs sm:text-md">
            Fund Address:{' '}
            <span className="slashed-zero">{truncateString(fundAddress)}</span>
          </p>
          <p className="max-w-mlg mt-4 mb-8 text-xs sm:text-sm">
            {data?.description || 'No description found'}
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
          />
          <div className="flex items-center space-x-2">
            <p className="font-semibold sm:text-xl">Yield:</p>
            {/* <p className="text-greenGrowth">{yieldPercentage}%</p> */}
            <p className="text-greenGrowth">{0}%</p>
          </div>
          <PairValue field="Start Date" value={startDate} />
          <PairValue
            field="Mature Date"
            value={matureDate}
            style={{ marginBottom: 5 }}
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
    </div>
  );
};

export default FundDetails;
