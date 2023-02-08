import PairValue from '../Common/PairValues';
import type { FundDetailsProps } from '../Funds/FundDetails';
import FundTableList from '../Funds/FundTableList';
// import ETH from 'src/components/Assets/ETH.png';
import USDT from 'src/assets/USDT.jpg';
import ETH from 'src/assets/ETH.png';

import Image from 'next/image';
import CustomButton from '../Common/CustomButton';
import type { LPPosition } from '@/types/type';
import { Address, useContractReads } from 'wagmi';
import Funds from '@/abi/Funds';
import { BigNumber, ethers } from 'ethers';
import { LPPositionsMock } from '@/mockData/mockData';
import { useRouter } from 'next/router';

interface AssetsDetailProps {
  // totalValueLocked: number;
  // matureDate: string;
  // startDate: string;
  // yieldPercentage: number;
  // logo1: any;
  // logo2: any;
  // fundName: string;
  // lpPositions: LPPosition[];
  // amount0: number;
  // amount1: number;
  fundAddress?: Address;
  curUserAddress?: Address;
}

// Convert to ENUM
const tvlIndex = 0;
const startDateIndex = 1;
const matureDateIndex = 2;
const stableCoinIndex = 3;
const fundManagerIndex = 4;
const fundNameIndex = 5;
const lpPositionsIndex = 6;
const stableCoinAddressIndex = 7;
const depositedAmountIndex = 8;

const AssetsDetail = ({
  fundAddress = undefined,
  curUserAddress = '' as Address,
}: // totalValueLocked = 32,
// matureDate = '05/03/2023',
// startDate = '01/02/2023',
// yieldPercentage = 20.4,
// logo1 = ETH,
// logo2 = USDT,
// fundName = 'Fund A',
// lpPositions = [],
// amount0,
// amount1,
AssetsDetailProps) => {
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
        functionName: 'startDate',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'matureDate',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'stablecoin',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'fundManager',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'fundName',
      },
      {
        address: fundAddress,
        abi: Funds,
        functionName: 'fetchAllLpPositions',
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
        args: [curUserAddress],
      },
    ],
    // @marcuspang -> Does it force a re-fetch every 1min?
    cacheTime: 60 * 1000, // 1min
    enabled: !!fundAddress,
  });

  if (!fundAddress) {
    return <></>;
  }

  console.log('data ', data);
  if (!data) {
    return <></>;
  }

  const fundName = data[fundNameIndex];
  const totalValueLocked = ethers.utils.formatUnits(data[tvlIndex], 18);
  const yieldPercentage = 12.2;
  const startDate = new Date(
    data[startDateIndex]?.toNumber()
  ).toLocaleDateString();
  const matureDate = new Date(
    data[matureDateIndex]?.toNumber()
  ).toLocaleDateString();
  const logo1 = ETH;
  const logo2 = USDT;
  const lpPositions =
    data[lpPositionsIndex]?.map((position) => ({
      ...position,
      tickLower: BigNumber.from(position.tickLower),
      tickUpper: BigNumber.from(position.tickUpper),
      poolFee: BigNumber.from(position.poolFee),
    })) || LPPositionsMock;
  const amount0 = 0;
  const amount1 = 1;
  const fundManagerAddress = data[fundManagerIndex];
  const depositedAmount = ethers.utils.formatUnits(
    data[depositedAmountIndex],
    18
  );

  if (parseFloat(depositedAmount) <= 0) {
    return <></>;
  }

  return (
    <div
      className="relative flex w-3/5 cursor-pointer rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-white"
      onClick={() => router.push('funds/' + fundAddress)}
    >
      <CustomButton
        title="Add Position"
        theme="solidPurple"
        className="absolute right-5 top-5"
      />
      <div className="mr-12 text-left">
        <p className="mb-2 text-2xl sm:text-3xl">{fundName}</p>
        <PairValue field="TVL" value={totalValueLocked + ' ETH'} />
        <div className="flex items-center space-x-2">
          <p className="font-semibold sm:text-xl">Yield:</p>
          <p className="text-greenGrowth">{yieldPercentage}%</p>
        </div>
        <PairValue field="Start Date" value={startDate} />
        <PairValue
          field="Mature Date"
          value={matureDate}
          style={{ marginBottom: 5 }}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-1 space-x-6">
          <div className="flex items-center justify-center space-x-2">
            <Image
              src={logo1}
              width={40}
              alt={''}
              style={{ borderRadius: 100 }}
            />
            <p className="text-2xl">{amount0.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Image
              src={logo2}
              width={40}
              alt={''}
              style={{ borderRadius: 100 }}
            />
            <p className="text-2xl">{amount1.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex-1">
          <FundTableList data={lpPositions} />
        </div>
      </div>
    </div>
  );
};

export default AssetsDetail;
