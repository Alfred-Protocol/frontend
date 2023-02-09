import HeroSection from '@/components/Homepage/HeroSection';
import Layout from '@/components/Layout/Layout';
import useDatabaseFunds from '@/hooks/useDatabaseFunds';

export default function HomePage() {
  const { data } = useDatabaseFunds();
  console.log(data);
  return (
    <Layout className="flex items-center">
      <HeroSection />
    </Layout>
  );
}
