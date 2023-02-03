import FundsSection from '@/components/Funds/FundsSection';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';

export default function FundsPage() {
  return (
    <Layout>
      <PageTitle title="Funds" />
      <FundsSection />
    </Layout>
  );
}
