import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import FancyButton from '../Layout/FancyButton';
import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';

interface FundDetailsProps {
  fundAddress: string;
  tokenA: string;
  tokenB: string;
  tokenAAmount: string;
  tokenBAmount: string;
  manager: string;
}

const FundDetails = ({
  fundAddress,
  tokenA,
  tokenAAmount,
  tokenB,
  tokenBAmount,
  manager,
}: FundDetailsProps) => {
  const { address, status } = useAccount();
  const router = useRouter();

  const deposit = () => {
    router.push(router.asPath + '/manage');
  };

  return (
    <>
      <PageTitle title="Fund Details" />
      <div className="bg-slate-100 text-left px-6 py-6 rounded-lg shadow max-w-4xl mx-auto">
        <div className="pb-4">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-purple-800 pb-1">
              Fund Address:
            </h2>
            {status === 'connected' && address === manager && (
              <FancyButton
                className="shadow-sm"
                isLink
                href={`/funds/${fundAddress}/manage`}
              >
                Manage
              </FancyButton>
            )}
          </div>
          <span className="text-xl">{fundAddress}</span>
        </div>
        <div className="pb-4">
          <h2 className="text-3xl font-bold text-purple-800 pb-1">Assets:</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <p className="text-xl">
                <span className="font-bold">{tokenA}: </span>
                {tokenAAmount}
              </p>
              <NormalButton
                className="md:px-4 md:py-2"
                onClick={() => deposit()}
              >
                Deposit
              </NormalButton>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xl">
                <span className="font-bold">{tokenB}: </span>
                {tokenBAmount}
              </p>
              <NormalButton
                className="md:px-4 md:py-2"
                onClick={() => deposit()}
              >
                Deposit
              </NormalButton>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="text-3xl font-bold text-purple-800 pb-1">Manager:</h2>
          <span className="text-xl">{manager}</span>
        </div>
      </div>
    </>
  );
};

export default FundDetails;
