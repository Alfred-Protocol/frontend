import { Token } from '@uniswap/sdk-core';
import { tickToPrice } from '@uniswap/v3-sdk';
import React, { useEffect } from 'react';
import { Address, useContractRead, useContractReads } from 'wagmi';
import type { LPPosition } from '../../types/type';
import PairImage from '../Common/PairImage';
import { erc20ABI } from 'wagmi';
import { ethers } from 'ethers';

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
    data ?? [];

  return (
    <tr>
      <td className="flex-wrap items-center sm:flex">
        <PairImage logo1={undefined} logo2={undefined} />
        {`${token0Symbol} / ${token1Symbol}`}
      </td>
      <td className="">{poolFee.toNumber() / 10000}%</td>
      <td className="">
        {convertTickToPrice(
          tickLower.toNumber(),
          token0,
          token0Decimals ?? 18,
          token1,
          token1Decimals ?? 18
        )}
      </td>
      <td className="">
        {convertTickToPrice(
          tickUpper.toNumber(),
          token0,
          token0Decimals ?? 18,
          token1,
          token1Decimals ?? 18
        )}
      </td>
      <td className="flex-wrap items-center sm:flex">
        <PairImage logo1={undefined} logo2={undefined} />
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
  const lpToken0 = new Token(80001, token0, token0Decimals);
  const lpToken1 = new Token(80001, token1, token1Decimals);

  const price = tickToPrice(lpToken0, lpToken1, tick);
  const priceString = price.toSignificant(5);

  return ethers.utils.formatUnits(priceString, token0Decimals);
};

export default LPPair;
