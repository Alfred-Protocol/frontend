import LiquidityPositionChart from '@/components/Chart/LiquidityPositionChart';
import Layout from '@/components/Layout/Layout';
import SelectPairModal from '@/components/select-pair/SelectPairModal';
import { useAppContext } from '@/context/app/appContext';
import ContextProvider from '@/context/ContextProvider';

const AboutPage = () => {
  const { state } = useAppContext();

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="flex w-3/5 items-center justify-center">
          <div className="flex-1">
            <SelectPairModal />
          </div>
          <div className="flex-1">
            <LiquidityPositionChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default AboutPage;
