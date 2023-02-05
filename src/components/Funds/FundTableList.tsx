import type { PositionData } from '@/pages/funds/[address]/manage';
import PairImage from '../Common/PairImage';

const mockData = [
  {
    token1: 'ETH',
    token2: 'USDC',
    feePercentage: 0.01,
    min: 1543,
    max: 1672,
    amount1: 1,
    amount2: 1843,
  },
  {
    token1: 'ETH',
    token2: 'USDC',
    feePercentage: 0.01,
    min: 1543,
    max: 1672,
    amount1: 1,
    amount2: 1843,
  },
];

const FundTableList = ({ data = mockData }: { data?: any[] }) => {
  return (
    <div className="rounded-lg shadow">
      <table className="w-full table-auto text-xs">
        <thead>
          <tr className="translate-y-0 text-grayDark">
            <th className="pb-0">PAIR</th>
            <th className="pb-0">FEE</th>
            <th className="pb-0">MIN</th>
            <th className="pb-0">MAX</th>
            <th className="pb-0">AMOUNTs</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              token1,
              token2,
              address,
              min,
              max,
              feePercentage,
              amount1,
              amount2,
            }) => (
              <tr key={address}>
                <td className="flex items-center">
                  <PairImage logo1={undefined} logo2={undefined} />
                  {`${token1} / ${token2}`}
                </td>
                <td className="">{feePercentage}%</td>
                <td className="">{min}</td>
                <td className="">{max}</td>
                <td className="flex flex-wrap">
                  <PairImage logo1={undefined} logo2={undefined} />
                  {`${token1} / ${token2}`}
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
