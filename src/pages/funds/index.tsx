import FundsSection from '@/components/Funds/FundsSection';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import Spinner from '@/components/Layout/Spinner';
import { useEffect, useState } from 'react';

export default function FundsPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout className="mx-20">
      {/* <PageTitle title="Funds" /> */}
      <FundsSection />
    </Layout>
  );
}
