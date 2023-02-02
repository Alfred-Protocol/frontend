import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import HeroSection from '@/components/Homepage/HeroSection';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';
import Layout from '@/components/Layout/Layout';

export default function HomePage() {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const { data: signer } = useSigner();

  useEffect(() => {
    if (signer) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [signer]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Fund Asset Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Layout>
          <HeroSection />
        </Layout>
        <Footer />
      </main>
    </>
  );
}
