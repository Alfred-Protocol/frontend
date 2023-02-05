import FundsFactory from '@/abi/FundsFactory';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Address, useContractRead } from 'wagmi';
import { ArrowDown, ArrowUp } from '../Common/Common';
import CustomButton from '../Common/CustomButton';
import FancyButton from '../Layout/FancyButton';
import NormalButton from '../Layout/NormalButton';
import Fund from './Fund';

enum ViewState {
  ALL,
  MANAGED_BY_USER,
}

const mockData = [
  {
    manager: '0x329231049012430902423',
    description: `An ETF LP token of USDC and ETH on Uniswap V3 represents a liquidity pool that holds both USDC (a stablecoin pegged to the US dollar) and ETH (Ethereum). \n 
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool. .
      `,
    tvl: 5.01,
    curValue: 6.12,
    startDate: '05/02/2023',
    matureDate: '12/02/2023',
    positions: [
      {
        token0: 'WETH',
        token1: 'USDC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
        fee: 0.01,
        min: 1295.2,
        max: 1833,
        amount0: 1,
        amount1: 1773,
      },
      {
        token0: 'WETH',
        token1: 'USDC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bcd',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
        fee: 0.01,
        min: 1295.2,
        max: 1833,
        amount0: 1,
        amount1: 1773,
      },
    ],
  },
  {
    manager: '0x329231049012430902424',
    description: `An ETF LP token of DAI and WBTC on Uniswap V3 represents a liquidity pool that holds both DAI (a stablecoin pegged to the US dollar) and WBTC (Wrapped Bitcoin). \n 
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool. 
  
      `,
    tvl: 4.23,
    curValue: 5.45,
    startDate: '01/01/2023',
    matureDate: '05/07/2023',
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
  {
    manager: '0x329231049012430902424',
    description: `An ETF LP token of DAI and WBTC on Uniswap V3 represents a liquidity pool that holds both DAI (a stablecoin pegged to the US dollar) and WBTC (Wrapped Bitcoin). \n 
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool. 
     
      `,
    tvl: 4.23,
    curValue: 5.45,
    startDate: '01/01/2023',
    matureDate: '05/07/2023',
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
  {
    manager: '0x329231049012430902424',
    description: `An ETF LP token of DAI and WBTC on Uniswap V3 represents a liquidity pool that holds both DAI (a stablecoin pegged to the US dollar) and WBTC (Wrapped Bitcoin). \n 
      By holding this LP token, an investor has a stake in the liquidity pool and is entitled to a portion of the fees generated from trading activity in the pool. 
      The value of the ETF LP token is determined by the value of the underlying assets (DAI and WBTC) in the pool, which can fluctuate. This type of ETF provides investors with exposure to both the stability of the US dollar and the potential of Bitcoin.
      `,
    tvl: 4.23,
    curValue: 5.45,
    startDate: '01/01/2023',
    matureDate: '05/07/2023',
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
];

const FundsSection = () => {
  const [sortByNewestFund, setSortByNewestFund] = useState(false);
  const { data, isLoading } = useContractRead({
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: FundsFactory,
    functionName: 'getAllFunds',
  });

  const [viewState, setViewState] = useState(ViewState.ALL);

  return (
    <>
      <div className="mt-16 mb-10 flex justify-between">
        <div className="flex-5 flex space-x-12">
          <CustomButton title="Refresh" type="solidBlue" onClick={() => {}} />
          <CustomButton
            title="Choose Start Date"
            type="transparentPurple"
            onClick={() => {}}
            frontIcon={<CalendarIcon />}
          />
          <CustomButton
            title="Choose Mature Date"
            type="transparentPurple"
            onClick={() => {}}
            frontIcon={<CalendarIcon />}
          />
        </div>
        <div className="flex-3">
          <CustomButton
            title={sortByNewestFund ? 'Newest Fund' : 'Oldest Fund'}
            type="transparentPurple"
            onClick={() => {
              setSortByNewestFund(!sortByNewestFund);
            }}
            backIcon={sortByNewestFund ? <ArrowDown /> : <ArrowUp />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-7 pb-12 xl:grid-cols-2 2xl:grid-cols-3">
        {/* {!isLoading &&
          data &&
          data
            // TODO: update once owner has been tied to fund
            // .filter(
            //   (fund) =>
            //     viewState === ViewState.ALL ||
            //     (status === 'connected' &&
            //       fund.toLowerCase() === address.toLowerCase())
            // )
            .map((fund) => (
              <Fund
                key={fund}
                fundAddress={fund}
                manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
                tokenA="ETH"
                tokenB="USDC"
              />
            ))} */}
        {mockData.map((fund, idx) => {
          return (
            <Fund
              key={idx}
              manager={fund.manager}
              description={fund.description}
              startDate={fund.startDate}
              matureDate={fund.matureDate}
              tvl={fund.tvl}
            />
          );
        })}
      </div>
    </>
  );
};

export default FundsSection;
