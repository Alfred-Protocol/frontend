import FundsSection from '@/components/Funds/FundsSection';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

export default function ManagerPageAsset() {
  const router = useRouter();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const { data: signer } = useSigner();

  // useEffect(() => {
  //   if (signer) {
  //     setWalletConnected(true);
  //   } else {
  //     setWalletConnected(false);
  //     router.push('/manager');
  //   }
  // }, [signer]);

  return (
    <>
      <Head>
        <title>Manager Page Asset</title>
        <meta name="description" content="Fund Asset Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Layout>
          <FundsSection />
        </Layout>
        <Footer />
      </main>
    </>
  );
}
