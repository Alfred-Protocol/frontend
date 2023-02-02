// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import { useState } from 'react';
import Card from './Card';
import PageTitle from './Layout/PageTitle';

export type Fund = {
  fundName: String;
  tvl: number;
  manager: String;
  assets: { assetName: String; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
};

const mockData: [Fund] = [
  {
    fundName: 'Fund A',
    tvl: 234,
    manager: 'ox23CjdS932923SAJ',
    assets: [
      { assetName: 'ETH', assetValue: 1212 },
      { assetName: 'USDC', assetValue: 1212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
  },
  {
    fundName: 'Fund B',
    tvl: 234,
    manager: 'ox23CjdS932923SAJ',
    assets: [
      { assetName: 'ETH', assetValue: 1212 },
      { assetName: 'USDC', assetValue: 1212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
  },
  {
    fundName: 'Fund C',
    tvl: 234,
    manager: 'ox23CjdS932923SAJ',
    assets: [
      { assetName: 'ETH', assetValue: 1212 },
      { assetName: 'USDC', assetValue: 1212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
  },
  {
    fundName: 'Fund D',
    tvl: 234,
    manager: 'ox23CjdS932923SAJ',
    assets: [
      { assetName: 'ETH', assetValue: 1212 },
      { assetName: 'USDC', assetValue: 1212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
  },
];

const AssetsSection = () => {
  const [assets, setAssets] = useState([]);

  const onClickDeposit = (fund: Fund) => {};

  const onClickWithdraw = (fund: Fund) => {};

  const fetchData = () => {};

  return (
    <>
      <PageTitle title="Assets" />
      <div className="flex flex-row flex-wrap">
        {mockData.map((fund) => {
          return (
            <Card
              onClickDeposit={() => onClickDeposit(fund)}
              onClickWithdraw={() => onClickWithdraw(fund)}
              {...fund}
            />
          );
        })}
      </div>
    </>
  );
};
export default AssetsSection;
