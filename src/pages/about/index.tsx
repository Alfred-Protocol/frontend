import EstimatedFees from '@/components/Chart/EstimatedFees';
import LiquidityPositionChart from '@/components/Chart/LiquidityPositionChart';
import Setting from '@/components/Chart/setting/Setting';
import Layout from '@/components/Layout/Layout';
import SelectPairModal from '@/components/select-pair/SelectPairModal';
import { useAppContext } from '@/context/app/appContext';
import ContextProvider from '@/context/ContextProvider';
import { useEffect, useState } from 'react';
import { fadeIn, bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

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
import CreatePosition from '../../components/FundDetails/CreatePosition';
import CustomButton from '@/components/Common/CustomButton';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { state } = useAppContext();
  const [showPairModal, setShowPairModal] = useState(true);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return;
  }

  return (
    <StyleRoot>
      <Layout>
        <div className="flex w-full justify-center">
          <div className="mt-10 flex w-4/5 flex-col space-y-10">
            {showPairModal ? (
              <div style={styles.fadeIn}>
                <SelectPairModal submitEnded={() => setShowPairModal(false)} />
              </div>
            ) : (
              <div className="flex justify-center">
                <CustomButton
                  title="Change Settings"
                  theme="solidPurple"
                  className="w-1/5"
                  onClick={() => setShowPairModal(true)}
                  style={styles.bounce}
                />
              </div>
            )}
            {!showPairModal && (
              <div className="flex space-x-5">
                <EstimatedFees />
                <Setting />
              </div>
            )}
            {!showPairModal && <LiquidityPositionChart />}
          </div>
        </div>
        {/* <CreatePosition /> */}
      </Layout>
    </StyleRoot>
  );
};
export default AboutPage;
