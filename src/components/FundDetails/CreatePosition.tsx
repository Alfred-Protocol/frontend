import { BigNumber, ethers } from 'ethers';
import { Label, Modal, TextInput } from 'flowbite-react';
import React, { FormEventHandler, useMemo, useState } from 'react';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import Funds from '../../abi/Funds';
import FundsFactory from '../../abi/FundsFactory';
import { useAppContext } from '../../context/app/appContext';
import CustomButton from '../Common/CustomButton';
import { nearestUsableTick, priceToClosestTick } from '@uniswap/v3-sdk';
import { Price } from '@uniswap/sdk-core';
import { getTokensAmountFromDepositAmountUSD } from '../../utils/uniswapv3/math';
import { useGetTokensAmount } from '../../hooks/useGetTokensAmount';
import { useGetPairTokenAmount } from '../../hooks/useGetPairTokenAmount';

type Props = {
  fundAddress?: string;
};

const CreatePosition = ({
  fundAddress = '0x654ee4dc5ee1edf02dd27d3052c4df238a70c558',
}: Props) => {
  const { state } = useAppContext();

  const [amount1, setAmount1] = useState<string>('0');

  const [minPrice, maxPrice] = state.priceRangeValue;
  const feeTier = state.pool?.feeTier;

  const [minTick, maxTick] = useMemo(() => {
    return [
      convertPriceToTick(
        minPrice,
        Number(state.token0?.decimals ?? '18'),
        Number(state.token1?.decimals ?? '18'),
        Number(feeTier)
      ),
      convertPriceToTick(
        maxPrice,
        Number(state.token0?.decimals ?? '18'),
        Number(state.token1?.decimals ?? '18'),
        Number(feeTier)
      ),
    ];
  }, [
    feeTier,
    maxPrice,
    minPrice,
    state.token0?.decimals,
    state.token1?.decimals,
  ]);

  // Price is "token1/token0"
  const amount0Calc = useGetPairTokenAmount(Number(amount1));
  // const amount1Calc = useGetPairTokenAmount(Number(amount0));

  const token0Details = state.token0;
  const token1Details = state.token1;

  // Convert "minPrice" and "maxPrice" to ticks
  const token0Decimals = isNaN(Number(token0Details?.decimals))
    ? 18
    : Number(token0Details?.decimals);
  const token1Decimals = isNaN(Number(token1Details?.decimals))
    ? 18
    : Number(token1Details?.decimals);

  console.log('amount0Calc', amount0Calc);

  const amount0CalcInWei = ethers.utils.parseUnits(
    `${Math.floor(amount0Calc)}`,
    token0Decimals
  );

  const amount1InWei = ethers.utils.parseUnits(
    `${Math.floor(Number(amount1))}`,
    token1Decimals
  );

  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'createLpPosition',
    chainId: 80001,
    args: [
      token0Details?.id as `0x${string}`,
      token1Details?.id as `0x${string}`,
      amount0CalcInWei,
      amount1InWei,
      minTick,
      maxTick,
      Number(feeTier),
    ],
    enabled: true,
  });

  const { data, isLoading, write } = useContractWrite(config);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    write?.();
  };

  // TODO:
  // 1. Convert price to ticks
  // 2. Convert "deposit amount" to number of token0 and token1
  // 3. Create LP position

  // Before user chooses tokens, don't render anything
  if (!state.token0 || !state.token1) {
    return null;
  }

  return (
    <div className="mt-12">
      <form className="space-y-4 rounded" onSubmit={onSubmit}>
        <div className="space-y-2">
          <span className="text-white">{state.token1?.symbol} amount</span>
          <TextInput
            id="token1Amount"
            type={'text'}
            onChange={(e) => setAmount1(e.target.value.trim())}
            // value={amount1Calc}
            required
            placeholder={`Enter amounts of ${state.token1?.symbol} to deposit`}
          />
        </div>
        <div className="space-y-2">
          <span className="text-white">{state.token0?.symbol} amount</span>
          <TextInput
            id="token0Amount"
            type={'text'}
            required
            readOnly
            value={amount0Calc}
          />
        </div>
        {write && (
          <CustomButton
            className="focus:shadow-outline rounded py-2 px-4"
            type="submit"
            title="Create"
            theme="solidBlue"
          />
        )}
      </form>
    </div>
  );
};

const convertPriceToTick = (
  // Price of "token1" to "token0"
  price: number,
  token0Decimals: number,
  token1Decimals: number,
  poolFee: number
) => {
  const inversePrice = 1 / price;
  const tokenDiffDecimals = token1Decimals - token0Decimals;
  const priceInWei = Math.pow(10, tokenDiffDecimals) * inversePrice;
  const tickVal = Math.log(priceInWei) / Math.log(1.0001);

  if (tickVal < -887272) {
    return -887272;
  }
  if (tickVal > 887272) {
    return 887272;
  }

  return nearestUsableTick(Math.floor(tickVal), poolFee / 50);
};

export default CreatePosition;
