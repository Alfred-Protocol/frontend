import type { PositionData } from '@/pages/funds/[address]/manage';
import type { LPPosition } from '@/types/type';
import PairImage from '../Common/PairImage';

const mockData = [
  {
    token0: 'DAI',
    token1: 'WBTC',
    address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
    address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
    fee: 0.02,
    min: 1500,
    max: 2500,
    amount0: 2,
    amount1: 2000,
  },
  {
    token0: 'DAI',
    token1: 'WBTC',
    address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
    address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
    fee: 0.02,
    min: 1500,
    max: 2500,
    amount0: 2,
    amount1: 2000,
  },
];

const FundTableList = ({ data = mockData }: { data?: LPPosition[] }) => {
  return (
    <div className="rounded-lg shadow">
      <table className="w-full table-auto border-separate -translate-x-3 text-xs [border-spacing:0.75rem]">
        <thead>
          <tr className="text-grayDar translate-y-0">
            <th className="pb-0">PAIR</th>
            <th className="pb-0">FEE</th>
            <th className="pb-0">MIN</th>
            <th className="pb-0">MAX</th>
            <th className="pb-0">AMOUNTs</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                token0,
                token1,
                address0,
                address1,
                fee,
                min,
                max,
                amount0,
                amount1,
              },
              idx
            ) => (
              <tr key={idx}>
                <td className="flex-wrap items-center sm:flex">
                  <PairImage logo1={undefined} logo2={undefined} />
                  {`${token0} / ${token1}`}
                </td>
                <td className="">{fee}%</td>
                <td className="">{min}</td>
                <td className="">{max}</td>
                <td className="flex-wrap items-center sm:flex">
                  <PairImage logo1={undefined} logo2={undefined} />
                  {`${amount0} / ${amount1}`}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FundTableList;
