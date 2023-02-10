import { useAppContext } from '@/context/app/appContext';
import { useModalContext } from '@/context/modal/modalContext';
import { useMemo } from 'react';
import { Table } from 'src/components/Chart/atomic';
import {
  estimateFee,
  getLiquidityDelta,
  getLiquidityFromTick,
  getTickFromPrice,
  getTokensAmountFromDepositAmountUSD
} from 'src/utils/uniswapv3/math';

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
        <div className="dark:blackfill mb-4 h-full w-full rounded-xl bg-blackfillLess"></div>
      </div>
    );
  }

  return (
    <div className="relative flex lg:w-2/6 items-center justify-center rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-fuchsia-100">
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Projected Fees <span className="inline text-gray-500">(24h)</span>
        </h3>
        <div className="text-center text-3xl mb-6">${estimatedFee.toFixed(2)}</div>
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
