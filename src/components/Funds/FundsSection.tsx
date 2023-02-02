import FundsFactory from '@/abi/FundsFactory';
import { MUMBAI_FUNDS_FACTORY_ADDRESS } from '@/contracts/fundsFactory';
import { useEffect, useState } from 'react';
import { Address, useContract, useProvider } from 'wagmi';
import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';
import Fund from './Fund';

enum ViewState {
  ALL,
  MANAGED_BY_USER,
}

const FundsSection = () => {
  const provider = useProvider();
  const contract = useContract({
    address: MUMBAI_FUNDS_FACTORY_ADDRESS,
    abi: FundsFactory,
    signerOrProvider: provider,
  });

  const [viewState, setViewState] = useState(ViewState.ALL);
  const [funds, setFunds] = useState<readonly Address[]>([]);

  useEffect(() => {
    if (contract) {
      contract.getAllFunds().then((res) => setFunds(res));
    }
  }, [contract]);

  return (
    <>
      <PageTitle title="Funds" />
      <div className="flex justify-end space-x-4 items-center pb-6">
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
      <div className="pb-12">
        {funds
          // TODO: update once owner has been tied to fund
          // .filter(
          //   (fund) =>
          //     viewState === ViewState.ALL ||
          //     (status === 'connected' &&
          //       fund.toLowerCase() === address.toLowerCase())
          // )
          .map((fund) => (
            <div className="flex space-x-2" key={fund}>
              <Fund
                fundAddress={fund}
                manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
                tokenA="DAI"
                tokenB="USDC"
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default FundsSection;
