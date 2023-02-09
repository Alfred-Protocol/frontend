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
  const [isLoading, setIsLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return;
  }

  return (
    <Radium.StyleRoot>
      <Layout>
        <div className="flex w-full justify-center">
          <div className="mt-10 flex w-4/5 flex-col space-y-10"></div>
        </div>
      </Layout>
    </Radium.StyleRoot>
  );
};
export default AboutPage;
