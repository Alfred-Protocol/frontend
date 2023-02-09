import type { LPPosition } from '@/types/type';
import { BigNumber } from 'ethers';
import LPPair from './LPPair';

const mockData: Array<LPPosition> = [
  {
    token1: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    token0: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    poolFee: BigNumber.from(3000),
    tickLower: BigNumber.from(192200),
    tickUpper: BigNumber.from(198000),
    liquidity: BigNumber.from(10).pow(18),
    fundManager: '0xE1FAE6E277F8302d5BedD1C15e6480C9A75Fb3Bb',
    tokenId: BigNumber.from(100),
  },
  {
    token1: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    token0: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    poolFee: BigNumber.from(3000),
    tickLower: BigNumber.from(193600),
    tickUpper: BigNumber.from(198400),
    liquidity: BigNumber.from(10).pow(18),
    fundManager: '0xE1FAE6E277F8302d5BedD1C15e6480C9A75Fb3Bb',
    tokenId: BigNumber.from(150),
  },
];

const FundTableList = ({ data = mockData }: { data?: LPPosition[] }) => {
  return (
    <div className="rounded-lg shadow">
      <table className="w-full table-auto border-separate -translate-x-3 text-xs [border-spacing:0.75rem]">
        <thead>
          <tr className="translate-y-0 text-grayDark">
            <th className="pb-0">PAIR</th>
            <th className="pb-0">FEE</th>
            <th className="pb-0">MIN</th>
            <th className="pb-0">MAX</th>
            <th className="pb-0">AMOUNTS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lpPair) => (
            <LPPair key={lpPair?.tokenId?.toString()} {...lpPair} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundTableList;
