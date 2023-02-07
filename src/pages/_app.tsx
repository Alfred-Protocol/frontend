import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import type { AppProps } from 'next/app';
import { QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    mainnet,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [polygonMumbai, goerli]
      : []),
  ],
  [
    alchemyProvider({
      apiKey: 'SAWT5vv937fCafeAL4HLc4Qq_U2zjdzL',
    }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'Alfred Protocol',
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
          appName: 'Alfred Protocol',
        }}
        chains={chains}
      >
        <Component {...pageProps} />
        <ToastContainer
          pauseOnFocusLoss
          pauseOnHover
          closeOnClick={false}
          position="bottom-center"
        />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
