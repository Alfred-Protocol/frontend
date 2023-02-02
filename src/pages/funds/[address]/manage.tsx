import AddPositionModal from '@/components/AddPositionModal';
import FundTable from '@/components/FundDetails/FundTable';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import NormalButton from 'src/components/Layout/NormalButton';

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
          }}
        />
      )}
      <div>
        <div className="flex justify-center space-x-4 items-center pb-6">
          <NormalButton
            title="Add Uniswap V3 Position"
            onClick={addPosition}
            className={
              'bg-purple-600 hover:bg-purple-700 text-purple-100 '
              // : 'bg-purple-600 hover:bg-purple-700'
            }
          />
        </div>
      </div>
      <FundTable />
    </Layout>
  );
};

export default FundManagePage;
