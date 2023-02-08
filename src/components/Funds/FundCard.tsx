import Funds from '@/abi/Funds';
import useMediaQuery from 'src/components/Common/useMediaQuery';
import { tickToPrice } from '@uniswap/v3-sdk';
import { Address, useContractReads, useQuery, useToken } from 'wagmi';
import FundDetails from './FundDetails';
import { useState } from 'react';
import DepositFundModal from './DepositFundModal';
import { ethers } from 'ethers';
import type { Fund } from '@prisma/client';

interface FundProps {
  fund: Fund;
}

// Convert to ENUM
const tvlIndex = 0;
const lpPositionsIndex = 1;
const stableCoinAddressIndex = 2;

const FundCard = ({
  fund: { address, description, manager, matureDate, startDate, name },
}: FundProps) => {
  const isMobile = useMediaQuery(768);

  const config = {
    address: address as Address,
    abi: Funds,
  };
  const { data, isLoading } = useContractReads({
    scopeKey: address, // cache with individual fund page
    contracts: [
      { ...config, functionName: 'totalValueLocked' },
      { ...config, functionName: 'fetchAllLpPositions' },
      { ...config, functionName: 'stablecoin' },
    ],
    cacheTime: 60 * 1000, // 1min
    enabled: !!address,
  });

  return (
    <div
      style={{
        minHeight: isMobile ? 300 : 470,
        minWidth: isMobile ? 100 : 460,
      }}
      className="h-4600 flex flex-1 basis-[50%] rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-4 text-left shadow sm:py-8 sm:px-8"
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
      />
    </div>
  );
};

export default FundCard;
