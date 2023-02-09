import Funds from '@/abi/Funds';
import type { Fund } from '@prisma/client';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Address, useContractReads } from 'wagmi';
import CustomButton from '../Common/CustomButton';
import DepositFundModal from './DepositFundModal';
import FundDetails from './FundDetails';

interface FundProps {
  fund: Fund;
  showLpPositions?: boolean;
}

// Convert to ENUM
const tvlIndex = 0;
const stableCoinAddressIndex = 1;
const lpPositionsIndex = 2;

const FundCard = ({
  fund: {
    address,
    description,
    manager,
    matureDate,
    startDate,
    name,
    yield: fundYield,
  },
  showLpPositions = true,
}: FundProps) => {
  const router = useRouter();
  const [showDepositFundModal, setDepositFundModal] = useState<boolean>(false);

  const config = {
    address: address as Address,
    abi: Funds,
  };
  const { data, isLoading, refetch } = useContractReads({
    scopeKey: address, // cache with individual fund page
    contracts: [
      { ...config, functionName: 'totalValueLocked' },
      // { ...config, functionName: 'fetchAllLpPositions' },
      { ...config, functionName: 'stablecoin' },
    ],
    cacheTime: 60 * 1000, // 1min
    enabled: !!address,
  });

  return (
    <div className="relative">
      <div
        className={
          'md:min-w[460px] flex min-h-[300px] min-w-[100px] rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-4 text-left shadow  transition-colors hover:cursor-pointer hover:bg-gray-800 sm:py-8 sm:px-8 md:min-h-[350px]'
        }
        onClick={() => router.push(`/funds/${address}`)}
      >
        <FundDetails
          fundAddress={address as Address}
          fundName={name}
          description={description || undefined}
          isLoading={isLoading}
          manager={manager}
          totalValueLocked={
            data?.length && data[tvlIndex] ? data[tvlIndex].toString() : '0'
          }
          startDate={new Date(startDate).toLocaleDateString()}
          matureDate={new Date(matureDate).toLocaleDateString()}
          stableCoinAddress={
            data?.length && data[stableCoinAddressIndex]
              ? data[stableCoinAddressIndex].toString()
              : ethers.constants.AddressZero
          }
          yieldPercentage={fundYield}
          showLpPositions={showLpPositions}
        />
      </div>
      <DepositFundModal
        fundAddress={address}
        show={showDepositFundModal}
        onClose={() => setDepositFundModal(false)}
        refetch={async () => {
          await refetch();
        }}
      />
      <CustomButton
        title="Deposit"
        theme="solidPurple"
        className="absolute top-[5%] right-[5%]"
        onClick={() => setDepositFundModal(true)}
      />
    </div>
  );
};

export default FundCard;
