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
    manager: '0x7730B4Cdc1B1E7a33A309AB7205411faD009C106',
    lifetimeApr: 25.1,
    averageYield: 5.3,
  },
  {
    manager: '0x7730B4Cdc1B1E7a33A309AB7205411faD009C106',
    lifetimeApr: 28.1,
    averageYield: 5.3,
  },
];

const Cell = () => {};

const LeaderboardPage = () => {
  const [data, setData] = useState(mockData);
  useEffect(() => {
    mockAnimation();
  }, []);

  const mockAnimation = () => {
    setTimeout(() => {
      const temp = [...data];
      temp[2].lifetimeApr += 3;
      setData(temp);
    }, 500);
    setTimeout(() => {
      const temp = [...data];
      temp[1].averageYield += 3;
      setData(temp);
    }, 400);
    setTimeout(() => {
      const temp = [...data];
      temp[0].averageYield += 3;
      setData(temp);
    }, 700);
  };

  return (
    <Layout>
      <PageTitle title="Leaderboard" />
      <div className="mt-20 bg-slate-100 px-6 py-4 rounded-lg shadow">
        <table className="table-auto w-full">
          <thead className="border-b-2 border-purple-800">
            <tr>
              <th className="py-2">Manager</th>
              <th className="py-2">Lifetime APR (%)</th>
              <th className="py-2">Average yield (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cell, index) => {
              return (
                <tr key={index}>
                  <td className="py-2 text-blue-700 hover:text-blue-900">
                    <a
                      target={'_blank'}
                      href={`https://polygonscan.com/address/0x7730b4cdc1b1e7a33a309ab7205411fad009c106`}
                      rel="noreferrer"
                    >
                      {cell.manager}
                    </a>
                  </td>
                  <td className="py-2">{cell.lifetimeApr}</td>
                  <td className="py-2">{cell.averageYield}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
