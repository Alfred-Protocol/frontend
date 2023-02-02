import AssetsSection from '@/components/AssetsSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

export default function HomePage() {
  const router = useRouter();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const { data: signer } = useSigner();

  useEffect(() => {
    if (signer) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
      router.push('/');
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
        <AssetsSection />
        <Footer />
      </main>
    </>
  );
}
