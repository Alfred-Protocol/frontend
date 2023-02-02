import FundsFactory from '@/abi/FundsFactory';
import { MUMBAI_FUNDS_FACTORY_ADDRESS } from '@/contracts/fundsFactory';
import { provider } from '@/pages/_app';
import { useEffect, useState } from 'react';
import { Address, useContract, useProvider, useSigner } from 'wagmi';
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
          title="All"
          onClick={() => setViewState(ViewState.ALL)}
          className={
            viewState === ViewState.ALL
              ? 'bg-purple-700 text-purple-100 hover:bg-purple-600 underline'
              : 'bg-purple-600 hover:bg-purple-700'
          }
        />
        <NormalButton
          title="Managed by you"
          onClick={() => setViewState(ViewState.MANAGED_BY_USER)}
          className={
            viewState === ViewState.MANAGED_BY_USER
              ? 'bg-purple-700 text-purple-100 hover:bg-purple-600 underline'
              : 'bg-purple-600 hover:bg-purple-700'
          }
        />
      </div>
      <div className="flex space-x-2">
        {funds.map((fund) => (
          <Fund
            key={fund}
            fundAddress={fund}
            manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
            tokenA="DAI"
            tokenB="USDC"
          />
        ))}
      </div>
      {/* <div className="flex space-x-2 py-4">
        <Fund
          fundAddress="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
          manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
          tokenA="DAI"
          tokenB="USDC"
          totalLiquidity={10}
        />
      </div> */}
    </>
  );
};

export default FundsSection;
