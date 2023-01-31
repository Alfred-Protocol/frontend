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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: 'Fund Manager',
        }}
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
