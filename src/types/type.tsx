import type { BigNumber } from 'ethers';
import type { Address } from 'wagmi';

// token0: 'DAI',
// token1: 'WBTC',
// address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
// address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
// fee: 0.02,
// min: 1500,
// max: 2500,
// amount0: 2,
// amount1: 2000,

type LPPosition = {
  fundManager: Address;
  tokenId: BigNumber;
  liquidity: BigNumber;
  token0: Address;
  token1: Address;
  tickLower: BigNumber;
  tickUpper: BigNumber;
  poolFee: BigNumber;
};

export interface Network {
  id: string;
  name: string;
  desc: string;
  logoURI: string;
  disabled?: boolean;
  isNew?: boolean;
  subgraphEndpoint: string;
}

export interface Tick {
  tickIdx: string;
  liquidityNet: string;
  price0: string;
  price1: string;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  volumeUSD: string;
  logoURI: string;
  decimals: string;
}

export interface Pool {
  id: string;
  feeTier: string;
  liquidity: string;
  tick: string;
  sqrtPrice: string;
  token0Price: string;
  token1Price: string;
}

export interface Price {
  timestamp: number;
  value: number;
}

export interface PriceChart {
  tokenId: string;
  tokenName: string;
  currentPriceUSD: number;
  prices: Price[];
}

export type { LPPosition };
