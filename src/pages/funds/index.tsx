import FundsSection from '@/components/Funds/FundsSection';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { useEffect, useState } from 'react';

export default function FundsPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return;
  }

  return (
    <Layout>
      <PageTitle title="Funds" />
      <FundsSection />
    </Layout>
  );
}
