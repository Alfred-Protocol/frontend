import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HedgeFundAssets from '@/components/HedgeFundAssets';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

export default function ManagerPageAsset() {
  const router = useRouter();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const { data: signer } = useSigner();

  useEffect(() => {
    if (signer) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
      router.push('/manager');
    }
  }, [signer]);

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
        <HedgeFundAssets />
        <Footer />
      </main>
    </>
  );
}
