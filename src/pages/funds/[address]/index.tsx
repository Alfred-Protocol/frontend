import FundDetails from '@/components/FundDetails/FundDetails';
import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { isAddress } from 'ethers/lib/utils.js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const FundDetailsPage = () => {
  const { query, push } = useRouter();
  const { address } = query;

  useEffect(() => {
    if (address !== undefined && !isAddress(address.toString())) {
      toast.error('Invalid address! Redirecting back to funds page...');
      setTimeout(() => {
        push('/funds');
      }, 5000);
    }
  }, [address, push]);

  if (!address || !isAddress(address.toString())) {
    return (
      <Layout>
        <PageTitle title="Invalid Address!" />
      </Layout>
    );
  }

  return (
    <Layout>
      <FundDetails fundAddress={address.toString()} />
    </Layout>
  );
};

export default FundDetailsPage;
