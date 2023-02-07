import type { Network, Pool, Tick, Token, PriceChart } from '@/types/type';
import React from 'react';
// import { PriceChart } from '../../common/interfaces/coingecko.interface';
// import {
//   Network,
//   Pool,
//   Tick,
//   Token,
// } from "../../common/interfaces/uniswap.interface";
// import { NETWORKS } from '../../common/network';
import { AppAction, appReducer } from './appReducer';
import { INITIAL_STATE } from './initialState';

export const NETWORKS: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    desc: 'Ethereum Mainnet',
    logoURI:
      'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png',
    subgraphEndpoint:
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    desc: 'Polygon Mainnet',
    logoURI:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgwyOAYn_Z1BalQYMfN8zVqwenavJVSO9SUZ1rz0ZerShW-5Ubzf6U96kLODC-ta2bVks&usqp=CAU',
    subgraphEndpoint:
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    desc: 'Optimism Mainnet (L2)',
    logoURI: 'https://optimistic.etherscan.io/images/brandassets/optimism.svg',
    subgraphEndpoint:
      'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis',
  },
  {
    id: 'celo',
    name: 'Celo',
    desc: 'Celo Mainnet',
    disabled: false,
    logoURI: 'celo.svg',
    isNew: false,
    subgraphEndpoint:
      'https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    desc: 'Arbitrum Mainnet (L2)',
    disabled: false,
    isNew: true,
    logoURI:
      'https://assets.website-files.com/5f973c970bea5548ad4287ef/60a320b472858ace6700df76_arb-icon.svg',
    subgraphEndpoint:
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',
  },
];

export interface AppContextState {
  network: Network;
  tokenList: Token[];
  isPairToggled: boolean;
  isFullRange: boolean;

  pool: Pool | null;
  poolTicks: Tick[] | null;
  token0: Token | null;
  token1: Token | null;
  token0PriceChart: PriceChart | null;
  token1PriceChart: PriceChart | null;
  volume24H: number;

  depositAmountValue: number;
  priceRangeValue: number[];
  priceAssumptionValue: number;

  currentPrice: null | number[];
  futurePrice: null | number[];
  daysInPosition: number;
}
// const initialState: AppContextState = {
//   network: NETWORKS[0],
//   tokenList: [],
//   isPairToggled: false,
//   isFullRange: false,

//   pool: null,
//   poolTicks: null,
//   token0: null,
//   token1: null,
//   token0PriceChart: null,
//   token1PriceChart: null,
//   volume24H: 0,

//   depositAmountValue: 1000,
//   priceRangeValue: [0, 0],
//   priceAssumptionValue: 0,

//   // Impermanent Loss Calculator
//   currentPrice: null,
//   futurePrice: null,
//   daysInPosition: 0,
// };

const initialState: AppContextState = INITIAL_STATE;

interface AppContextProviderProps {
  children: React.ReactNode;
}
const AppContext = React.createContext<
  { state: AppContextState; dispatch: (action: AppAction) => void } | undefined
>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationContext must be used within a ApplicationContextProvider'
    );
  }
  return context;
};
