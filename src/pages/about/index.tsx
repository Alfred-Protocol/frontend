import EstimatedFees from '@/components/Chart/EstimatedFees';
import LiquidityPositionChart from '@/components/Chart/LiquidityPositionChart';
import Setting from '@/components/Chart/setting/Setting';
import Layout from '@/components/Layout/Layout';
import SelectPairModal from '@/components/select-pair/SelectPairModal';
import { useAppContext } from '@/context/app/appContext';
import ContextProvider from '@/context/ContextProvider';

const AboutPage = () => {
  const { state } = useAppContext();

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="mt-10 flex w-4/5 flex-col space-y-10">
          <SelectPairModal />
          <LiquidityPositionChart />
          <EstimatedFees />
          <Setting />
        </div>
      </div>
    </Layout>
  );
};
export default AboutPage;
