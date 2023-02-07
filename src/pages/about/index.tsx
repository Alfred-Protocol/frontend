import EstimatedFees from '@/components/Chart/EstimatedFees';
import LiquidityPositionChart from '@/components/Chart/LiquidityPositionChart';
import Setting from '@/components/Chart/setting/Setting';
import Layout from '@/components/Layout/Layout';
import SelectPairModal from '@/components/select-pair/SelectPairModal';
import { useAppContext } from '@/context/app/appContext';
import ContextProvider from '@/context/ContextProvider';
import { useEffect, useState } from 'react';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
};

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
            {showPairModal && (
              <div style={styles.bounce}>
                <SelectPairModal submitEnded={() => setShowPairModal(false)} />
              </div>
            )}
            <div className="flex space-x-5">
              <EstimatedFees />
              <Setting />
            </div>
            <LiquidityPositionChart />
          </div>
        </div>
      </Layout>
    </StyleRoot>
  );
};
export default AboutPage;
