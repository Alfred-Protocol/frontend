import EstimatedFees from '@/components/Chart/EstimatedFees';
import LiquidityPositionChart from '@/components/Chart/LiquidityPositionChart';
import Setting from '@/components/Chart/setting/Setting';
import Layout from '@/components/Layout/Layout';
import SelectPairModal from '@/components/select-pair/SelectPairModal';
import { useAppContext } from '@/context/app/appContext';
import ContextProvider from '@/context/ContextProvider';
import { useEffect, useState } from 'react';
import { fadeIn, bounce } from 'react-animations';
import Radium from 'radium';
import { Label, Modal, Textarea, TextInput } from 'flowbite-react';

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce'),
  },
};
// import CreatePosition from '../../components/FundDetails/CreatePosition';
import CustomButton from '@/components/Common/CustomButton';
import CreatePosition from '@/components/FundDetails/CreatePosition';
import { useRouter } from 'next/router';

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
    <Radium.StyleRoot>
      <Layout>
        <div className="flex justify-center">
          <div
            className="mt-10 flex flex-col space-y-10"
            style={{ width: '90%' }}
          >
            {showPairModal ? (
              <div style={styles.fadeIn as any}>
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
                  style={styles.bounce as any}
                />
                <CustomButton
                  title="+ Create LP Position"
                  theme="solidPurple"
                  className="w-1/5"
                  onClick={() => {
                    setShowCreateLPModal(true);
                  }}
                  style={styles.bounce as any}
                />
              </div>
            )}

            {showComponent && (
              <div className="flex flex-col space-y-10">
                <div className="flex w-full space-x-5">
                  <div className="w-2/5">
                    <EstimatedFees isLoading={isLoading} />
                  </div>
                  <div className="">
                    <Setting isLoading={isLoading} />
                  </div>
                </div>
                <LiquidityPositionChart isLoading={isLoading} />
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
    </Radium.StyleRoot>
  );
};
export default ManageFundPage;
