import Head from 'next/head';

const DefaultHead = () => {
  return (
    <Head>
      <title>Alfred Protocol</title>
      <meta
        name="description"
        content="Alfred Protocol - Earn with the best in the game."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default DefaultHead;
