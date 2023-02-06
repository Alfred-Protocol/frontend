const LPPositionsMock = [
  {
    token0: 'DAI',
    token1: 'WBTC',
    address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
    address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
    fee: 0.02,
    min: 1500,
    max: 2500,
    amount0: 2,
    amount1: 2000,
  },
  {
    token0: 'DAI',
    token1: 'WBTC',
    address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
    address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
    fee: 0.02,
    min: 1500,
    max: 2500,
    amount0: 2,
    amount1: 2000,
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
    positions: [
      {
        token0: 'WETH',
        token1: 'USDC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
        fee: 0.01,
        min: 1295.2,
        max: 1833,
        amount0: 1,
        amount1: 1773,
      },
      {
        token0: 'WETH',
        token1: 'USDC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
        fee: 0.01,
        min: 1295.2,
        max: 1833,
        amount0: 1,
        amount1: 1773,
      },
    ],
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
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
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
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
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
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
];

export { LPPositionsMock, HomeFundsMockData };
