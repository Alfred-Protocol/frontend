import Web3 from 'web3';
import { abi as IUniswapV2Pair } from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import { BigNumber } from 'bignumber.js';
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk';

// Create a new Web3 Instance
const web3 = new Web3(window.ethereum);

// https://etherscan.io/token/0xc0067d751fb1172dbab1fa003efe214ee8f419b6
// Replace the addresses to point to your Farming Contract
// and LP Token Contract on the desired network
const FARMING_CONTRACT_ADDRESS = '0xeF682Ae89e74BcBB3fC3B24B6b3e************';
const LP_TOKEN_ADDRESS = '0x9ba8dd47C8a85aD45aB7dab82727************';

// Get DOGECOIN price in ETH
const getDogecoinPriceInETH = async () => {
  try {
    const DOGECOIN = new Token(
      ChainId.MAINNET, //ChainId for Ethereum Mainnet
      '0x4206931337dc273a630d328da6441786bfad668f', //DOGECOIN address on Ethereum Mainnet
      8 //Number of Decimals
    );
    const pair = await Fetcher.fetchPairData(DOGECOIN, WETH[DOGECOIN.chainId]);
    const route = new Route([pair], WETH[DOGECOIN.chainId]);
    return route.midPrice.toSignificant(6);
  } catch (e) {
    console.log(e);
    return 0;
  }
};

// Get DOGECOIN price in BNB
const getDodgecoinPriceInBNB = async () => {
  try {
    const response = await fetch('https://api.pancakeswap.info/api/v2/tokens');
    const priceData = await response.json();
    return priceData.data['0xbA2aE424d960c26247Dd6c32edC70B295c744C43']
      .price_BNB; //Address of DOGECOIN on BSC Mainnet
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const getLpTokenReserves = async () => {
  try {
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );
    const totalReserves = await LpTokenContract.methods.getReserves().call();
    // For ETH/DOGE Pool totalReserves[0] = ETH Reserve and totalReserves[1] = DOGE Reserve
    // For BNB/DOGE Pool totalReserves[0] = BNB Reserve and totalReserves[1] = DOGE Reserve
    return [totalReserves[0], totalReserves[1]];
  } catch (e) {
    console.log(e);
    return [0, 0];
  }
};

const getLpTokenTotalSupply = async () => {
  try {
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );
    const totalSupply = await LpTokenContract.methods.totalSupply().call();
    return totalSupply;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const calculateLpTokenPrice = async () => {
  let rewardTokenPrice = 0;
  // For Price IN ETH
  // Reward Token is Dodgecoin in our case
  rewardTokenPrice = await getDogecoinPriceInETH();

  // For Price in BNB
  // If you want to do calculations in BNB uncomment the line below and comment line number 78
  // rewardTokenPrice = await getDodgecoinPriceInBNB()

  // 1 * rewardTokenPrice because 1 is the price of ETH or BNB in respective mainnet
  // This is square root of (p0 * p1) with reference to the image above
  const tokenPriceCumulative = new BigNumber(1 * rewardTokenPrice).sqrt();

  // For ETH / DOGE pair totalReserve[0] = ETH in the contract and totalReserve[1] = DOGE in the contract
  // For BNB / DOGE pair totalReserve[0] = BNB in the contract and totalReserve[1] = DOGE in the contract
  const totalReserve = await getLpTokenReserves();

  // This is square root of (r0 * r1) with reference to the image above
  const tokenReserveCumulative = new BigNumber(totalReserve[0])
    .times(totalReserve[1])
    .sqrt();

  // Total Supply of LP Tokens in the Market
  const totalSupply = await getLpTokenTotalSupply();

  // Calculate LP Token Price in accordance to the image above
  const lpTokenPrice = tokenReserveCumulative
    .times(tokenPriceCumulative)
    .times(2)
    .div(totalSupply);

  // If lpTokenPrice is a valid number return lpTokenPrice or return 0
  return lpTokenPrice.isNaN() || !lpTokenPrice.isFinite()
    ? 0
    : lpTokenPrice.toNumber();
};

const calculateAPY = async () => {
  try {
    //BLOCKS_PER_DAY varies acccording to network all values are approx and they keep changing
    //BLOCKS_PER_DAY = 21600 for Kovan Testnet
    //BLOCKS_PER_DAY = 28800 for BSC Testnet
    //BLOCKS_PER_DAY = 6400 for Ethereum Mainnet
    //I am using the value for Ethereum mainnet
    const BLOCKS_PER_YEAR = 6400 * 365;

    let rewardTokenPrice = 0;
    // For Price IN ETH
    // Reward Token is Dodgecoin in our case
    rewardTokenPrice = await getDogecoinPriceInETH();

    // For Price in BNB
    // If you want to do calculations in BNB uncomment the line below and comment line number 124
    // rewardTokenPrice = await getDodgecoinPriceInBNB()

    // REWARD_PER_BLOCK = Number of tokens your farming contract gives out per block
    const REWARD_PER_BLOCK = 10000000000;
    const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
      .times(REWARD_PER_BLOCK)
      .times(BLOCKS_PER_YEAR);

    // Get Total LP Tokens Deposited in Farming Contract
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );

    const totalLpDepositedInFarmingContract = await LpTokenContract.methods
      .balanceOf(FARMING_CONTRACT_ADDRESS)
      .call();

    // Calculate LP Token Price
    const lpTokenPrice = await calculateLpTokenPrice();

    // Calculate Total Price Of LP Tokens in Contract
    const totalPriceOfLpTokensInFarmingContract = new BigNumber(
      lpTokenPrice
    ).times(totalLpDepositedInFarmingContract);

    // Calculate APY
    const apy = totalRewardPricePerYear
      .div(totalPriceOfLpTokensInFarmingContract)
      .times(100);

    // Return apy if apy is a valid number or return 0
    return apy.isNaN() || !apy.isFinite() ? 0 : apy.toNumber();
  } catch (e) {
    console.log(e);
    return 0;
  }
};
