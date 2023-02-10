import CorrelationChart from '@/components/Chart/CorrelationChart';
import EstimatedFees from '@/components/Chart/EstimatedFees';
import LiquidityPositionChart from '@/components/Chart/LiquidityPositionChart';
import Setting from '@/components/Chart/setting/Setting';
import CustomButton from '@/components/Common/CustomButton';
import CreatePosition from '@/components/FundDetails/CreatePosition';
import Layout from '@/components/Layout/Layout';
import SelectPairModal from '@/components/select-pair/SelectPairModal';
import { useAppContext } from '@/context/app/appContext';
import { useRouter } from 'next/router';
import Radium from 'radium';
import { useEffect, useState } from 'react';
import { bounce, fadeIn } from 'react-animations';

const ManageFundPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { state } = useAppContext();
  const [showPairModal, setShowPairModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [showCreateLPModal, setShowCreateLPModal] = useState(false);
  const { query } = useRouter();

  const fundAddress = query.address as string;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return;
  }

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-2xl lg:max-w-5xl justify-center">
        <div className="mt-10 flex w-full flex-col space-y-10">
          {showPairModal ? (
            <div>
              <SelectPairModal
                submitStart={() => {
                  setIsLoading(true);
                  setShowComponent(true);
                }}
                submitEnded={() => {
                  setIsLoading(false);
                  setShowPairModal(false);
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <CustomButton
                title="Change Settings"
                theme="transparentPurple"
                className="w-1/5"
                onClick={() => {
                  setShowPairModal(true);
                  setShowComponent(false);
                }}
              />
              <CustomButton
                title="+ Create LP Position"
                theme="solidPurple"
                className="w-1/5"
                onClick={() => {
                  setShowCreateLPModal(true);
                }}
              />
            </div>
          )}

          {showComponent && (
            <div className="flex flex-col space-y-5">
              <div className="flex w-full space-x-5">
                <EstimatedFees isLoading={isLoading} />
                <Setting isLoading={isLoading} />
              </div>
              <div className="flex space-x-5">
                <CorrelationChart />
                <LiquidityPositionChart isLoading={isLoading} />
              </div>
            </div>
          )}

          <CreatePosition
            show={showCreateLPModal}
            onClose={() => setShowCreateLPModal(false)}
            fundAddress={fundAddress}
          />
        </div>
      </div>
    </Layout>
  );
};
export default ManageFundPage;
