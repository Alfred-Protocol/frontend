import axios from 'axios';

export default class UniswapGraphService {
  private readonly BASE_URL =
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

  constructor() {}

  public async getPositionDetails(tokenId: string) {
    const positionQuery = `
      query tokenPosition {
        position(id: ${tokenId}){
            id
            token0 {
                symbol
                derivedETH
                id
                decimals
            }
            token1 {
                symbol
                derivedETH
                id
                decimals
            }
            pool {
                id
                liquidity
                sqrtPrice
                tick
                feeTier
                feeGrowthGlobal0X128
                feeGrowthGlobal1X128
            }
            liquidity
            depositedToken0
            depositedToken1
            feeGrowthInside0LastX128
            feeGrowthInside1LastX128
            tickLower {
                tickIdx
                price0
                price1
                feeGrowthOutside0X128
                feeGrowthOutside1X128
            }
            tickUpper {
                tickIdx
                price0
                price1
                feeGrowthOutside0X128
                feeGrowthOutside1X128
            }
            withdrawnToken0
            withdrawnToken1
            collectedFeesToken0
            collectedFeesToken1
            transaction {
                timestamp
                blockNumber
            }
        }
    }`;

    const axiosResult = await axios.post(this.BASE_URL, {
      query: positionQuery,
    });

    return axiosResult.data;
  }
}
