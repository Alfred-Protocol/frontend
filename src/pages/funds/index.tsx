import ManageFundsSection from '@/components/ManageFunds/ManageFundsSection';
import Layout from '@/components/Layout/Layout';
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
    <Layout>
      {/* <PageTitle title="Funds" /> */}
      <ManageFundsSection />
    </Layout>
  );
}
