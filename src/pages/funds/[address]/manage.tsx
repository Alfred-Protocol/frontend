import AddPositionModal from '@/components/AddPositionModal';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { isAddress } from 'ethers/lib/utils.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
          }) => {}}
        />
      )}
      <div>
        <div className="flex justify-center space-x-4 items-center pb-6">
          <h1 className="text-white text-xl">Uniswap V3 Position </h1>
          <NormalButton
            title="+ Add Position"
            onClick={addPosition}
            className={
              'bg-purple-700 text-purple-100 hover:bg-purple-600'
              // : 'bg-purple-600 hover:bg-purple-700'
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default FundManagePage;
