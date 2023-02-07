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
  token0: string;
  token1: string;
  address0: string;
  address1: string;
  fee: number;
  min: number;
  max: number;
  amount0: number;
  amount1: number;
};

export type { LPPosition };