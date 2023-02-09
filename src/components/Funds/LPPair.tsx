import { Token } from '@uniswap/sdk-core';
import { tickToPrice } from '@uniswap/v3-sdk';
import { polygonMumbai } from '@wagmi/chains';
import { ethers } from 'ethers';
import { Address, erc20ABI, useContractReads } from 'wagmi';
import type { LPPosition } from '../../types/type';
import PairImage from '../Common/PairImage';

type Props = LPPosition;

const LPPair = ({
  fundManager,
  tokenId,
  liquidity,
  token0,
  token1,
  tickLower,
  tickUpper,
  poolFee,
  amount0,
  amount1,
}: Props) => {
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        address: token0,
        abi: erc20ABI,
        functionName: 'symbol',
      },
      {
        address: token0,
        abi: erc20ABI,
        functionName: 'decimals',
      },
      {
        address: token1,
        abi: erc20ABI,
        functionName: 'symbol',
      },
      {
        address: token1,
        abi: erc20ABI,
        functionName: 'decimals',
      },
    ],
  });

  const [token0Symbol, token0Decimals, token1Symbol, token1Decimals] =
    data !== undefined && data.every(Boolean)
      ? data
      : ['WMATIC', 18, 'USDC', 18];

  return (
    <tr>
      <td className="items-center sm:flex">
        <PairImage logo1={undefined} logo2={undefined} />
        {`${token0Symbol} / ${token1Symbol}`}
      </td>
      <td>{poolFee?.toNumber() / 10000}%</td>
      <td className="break-words">
        {convertTickToPrice(
          tickLower?.toNumber(),
          token0,
          token0Decimals ?? 18,
          token1,
          token1Decimals ?? 18
        )}
      </td>
      <td className="break-words">
        {convertTickToPrice(
          tickUpper?.toNumber(),
          token0,
          token0Decimals ?? 18,
          token1,
          token1Decimals ?? 18
        )}
      </td>
      <td className="flex">
        <div>
          <PairImage />
          {amount0.toString()} / {amount1.toString()}
        </div>
        {/*
        // Not possible to do this without a subgraph that indexes blockchain events
        {`${truncateStrToDecimalPlaces(
          depositedToken1
        )} / ${truncateStrToDecimalPlaces(depositedToken0)}`} */}
      </td>
    </tr>
  );
};

const convertTickToPrice = (
  tick: number,
  token0: Address,
  token0Decimals: number,
  token1: Address,
  token1Decimals: number
) => {
  const lpToken0 = new Token(polygonMumbai.id, token0, token0Decimals);
  const lpToken1 = new Token(polygonMumbai.id, token1, token1Decimals);

  const price = tickToPrice(lpToken0, lpToken1, tick);

  const priceString = price.toSignificant(5);

  const priceStringFloat = parseFloat(
    ethers.utils.formatUnits(priceString, token0Decimals)
  );

  // console.log('priceStringFormatted ', priceStringFormatted);

  return priceStringFloat.toFixed(5).toString();
};

export default LPPair;
