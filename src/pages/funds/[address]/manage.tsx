import AddPositionModal from '@/components/AddPositionModal';
import FundTable from '@/components/FundDetails/FundTable';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import NormalButton from 'src/components/Layout/NormalButton';

export interface tokenData {
  created: string;
  address: string;
  token1: string;
  token2: string;
  amount1: number;
  amount2: number;
  value1: number;
  value2: number;
}

const data: tokenData[] = [
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
// do not need to check bcs only can redirect to this page from Funds/xxx page, ignore hardcoding of url first
const FundManagePage = () => {
  const { query, push } = useRouter();
  const { address } = query;

  const [showModal, setShowModal] = useState(false);

  const addPosition = () => {
    setShowModal(true);
  };

  return (
    <Layout>
      <PageTitle title="Manage Fund Positions" />
      {showModal && (
        <AddPositionModal
          closeModal={() => setShowModal(false)}
          fund={undefined}
          addPosition={({
            token1,
            token2,
            amount1,
            amount2,
            minPrice,
            maxPrice,
          }) => {
            toast.success('Added New Position for Uniswap LP Token V3');
            data.push({
              created: '03/02/2023',
              address: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
              token1: token1,
              token2: token2,
              amount1: amount1,
              amount2: amount2,
              value1: amount1 + 40,
              value2: amount2 + 60,
            });
          }}
        />
      )}
      <div>
        <div className="flex justify-center space-x-4 items-center pb-6">
          <NormalButton
            onClick={addPosition}
            className={
              'bg-purple-600 hover:bg-purple-700 text-purple-100 '
              // : 'bg-purple-600 hover:bg-purple-700'
            }
          >
            Add Uniswap V3 Position
          </NormalButton>
        </div>
        <FundTable data={data} />
      </div>
    </Layout>
  );
};

export default FundManagePage;
