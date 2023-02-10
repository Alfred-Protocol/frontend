import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { useEffect, useState } from 'react';

const mockData = [
  {
    manager: '0x7730B4Cdc1B1E7a33A309AB7205411faD009C106',
    lifetimeApr: 20.1,
    averageYield: 5.3,
  },
  {
    manager: '0x7730B4Cdc1B1E7a33A309AB7205411faD009C107',
    lifetimeApr: 25.1,
    averageYield: 5.3,
  },
  {
    manager: '0x7730B4Cdc1B1E7a33A309AB7205411faD009C108',
    lifetimeApr: 28.1,
    averageYield: 5.3,
  },
];

const LeaderboardPage = () => {
  const [data, setData] = useState(mockData);
  useEffect(() => {
    // mockAnimation();
  }, []);

  // const mockAnimation = () => {
  //   setTimeout(() => {
  //     const temp = [...data];
  //     temp[2].lifetimeApr += 3;
  //     setData(temp);
  //   }, 500);
  //   setTimeout(() => {
  //     const temp = [...data];
  //     temp[1].averageYield += 3;
  //     setData(temp);
  //   }, 400);
  //   setTimeout(() => {
  //     const temp = [...data];
  //     temp[0].averageYield += 3;
  //     setData(temp);
  //   }, 700);
  // };

  return (
    <Layout>
      <PageTitle title="Leaderboard" />
      <div className="mx-auto mt-20 max-w-6xl rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-fuchsia-100">
        <table className="text-md w-full table-fixed border-separate -translate-x-3 overflow-x-auto [border-spacing:0.75rem]">
          <thead>
            <tr className="text-grayDark">
              <th className="py-2" colSpan={8}>
                MANAGER
              </th>
              <th className="py-2" colSpan={2}>
                LIFETIME APR (%)
              </th>
              <th className="py-2" colSpan={2}>
                AVERAGE YIELD (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((cell, index) => (
              <tr key={index}>
                <td className="py-2" colSpan={8}>
                  <a
                    target={'_blank'}
                    href={`https://polygonscan.com/address/${cell.manager}`}
                    rel="noreferrer"
                    className="break-all text-blue-600 transition-colors hover:text-blue-800"
                  >
                    {cell.manager}
                  </a>
                </td>
                <td className="py-2" colSpan={2}>
                  {cell.lifetimeApr}
                </td>
                <td className="py-2" colSpan={2}>
                  {cell.averageYield}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
