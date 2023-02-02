import type { tokenData } from '@/pages/funds/[address]/manage';

const mockData: tokenData[] = [
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
    address: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    token1: 'ETH',
    token2: 'USDT',
    amount1: 500.01,
    amount2: 40000.03,
    value1: 800.5,
    value2: 40800.4,
  },
];
const FundTable = ({ data = mockData }: { data: tokenData[] }) => {
  return (
    <div className="mt-20 bg-slate-100 px-6 py-6 rounded-lg shadow">
      <table className="table-auto w-full">
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
          {data.map((tokenData) => {
            return (
              <tr key={tokenData.address}>
                <td className="py-2">{tokenData.created}</td>
                <td className="py-2">{tokenData.address}</td>
                <td className="py-2">{tokenData.token1}</td>
                <td className="py-2">{tokenData.token2}</td>
                <td className="py-2">{tokenData.amount1}</td>
                <td className="py-2">{tokenData.amount2}</td>
                <td className="py-2 text-green-700 font-bold">
                  {tokenData.amount1 + 30}
                </td>
                <td className="py-2 text-red-700 font-bold">
                  {tokenData.amount1 + 55000}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FundTable;
