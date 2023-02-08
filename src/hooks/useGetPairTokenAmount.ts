import { AppContextState, useAppContext } from '../context/app/appContext';
import {
  getTokensAmountFromDepositAmountUSD,
  getTokensAmountFromToken0Amount,
} from '../utils/uniswapv3/math';

const useGetPairTokenAmount = (amount0: number) => {
  const { state } = useAppContext();

  if (isNaN(amount0) || amount0 == 0) return 0;

  const P = state.priceAssumptionValue;
  let Pl = state.priceRangeValue[0];
  let Pu = state.priceRangeValue[1];

  if (state.isFullRange && state.poolTicks) {
    const firstTick = state.poolTicks[0];
    const lastTick = state.poolTicks[state.poolTicks.length - 1];
    Pl = Number(firstTick.price0);
    Pu = Number(lastTick.price0);
  }

  const amount1 = getTokensAmountFromToken0Amount(amount0, P, Pl, Pu);
  return amount1;
};

export { useGetPairTokenAmount };
