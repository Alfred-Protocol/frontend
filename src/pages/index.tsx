import HeroSection from '@/components/Homepage/HeroSection';
import Layout from '@/components/Layout/Layout';
import useFunds from '@/hooks/useFunds';

export default function HomePage() {
  const { data } = useFunds();
  console.log(data);
  return (
    <Layout className="flex items-center">
      <HeroSection />
    </Layout>
  );
}
