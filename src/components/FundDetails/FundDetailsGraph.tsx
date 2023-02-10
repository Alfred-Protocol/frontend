import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { AxisOptions } from 'react-charts';

interface Props {}

type DailyData = {
  date: Date;
  value: number;
};

type SeriesData = {
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
      value: Math.random() * maxData,
    };
  }) as DailyData[];
};

const Chart = dynamic(() => import('react-charts').then((mod) => mod.Chart), {
  ssr: false,
});

const FundDetailGraph = (props: Props) => {
  const data: SeriesData[] = [
    {
      label: 'Free Assets',
      data: generateData(),
    },
    {
      label: 'Locked Assets',
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
    <div className="relative max-w-full flex-1 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-2 px-2 text-left text-white">
      <div className="relative h-full w-full">
        <Chart
          options={{
            data,
            primaryAxis: primaryAxis as AxisOptions<unknown>,
            secondaryAxes: secondaryAxes as AxisOptions<unknown>[],
            interactionMode: 'closest',
            dark: true,
          }}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default FundDetailGraph;
