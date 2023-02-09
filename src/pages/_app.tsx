import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  connectorsForWallets,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import type { AppProps } from 'next/app';
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

import ContextProvider from '@/context/ContextProvider';
import { useEffect } from 'react';

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai, goerli, polygon, mainnet, optimism, arbitrum],
  [
    alchemyProvider({
      apiKey: process.env.ALCHEMY_MUMBAI_API_KEY!,
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
  useEffect(() => {
    if (document) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: 'Alfred Protocol',
        }}
        theme={lightTheme({
          overlayBlur: 'large',
        })}
        chains={chains}
      >
        <ContextProvider>
          <Component {...pageProps} />
          <ToastContainer
            pauseOnFocusLoss
            pauseOnHover
            closeOnClick={false}
            position="bottom-center"
            theme="dark"
            hideProgressBar
          />
        </ContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
