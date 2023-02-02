import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';
import Fund from './Fund';

const FundsSection = () => {
  return (
    <>
      <PageTitle title="Funds" />
      <div className="flex justify-end space-x-4 items-center pb-6">
        <p className="text-white text-lg">View: </p>
        <NormalButton title="All" />
        <NormalButton title="Managed" />
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
