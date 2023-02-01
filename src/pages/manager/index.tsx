import AssetsSection from '@/components/AssetsSection';
import Footer from '@/components/Footer';
import HeaderHedgeFund from '@/components/HeaderHedgeFund';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

export default function ManagerPage() {
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
        <title>Manager Page </title>
        <meta name="description" content="Fund Asset Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderHedgeFund isWalletConnected={isWalletConnected} />
        <AssetsSection />
        <Footer />
      </main>
    </>
  );
}
