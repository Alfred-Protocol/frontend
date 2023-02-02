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
    <div className="bg-white py-4 px-4 rounded shadow text-left ml-10 mr-10 mb-10">
      <h3 className="font-bold text-purple-900 text-xl">{fundName}</h3>
      <p>
        <span className="font-semibold">TVL: </span>
        <span>{tvl} USDC</span>
      </p>
      <p className="flex">
        <span className="font-semibold mr-2">Manager: </span>
        <span>
          {manager}
          <ArrowTopRightOnSquareIcon
            height={20}
            width={20}
            className="inline pb-1 ml-2 cursor-pointer stroke-2 hover:stroke-purple-500 transition-all"
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
            className="bg-transparent hover:bg-green-400 bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-3"
            onClick={onClickDeposit}
          >
            Deposit
          </button>
        )}
        {withdrawEnable && (
          <button
            className="bg-transparent hover:bg-red-300 bg-red-500 text-white font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded"
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
