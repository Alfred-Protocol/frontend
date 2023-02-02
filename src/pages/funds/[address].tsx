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
  const isValidAddress = address && isAddress(address.toString());

  useEffect(() => {
    if (!isValidAddress) {
      toast.error('Invalid address! Redirecting back to funds page...');
      setTimeout(() => {
        push('/funds');
      }, 5000);
    }
  }, [isValidAddress, push]);

  if (!isValidAddress) {
    return (
      <Layout>
        <PageTitle title="Invalid Address!" />
      </Layout>
    );
  }

  return (
    <Layout>
      <FundDetails
        address={address.toString()}
        tokenA={'ETH'}
        tokenB={'USDC'}
        tokenAAmount={'10.001'}
        tokenBAmount={'1000.0'}
        manager={'0x7730B4Cdc1B1E7a33A309AB7205411faD009C106'}
      />
    </Layout>
  );
};

export default FundDetailsPage;
