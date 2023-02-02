const FundTable = () => {
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
          <tr className="">
            <td className="py-2">{new Date().toLocaleDateString()}</td>
            <td className="py-2">0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3</td>
            <td className="py-2">ETH</td>
            <td className="py-2">USDC</td>
            <td className="py-2">100.01</td>
            <td className="py-2">20000.100</td>
            <td className="py-2 text-green-700 font-bold">120.001</td>
            <td className="py-2 text-red-700 font-bold">2000.1</td>
          </tr>
          <tr>
            <td className="py-2">{new Date().toLocaleDateString()}</td>
            <td className="py-2">0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3</td>
            <td className="py-2">ETH</td>
            <td className="py-2">USDC</td>
            <td className="py-2">100.01</td>
            <td className="py-2">20000.100</td>
            <td className="py-2 text-green-700 font-bold">120.001</td>
            <td className="py-2 text-red-700 font-bold">2000.1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FundTable;
