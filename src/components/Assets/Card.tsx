import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { Fund } from './AssetsSection';

interface Props {
  fundName: string;
  tvl: number;
  manager: string;
  assets: { assetName: string; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
  onClickDeposit: () => void;
  onClickWithdraw: () => void;
}

const AssetCard = ({
  fundName,
  tvl,
  manager,
  assets,
  depositEnable,
  withdrawEnable,
  onClickDeposit,
  onClickWithdraw,
}: Props) => {
  const router = useRouter();
  return (
    <div className="rounded-lg bg-white py-4 px-4 text-left">
      <h3 className="text-xl font-bold text-purple-900">{fundName}</h3>
      <p>
        <span className="font-semibold">TVL: </span>
        <span>
          {assets[0].assetValue * assets[1].assetValue + assets[1].assetValue}{' '}
          {assets[1].assetName}
        </span>
      </p>
      <p className="flex">
        <span className="mr-2 font-semibold">Manager: </span>
        <span>
          {manager}
          <ArrowTopRightOnSquareIcon
            height={20}
            width={20}
            className="ml-2 inline cursor-pointer stroke-2 pb-1 transition-all hover:stroke-purple-500"
            onClick={() =>
              router.push(
                'https://polygonscan.com/address/0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3'
              )
            }
          />
        </span>
      </p>
      <p>
        <span className="font-semibold">Your Assets: </span>
      </p>
      {assets.map((asset) => {
        return (
          <p key={asset.assetName}>
            <span className="font-semibold">{asset.assetName}: </span>
            <span>{asset.assetValue}</span>
          </p>
        );
      })}

      <div className="mt-2">
        {depositEnable && (
          <button
            className="mr-3 rounded border border-green-500 bg-transparent bg-green-500 py-2 px-4 font-semibold text-white hover:border-transparent hover:bg-green-400 hover:text-white"
            onClick={onClickDeposit}
          >
            Deposit
          </button>
        )}
        {withdrawEnable && (
          <button
            className="rounded border border-red-400 bg-transparent bg-red-500 py-2 px-4 font-semibold text-white hover:border-transparent hover:bg-red-300 hover:text-white"
            onClick={onClickWithdraw}
          >
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
