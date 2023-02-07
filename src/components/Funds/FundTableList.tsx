import type { PositionData } from '@/pages/funds/[address]/manage';
import type { LPPosition } from '@/types/type';
import { BigNumber } from 'ethers';
import PairImage from '../Common/PairImage';
import { tickToPrice } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import type { Address } from 'wagmi';
import { useMemo } from 'react';
import LPPair from './LPPair';

const mockData: Array<LPPosition> = [
  {
    token0: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    token1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
    poolFee: BigNumber.from(3000),
    tickLower: BigNumber.from(192200),
    tickUpper: BigNumber.from(198000),
    liquidity: BigNumber.from(10).pow(18),
    fundManager: '0xE1FAE6E277F8302d5BedD1C15e6480C9A75Fb3Bb',
    tokenId: BigNumber.from(100),
  },
  {
    token0: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    token1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
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
            <LPPair key={lpPair.tokenId.toString()} {...lpPair} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundTableList;
