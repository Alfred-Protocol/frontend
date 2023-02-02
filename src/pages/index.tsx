import HeroSection from '@/components/Homepage/HeroSection';
import Layout from '@/components/Layout/Layout';
import { useContract, useProvider } from 'wagmi';
import FundsFactory from '../abi/FundsFactory';

export default function HomePage() {
  // const provider = useProvider();
  // const contract = useContract({
  //   address: '0xB445Eff7a9d62be8c44671E0238982fc4605C896',
  //   abi: FundsFactory,
  //   signerOrProvider: provider,
  // });
  return (
    <Layout className="flex items-center">
      <HeroSection />
    </Layout>
  );
}
