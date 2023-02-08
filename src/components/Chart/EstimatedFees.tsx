import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Dollar, Heading, Table } from 'src/components/Chart/atomic';
// import { useAppContext } from '../context/app/appContext';
import {
  estimateFee,
  getLiquidityDelta,
  getLiquidityFromTick,
  getTickFromPrice,
  getTokensAmountFromDepositAmountUSD,
} from 'src/utils/uniswapv3/math';
import { useModalContext } from '@/context/modal/modalContext';
import { ModalActionType } from '@/context/modal/modalReducer';
import { useAppContext } from '@/context/app/appContext';
// import { ScreenWidth } from '../utils/styled';
// import { useModalContext } from '../context/modal/modalContext';
// import { ModalActionType } from '../context/modal/modalReducer';

const SettingContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;

  & > div.padding {
    padding: 16px;
  }
`;

// @media only screen and (max-width: ${ScreenWidth.MOBILE}px) {
//   & > div.padding {
//     padding: 12px;
//   }
//   border-radius: 12px;
// }
const Fee = styled.span`
  display: block;
  color: rgb(37, 175, 96);
  font-weight: 500;
  font-size: 2.4rem;
  margin-top: -10px;

  & > span {
    margin-right: 3px;
    display: inline-block;
    font-weight: 600;
    transform: translateY(2px);
  }
`;
const Tag = styled.div`
  display: inline-block;
  color: rgba(255, 255, 255, 0.3);
`;
const ILButton = styled.button`
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.075);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;

  cursor: pointer;
  display: block;
  width: 100%;
  color: #ccc;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 8px;

  &:hover {
    color: white;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface Props {
  isLoading: boolean;
}

const EstimatedFees = ({ isLoading }: Props) => {
  const { state } = useAppContext();
  const modalContext = useModalContext();

  const P = state.priceAssumptionValue;
  let Pl = state.priceRangeValue[0];
  let Pu = state.priceRangeValue[1];
  const priceUSDX = state.token1PriceChart?.currentPriceUSD || 1;
  const priceUSDY = state.token0PriceChart?.currentPriceUSD || 1;
  const depositAmountUSD = state.depositAmountValue;

  if (state.isFullRange && state.poolTicks) {
    const firstTick = state.poolTicks[0];
    const lastTick = state.poolTicks[state.poolTicks.length - 1];
    Pl = Number(firstTick.price0);
    Pu = Number(lastTick.price0);
  }

  const { amount0, amount1 } = getTokensAmountFromDepositAmountUSD(
    P,
    Pl,
    Pu,
    priceUSDX,
    priceUSDY,
    depositAmountUSD
  );

  const deltaL = getLiquidityDelta(
    P,
    Pl,
    Pu,
    amount0,
    amount1,
    Number(state.token0?.decimals || 18),
    Number(state.token1?.decimals || 18)
  );

  let currentTick = getTickFromPrice(
    P,
    state.token0?.decimals || '18',
    state.token1?.decimals || '18'
  );

  if (state.isPairToggled) currentTick = -currentTick;

  const L = useMemo(
    () => getLiquidityFromTick(state.poolTicks || [], currentTick),
    [state.poolTicks, currentTick]
  );
  const volume24H = state.volume24H;
  const feeTier = state.pool?.feeTier || '';

  const estimatedFee =
    P >= Pl && P <= Pu ? estimateFee(deltaL, L, volume24H, feeTier) : 0;

  if (isLoading) {
    return (
      <div role="status" className="w-full max-w-sm animate-pulse">
        <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-white">
      <div className="padding">
        <Heading>
          Projected Fees <Tag>(24h)</Tag>
        </Heading>
        <div className="text-center text-3xl">
          <Dollar>$</Dollar>
          {estimatedFee.toFixed(2)}
        </div>
        <Table>
          <div>MONTHLY</div>
          <div>${(estimatedFee * 30).toFixed(2)}</div>
          <div>
            {((100 * (estimatedFee * 30)) / depositAmountUSD).toFixed(2)}%
          </div>
        </Table>
        <Table>
          <div>YEARLY (APR)</div>
          <div>${(estimatedFee * 365).toFixed(2)}</div>
          <div>
            {((100 * (estimatedFee * 365)) / depositAmountUSD).toFixed(2)}%
          </div>
        </Table>
      </div>
    </div>
  );
};

export default EstimatedFees;
