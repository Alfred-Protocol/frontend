import { BigNumber } from 'ethers';
import { Label, Modal, TextInput } from 'flowbite-react';
import React, { FormEventHandler, useMemo, useState } from 'react';
import { Address, usePrepareContractWrite } from 'wagmi';
import Funds from '../../abi/Funds';
import FundsFactory from '../../abi/FundsFactory';
import { useAppContext } from '../../context/app/appContext';
import CustomButton from '../Common/CustomButton';
import { nearestUsableTick, priceToClosestTick } from '@uniswap/v3-sdk';
import { Price } from '@uniswap/sdk-core';
import { getTokensAmountFromDepositAmountUSD } from '../../utils/uniswapv3/math';
import { useGetTokensAmount } from '../../hooks/useGetTokensAmount';

type Props = {
  onClose: () => void;
};

const CreatePosition = () => {
  const { state } = useAppContext();

  const [lowerTick, setLowerTick] = useState<string>('0');
  const [upperTick, setUpperTick] = useState<string>('0');

  const [token0, setToken0] = useState<Address>('0x');
  const [token1, setToken1] = useState<Address>('0x');

  const [amount0, setAmount0] = useState<string>('0');
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

  const [amount0Calc, amount1Calc] = useGetTokensAmount(state);

  // Convert "minPrice" and "maxPrice" to ticks

  const { config } = usePrepareContractWrite({
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: Funds,
    functionName: 'createLpPosition',
    args: [
      token0!,
      token1!,
      BigNumber.from(amount0),
      BigNumber.from(amount1),
      BigNumber.from(lowerTick).toNumber(),
      BigNumber.from(upperTick).toNumber(),
      3000,
    ],
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (lowerTick != null || upperTick != null) {
      alert('Please enter min and max price');
      return;
    }

    if (token0 != null || token1 != null) {
      alert('Please enter token0 and token1');
      return;
    }
  };

  // TODO:
  // 1. Convert price to ticks
  // 2. Convert "deposit amount" to number of token0 and token1
  // 3. Create LP position

  return (
    <div>
      <form className="space-y-4 rounded" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="fundName" className="text-white">
            Token 0 amount
          </Label>
          <TextInput
            id="token0Amount"
            type={'text'}
            onChange={(e) => setAmount0(e.target.value.trim())}
            required
            placeholder="Enter amounts of token0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fundName">Token 1 amount</Label>
          <TextInput
            id="token1Amount"
            type={'text'}
            onChange={(e) => setAmount1(e.target.value.trim())}
            required
            placeholder="Enter amount of token1"
          />
        </div>
        <CustomButton
          className="focus:shadow-outline rounded py-2 px-4"
          type="submit"
          title="Create"
          theme="solidBlue"
        />
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

  return nearestUsableTick(Math.floor(tickVal), poolFee / 50);
};

export default CreatePosition;
