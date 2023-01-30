import "@/styles/globals.css";
import { Web3Auth } from "@web3auth/modal";
import type { AppProps } from "next/app";

const web3auth = new Web3Auth({
  chainConfig: { chainNamespace: "eip155" },
  clientId: "",
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
