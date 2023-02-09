import PairValue from '../Common/PairValues';
// import ETH from 'src/components/Assets/ETH.png';
import ETH from 'src/assets/ETH.png';
import USDT from 'src/assets/USDT.jpg';

import Funds from '@/abi/Funds';
import type { Deposit } from '@/hooks/useDeposits';
import useDatabaseFund from '@/hooks/useDatabaseFund';
import { ethers } from 'ethers';
import Image from 'next/image';
import { Address, useAccount, useContractReads } from 'wagmi';
import CustomButton from '../Common/CustomButton';

interface AssetsDetailProps {
  fundAddress: Address;
  deposits?: Deposit[];
}

// Convert to ENUM
const tvlIndex = 0;
const stableCoinAddressIndex = 1;
const lpPositionsIndex = 2;
const depositedAmountIndex = 3;

const AssetCard = ({ fundAddress, deposits }: AssetsDetailProps) => {
  console.log(fundAddress);
  const { address } = useAccount();
  const { data: fund } = useDatabaseFund(fundAddress);
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
  const depositedAmount = ethers.utils.formatUnits(
    data[depositedAmountIndex],
    18
  );

  if (parseFloat(depositedAmount) <= 0) {
    return null;
  }

  return (
    <div
      className="w-full cursor-pointer rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-white transition-all hover:bg-gray-800"
      onClick={() => {}}
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
        <CustomButton title="Withdraw" theme="solidPurple" className="" />
      </div>
      <div className="mr-12 text-left">
        <p className="mb-2 text-2xl sm:text-3xl">{}</p>
        <PairValue field="TVL" value={totalValueLocked + ' ETH'} />
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
