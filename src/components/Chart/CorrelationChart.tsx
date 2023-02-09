import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import D3CorrelationChart, {
  findMax,
  findMin,
  Point,
} from './D3CorrelationChart';
import { useAppContext } from '@/context/app/appContext';
import { Heading } from './atomic';
import { ScreenWidth } from './setting/Setting';

export interface Price {
  timestamp: number;
  value: number;
}

export interface PriceChart {
  tokenId: string;
  tokenName: string;
  currentPriceUSD: number;
  prices: Price[];
}

export const averageArray = (data: number[]): number => {
  return data.reduce((result, val) => result + val, 0) / data.length;
};

const Stat = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 7px;

  @media only screen and (max-width: ${ScreenWidth.MOBILE}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const StatItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: #999;
  padding: 3px;

  & > div {
    padding: 3px 12px;
    margin-right: 7px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
  }

  &.mobile {
    display: none;

    @media only screen and (max-width: ${ScreenWidth.MOBILE}px) {
      display: flex;
    }
  }
`;

let d3Chart: D3CorrelationChart | null = null;
const CorrelationChart = () => {
  const { state } = useAppContext();
  const [data, setData] = useState<Point[]>([]);
  const refElement = useRef<HTMLDivElement>(null);

  const processData = (
    token0PriceChart: PriceChart | null,
    token1PriceChart: PriceChart | null
  ): Point[] => {
    if (token0PriceChart === null || token1PriceChart === null) {
      return [];
    }

    const points: Point[] = [];
    const length = Math.min(
      token0PriceChart.prices.length,
      token1PriceChart.prices.length
    );
    for (let i = 0; i < length; ++i) {
      points.push({
        x: token0PriceChart.prices[i].timestamp,
        y: token1PriceChart.prices[i].value / token0PriceChart.prices[i].value,
      });
    }

    return points;
  };

  useEffect(() => {
    if (!state.token0PriceChart || !state.token1PriceChart) return;

    const data = processData(state.token0PriceChart, state.token1PriceChart);
    setData(data);

    let width = 500;
    let height = 300;
    if (refElement.current) {
      width = refElement.current.offsetWidth;
    }

    if (d3Chart) d3Chart.destroy();

    d3Chart = new D3CorrelationChart(refElement.current, {
      data,
      width,
      height,
      minRange: state.priceRangeValue[0],
      maxRange: state.priceRangeValue[1],
      mostActivePrice: state.priceAssumptionValue,
    });
    // eslint-disable-next-line
  }, [refElement, state.token0PriceChart, state.token1PriceChart]);

  useEffect(() => {
    if (!d3Chart) return;

    d3Chart.updateMostActivePriceAssumption(state.priceAssumptionValue);
  }, [state.priceAssumptionValue]);

  useEffect(() => {
    if (!d3Chart) return;

    d3Chart.updateMinMaxPriceRange(
      state.priceRangeValue[0],
      state.priceRangeValue[1],
      state.isFullRange
    );
  }, [state.priceRangeValue, state.isFullRange]);

  if (state.token0PriceChart === null || state.token1PriceChart === null) {
    return null;
  }

  return (
    <div className="flex-1 rounded-xl border-2 border-[#EF5DA8] bg-blackfill text-left text-fuchsia-100">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">
            {state.token0?.symbol} / {state.token1?.symbol} Correlation{' '}
            <span className="inline text-gray-500">(1 month)</span>
          </div>

          <div className="hidden text-lg lg:inline">
            Price: {Number(state.pool?.token0Price).toFixed(2)}{' '}
            {state.token0?.symbol} / {state.token1?.symbol}
          </div>
        </div>
      </div>

      <div ref={refElement} />

      <div className="p-4">
        <Stat>
          <StatItem>
            <div>MIN</div>{' '}
            <span>{findMin(data.map((d) => d.y)).toFixed(4)}</span>
          </StatItem>
          <StatItem>
            <div>MAX</div>{' '}
            <span>{findMax(data.map((d) => d.y)).toFixed(4)}</span>
          </StatItem>
          <StatItem>
            <div>AVG</div>{' '}
            <span>{averageArray(data.map((d) => d.y)).toFixed(4)}</span>
          </StatItem>
          <StatItem className="mobile">
            <div>$$$</div>{' '}
            <span>
              {Number(state.pool?.token0Price).toFixed(2)}{' '}
              {state.token0?.symbol} / {state.token1?.symbol}
            </span>
          </StatItem>
        </Stat>
      </div>
    </div>
  );
};

export default CorrelationChart;
