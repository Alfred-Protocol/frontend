import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';

const LeaderboardPage = () => {
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
            <tr>
              <td className="py-2 text-blue-700 hover:text-blue-900">
                <a
                  target={'_blank'}
                  href={`https://polygonscan.com/address/0x7730b4cdc1b1e7a33a309ab7205411fad009c106`}
                  rel="noreferrer"
                >
                  0x7730B4Cdc1B1E7a33A309AB7205411faD009C106
                </a>
              </td>
              <td className="py-2">20.1</td>
              <td className="py-2">7.3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
