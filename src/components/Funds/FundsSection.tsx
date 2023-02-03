import FundsFactory from '@/abi/FundsFactory';
import { MUMBAI_FUNDS_FACTORY_ADDRESS } from '@/contracts/fundsFactory';
import Link from 'next/link';
import { useState } from 'react';
import { useContractRead } from 'wagmi';
import FancyButton from '../Layout/FancyButton';
import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';
import Fund from './Fund';

enum ViewState {
  ALL,
  MANAGED_BY_USER,
}

const FundsSection = () => {
  const { data, isLoading } = useContractRead({
    address: MUMBAI_FUNDS_FACTORY_ADDRESS,
    abi: FundsFactory,
    functionName: 'getAllFunds',
  });

  const [viewState, setViewState] = useState(ViewState.ALL);

  return (
    <>
      <div className="flex justify-between items-center pb-6">
        <FancyButton className="md:px-4">
          <Link href="/funds/create">Create Fund</Link>
        </FancyButton>
        <div className="flex items-center space-x-4">
          <p className="text-white text-lg">Filter Funds: </p>
          <NormalButton
            onClick={() => setViewState(ViewState.ALL)}
            active={viewState === ViewState.ALL}
          >
            All
          </NormalButton>
          <NormalButton
            onClick={() => setViewState(ViewState.MANAGED_BY_USER)}
            active={viewState === ViewState.MANAGED_BY_USER}
          >
            Managed by you
          </NormalButton>
        </div>
      </div>
      <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-3">
        {!isLoading &&
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
                tokenA="DAI"
                tokenB="USDC"
              />
            ))}
      </div>
    </>
  );
};

export default FundsSection;
