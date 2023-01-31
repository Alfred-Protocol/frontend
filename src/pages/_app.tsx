import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
} from 'wagmi/chains';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    mainnet,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [polygonMumbai, goerli]
      : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'Fund Manager',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: 'Fund Manager',
        }}
        chains={chains}
      >
        <Component {...pageProps} />
        <Particles
          id="tsparticles"
          url={require('../assets/particles.json')}
          init={particlesInit}
          loaded={particlesLoaded}
        />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
