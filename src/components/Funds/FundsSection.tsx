import { useState } from 'react';
import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';
import Fund from './Fund';

enum ViewState {
  ALL,
  MANAGED_BY_USER,
}

const FundsSection = () => {
  const [viewState, setViewState] = useState(ViewState.ALL);

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
        <Fund
          fundAddress="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
          manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
          tokenA="DAI"
          tokenB="USDC"
          totalLiquidity={10}
        />
      </div>
      <div className="flex space-x-2 py-4">
        <Fund
          fundAddress="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
          manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
          tokenA="DAI"
          tokenB="USDC"
          totalLiquidity={10}
        />
      </div>
    </>
  );
};

export default FundsSection;
