import { twMerge } from 'tailwind-merge';
import type { Address } from 'wagmi';

interface PositionData {
  created: string;
  address: Address;
  token1: string;
  token2: string;
  amount1: number;
  amount2: number;
  value1: number;
  value2: number;
}

const mockData: PositionData[] = [
  {
    created: '03/01/2023',
    address: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    token1: 'ETH',
    token2: 'USDC',
    amount1: 100.01,
    amount2: 20000.03,
    value1: 120.5,
    value2: 20400.4,
  },
  {
    created: '03/02/2023',
    address: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA2',
    token1: 'ETH',
    token2: 'USDT',
    amount1: 500.01,
    amount2: 40000.03,
    value1: 800.5,
    value2: 40800.4,
  },
];

const FundTable = ({ data = mockData }: { data?: PositionData[] }) => {
  return (
    <div className="mt-20 rounded-lg bg-slate-100 px-6 py-6 shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b-2 border-purple-200">
            <th className="pb-2">Created</th>
            <th className="pb-2">Position Address</th>
            <th className="pb-2">Token A</th>
            <th className="pb-2">Token B</th>
            <th className="pb-2">Token A Deposited</th>
            <th className="pb-2">Token B Deposited</th>
            <th className="pb-2">Token A Value</th>
            <th className="pb-2">Token B Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              address,
              amount1,
              amount2,
              created,
              token1,
              token2,
              value1,
              value2,
            }) => (
              <tr key={address}>
                <td className="py-2">{created}</td>
                <td className="py-2">{address}</td>
                <td className="py-2">{token1}</td>
                <td className="py-2">{token2}</td>
                <td className="py-2">{amount1}</td>
                <td className="py-2">{amount2}</td>
                <td
                  className={twMerge(
                    `py-2 font-bold`,
                    value1 > amount1 ? 'text-green-700' : 'text-red-700'
                  )}
                >
                  {value1}
                </td>
                <td
                  className={twMerge(
                    `py-2 font-bold`,
                    value1 > amount1 ? 'text-green-700' : 'text-red-700'
                  )}
                >
                  {value2}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FundTable;
