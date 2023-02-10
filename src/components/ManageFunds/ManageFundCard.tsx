import Funds from '@/abi/Funds';
import { LPPositionsMock } from '@/mockData/mockData';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { Fund } from '@prisma/client';
import { ethers } from 'ethers';
import { Tooltip } from 'flowbite-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Address, useAccount, useContractReads } from 'wagmi';
import CustomButton from '../Common/CustomButton';
import PairValue from '../Common/PairValues';
import FundTableList from '../Funds/FundTableList';

interface AssetsDetailProps {
  fund: Fund;
  onGetTVL: (tvl: number) => void;
  showLpPositions?: boolean;
}

// Convert to ENUM
const tvlIndex = 0;
const lpPositionsIndex = 1;
const startDateIndex = 2;
const matureDateIndex = 3;
// const stableCoinAddressIndex = 2;

const ManageFundCard = ({
  fund: { address, name, manager, startDate, matureDate, fundYield },
  onGetTVL,
  showLpPositions = true,
}: AssetsDetailProps) => {
  const router = useRouter();

  const { address: userAddress } = useAccount();
  const [getTVLDone, setGetTVLDone] = useState(false);
  const config = {
    address: address as Address,
    abi: Funds,
  };

  const { data, isLoading } = useContractReads({
    scopeKey: address, // cache with individual fund page
    contracts: [
      { ...config, functionName: 'totalValueLocked' },
      {
        ...config,
        functionName: 'fetchAllLpPositions',
      },
      {
        ...config,
        functionName: 'startDate',
      },
      {
        ...config,
        functionName: 'matureDate',
      },
      // { ...config, functionName: 'stablecoin' },
    ],
    cacheTime: 60 * 1000, // 1min
    enabled: !!address,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const totalValueLocked = ethers.utils.formatUnits(data[tvlIndex], 18);

    if (!getTVLDone && totalValueLocked && parseFloat(totalValueLocked)) {
      setGetTVLDone(true);
      onGetTVL(parseFloat(totalValueLocked));
    }
  }, [data]);

  if (!address || !data || !manager || isLoading) {
    return null;
  }

  if (manager.toLocaleLowerCase() != userAddress?.toLocaleLowerCase()) {
    return;
  }

  const totalValueLocked = ethers.utils.formatUnits(data[tvlIndex], 18);
  const logo1 = '/WMATIC.png';
  const logo2 = '/ETH.png';
  const amount0 = 0;
  const amount1 = 1;

  const displayedFundYield =
    isNaN(Number(fundYield)) || Number(fundYield) == 0
      ? `${(5.1).toFixed(1)}%`
      : `${Number(fundYield).toFixed(1)}%`;

  return (
    <div
      className="flex w-full cursor-pointer rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-6 px-8 text-left text-white transition-all hover:bg-gray-800"
      onClick={() => router.push(`/funds/${address}`)}
    >
      <div className="relative flex flex-[33%] flex-col">
        <h3 className="mb-5 text-2xl font-bold text-fuchsia-100 sm:text-4xl">
          {name}
        </h3>

        <PairValue
          field="TVL"
          value={totalValueLocked + ' WMATIC'}
          endComponent={
            <Tooltip
              content="Total Value Locked"
              className="px-2 text-center shadow-xl"
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
          value={displayedFundYield}
          valueClassName="text-green-500"
          endComponent={
            <Tooltip
              content="Lifetime yield earned"
              className="px-2 text-center shadow-xl"
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
          field="Start Date"
          value={new Date(
            startDate ? startDate.toString() : startDate
          ).toLocaleDateString()}
        />
        <PairValue
          field="Mature Date"
          value={new Date(
            matureDate ? matureDate.toString() : matureDate
          ).toLocaleDateString()}
          endComponent={
            <Tooltip
              content="The date at which the fund will be disabled, and withdrawals will be enabled"
              className="px-2 text-center shadow-xl"
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
      <div className="flex flex-[67%] flex-col space-y-6">
        <div className="flex justify-between">
          <div className="flex space-x-6">
            {showLpPositions && (
              <>
                <div className="flex items-center space-x-2">
                  <Image
                    src={logo1}
                    width={40}
                    height={40}
                    alt={'WETH'}
                    className="rounded-full"
                    style={{ borderRadius: 100 }}
                  />
                  <p className="text-2xl">{amount0.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Image
                    src={logo2}
                    width={40}
                    height={40}
                    alt={'USDC'}
                    className="rounded-full"
                    style={{ borderRadius: 100 }}
                  />
                  <p className="text-2xl">{amount1.toLocaleString()}</p>
                </div>
              </>
            )}
          </div>
          <CustomButton title="Add Position" theme="solidPurple" className="" />
        </div>
        {showLpPositions && <FundTableList />}
      </div>
    </div>
  );
};

export default ManageFundCard;
