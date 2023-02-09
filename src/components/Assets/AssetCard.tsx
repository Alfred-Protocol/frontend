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
} from 'wagmi';
import CustomButton from '../Common/CustomButton';
import { useRouter } from 'next/router';
import type { Fund } from '@prisma/client';
import { useEffect } from 'react';

interface AssetsDetailProps {
  fundAddress: Address;
  deposits?: Deposit[];
  fund: Fund;
  onGetTVL: (tvl: number) => void;
}

// Convert to ENUM
const tvlIndex = 0;
const stableCoinAddressIndex = 1;
const lpPositionsIndex = 2;
const depositedAmountIndex = 3;

const AssetCard = ({
  fundAddress,
  deposits,
  fund,
  onGetTVL,
}: AssetsDetailProps) => {
  const { address } = useAccount();
  const router = useRouter();

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
        functionName: 'fetchAllLpPositions',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'depositedAmount',
        args: [address!],
      },
    ],
    // @marcuspang -> Does it force a re-fetch every 1min?
    cacheTime: 60 * 1000, // 1min
    enabled: !!fundAddress && !!address,
  });

  const [tvl, stablecoin, allLpPositions, depositedAmount] =
    data !== undefined
      ? data
      : [BigNumber.from(0), BigNumber.from(0), [], BigNumber.from(0)];

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

  if (!fundAddress || !data) {
    return null;
  }

  const totalValueLocked = ethers.utils.formatUnits(data[tvlIndex], 18);
  const yieldPercentage = 12.2;
  const logo1 = ETH;
  const logo2 = USDT;
  // const lpPositions =
  //   data[lpPositionsIndex]?.map((position) => ({
  //     ...position,
  //     tickLower: BigNumber.from(position.tickLower),
  //     tickUpper: BigNumber.from(position.tickUpper),
  //     poolFee: BigNumber.from(position.poolFee),
  //   })) || LPPositionsMock;
  const amount0 = 0;
  const amount1 = 1;

  useEffect(() => {
    if (totalValueLocked && parseFloat(totalValueLocked) > 0) {
      console.log('totalValueLocked ', totalValueLocked);
      onGetTVL(parseFloat(totalValueLocked));
    }
  }, [totalValueLocked]);

  if (depositedAmount.lte(0)) {
    return null;
  }

  return (
    <div
      className="w-full cursor-pointer rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-white transition-all hover:bg-gray-800"
      onClick={() => {
        router.push(`/funds/${fundAddress}`);
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-fuchsia-100 sm:text-4xl">
          {fund?.name || 'No fund name found'}
        </h3>
        <div className="flex justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Image
              src={logo1}
              width={40}
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
              alt={'USDC'}
              className="rounded-full"
              style={{ borderRadius: 100 }}
            />
            <p className="text-2xl">{amount1.toLocaleString()}</p>
          </div>
        </div>
        <CustomButton
          title="Withdraw"
          theme="solidPurple"
          isLoading={txIsLoading}
          onClick={write}
        />
      </div>
      <div className="mr-12 text-left">
        <p className="mb-2 text-2xl sm:text-3xl">{}</p>
        <PairValue field="TVL" value={totalValueLocked + ' WMATIC'} />
        <PairValue
          field="Start Date"
          value={
            fund
              ? new Date(fund.startDate).toLocaleDateString()
              : 'No start date found'
          }
        />
        <PairValue
          field="Mature Date"
          value={
            fund
              ? new Date(fund.matureDate).toLocaleDateString()
              : 'No mature date found'
          }
        />
      </div>
    </div>
  );
};

export default AssetCard;
