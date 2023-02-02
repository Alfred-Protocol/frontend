import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { Fund } from './AssetsSection';

interface Props {
  fundName: String;
  tvl: number;
  manager: String;
  assets: { assetName: String; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
}

const AssetCard = ({
  fundName,
  tvl,
  manager,
  assets,
  depositEnable,
  withdrawEnable,
}: Props) => {
  return (
    <div className="bg-white w-200 py-4 px-4 rounded shadow text-left ml-10 mr-10 mb-10 w-1/4">
      <h3 className="font-bold text-purple-900 text-xl">{fundName}</h3>
      <p>
        <span className="font-semibold">TVL: </span>
        <span>{tvl} USDC</span>
      </p>
      <p>
        <span className="font-semibold">Manager: </span>
        <span>
          {manager}
          <ArrowTopRightOnSquareIcon
            height={20}
            width={20}
            className="inline pb-1 ml-2 cursor-pointer stroke-2 hover:stroke-purple-500 transition-all"
            onClick={() => {}}
          />
        </span>
      </p>
      <p>
        <span className="font-semibold">Your Asset: </span>
      </p>
      {assets.map((asset) => {
        return (
          <p>
            <span className="font-semibold">{asset.assetName}: </span>
            <span>{asset.assetValue}</span>
          </p>
        );
      })}

      <div className="mt-2">
        {depositEnable && (
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3">
            Deposit
          </button>
        )}
        {withdrawEnable && (
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
  å;
};
export default AssetCard;
