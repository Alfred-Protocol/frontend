import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { AxisOptions } from 'react-charts';

type DailyData = {
  date: Date;
  value: number;
};

type Series = {
  label: string;
  data: DailyData[];
};

const generateData = (numberOfDays: number = 5, maxData: number = 10) => {
  const today = new Date();
  const dates = new Array(numberOfDays).fill(0).map((_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    return date;
  });

  return new Array(numberOfDays).fill(0).map((_, index) => {
    return {
      date: dates[index],
      value: Math.floor(Math.random() * maxData),
    };
  }) as DailyData[];
};

const Chart = dynamic(() => import('react-charts').then((mod) => mod.Chart), {
  ssr: false,
});

const FundLiquidityGraph = () => {
  const data: Series[] = [
    {
      label: 'Daily Yield (%)',
      data: generateData(),
    },
    {
      label: 'Fees APR (%)',
      data: generateData(),
    },
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<DailyData> => ({
      getValue: (datum) => datum.date,
      scaleType: 'time',
      show: false,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DailyData>[] => [
      {
        getValue: (datum) => datum.value,
        show: false,
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data,
        primaryAxis: primaryAxis as AxisOptions<unknown>,
        secondaryAxes: secondaryAxes as AxisOptions<unknown>[],
        interactionMode: 'closest',
        dark: true,
      }}
    />
  );
};

export default FundLiquidityGraph;
