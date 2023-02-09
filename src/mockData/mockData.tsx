import { BigNumber } from 'ethers';
import type { LPPosition } from '../types/type';

const LPPositionsMock: Array<LPPosition> = [
  {
    token0: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    token1: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    poolFee: BigNumber.from(3000),
    tickLower: BigNumber.from(192200),
    tickUpper: BigNumber.from(198000),
    liquidity: BigNumber.from(10).pow(18),
    fundManager: '0xE1FAE6E277F8302d5BedD1C15e6480C9A75Fb3Bb',
    tokenId: BigNumber.from(100),
    amount0: BigNumber.from(2),
    amount1: BigNumber.from(1),
  },
  {
    token0: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    token1: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    poolFee: BigNumber.from(3000),
    tickLower: BigNumber.from(193600),
    tickUpper: BigNumber.from(198400),
    liquidity: BigNumber.from(10).pow(18),
    fundManager: '0xE1FAE6E277F8302d5BedD1C15e6480C9A75Fb3Bb',
    tokenId: BigNumber.from(150),
    amount0: BigNumber.from(2),
    amount1: BigNumber.from(1),
  },
];

const HomeFundsMockData = [
  {
    manager: '0x329231049012430902423',
    description: `An ETF LP token of USDC and ETH on Uniswap V3 represents a liquidity pool that holds both USDC (a stablecoin pegged to the US dollar) and ETH (Ethereum). \n
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool. .
      `,
    tvl: 5.01,
    curValue: 6.12,
    startDate: '05/02/2023',
    matureDate: '12/02/2023',
    fundAddress: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
    fundName: 'Fund A',
    positions: LPPositionsMock,
  },
  {
    manager: '0x329231049012430902424',
    description: `An ETF LP token of DAI and WBTC on Uniswap V3 represents a liquidity pool that holds both DAI (a stablecoin pegged to the US dollar) and WBTC (Wrapped Bitcoin). \n
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool.

      `,
    tvl: 4.23,
    curValue: 5.45,
    startDate: '01/01/2023',
    matureDate: '05/07/2023',
    fundAddress: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
    fundName: 'Fund A',
    positions: LPPositionsMock,
  },
  {
    manager: '0x329231049012430902424',
    description: `An ETF LP token of DAI and WBTC on Uniswap V3 represents a liquidity pool that holds both DAI (a stablecoin pegged to the US dollar) and WBTC (Wrapped Bitcoin). \n
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool.

      `,
    tvl: 4.23,
    curValue: 5.45,
    startDate: '01/01/2023',
    matureDate: '05/07/2023',
    fundAddress: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
    fundName: 'Fund A',
    positions: LPPositionsMock,
  },
  {
    manager: '0x329231049012430902424',
    description: `An ETF LP token of DAI and WBTC on Uniswap V3 represents a liquidity pool that holds both DAI (a stablecoin pegged to the US dollar) and WBTC (Wrapped Bitcoin). \n
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool.
      The value of the ETF LP token is determined by the value of the underlying assets (DAI and WBTC) in the pool, which can fluctuate. This type of ETF provides investors with exposure to both the stability of the US dollar and the potential of Bitcoin.
      `,
    tvl: 4.23,
    curValue: 5.45,
    startDate: '01/01/2023',
    matureDate: '05/07/2023',
    fundAddress: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
    fundName: 'Fund A',
    positions: LPPositionsMock,
  },
];

export { LPPositionsMock, HomeFundsMockData };
