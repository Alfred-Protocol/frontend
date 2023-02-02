// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { ethers } from 'ethers';
import Card from './Card';
import PageTitle from './Layout/PageTitle';
import DepositModal from './DepositModal';

export type Fund = {
  fundName: String;
  tvl: number;
  manager: String;
  assets: { assetName: String; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
};

const mockData: Fund[] = [
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
  const [showModal, setShowModal] = useState(true);
  const [modalFund, setModalFund] = useState<Fund | undefined>(undefined);

  const onClickDeposit = (fund: Fund) => {
    setModalFund(fund);
    fetchCollection();
    setShowModal(true);
  };

  const onClickWithdraw = (fund: Fund) => {};

  const fetchCollection = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://hardworking-late-firefly.quiknode.pro/65fc8167ff913b5f6e127f71b9f6deeddd651f71/'
    );
    let resp = await provider.send('qn_getTokenMetadataByContractAddress', {
      contract: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    });

    console.log('resp ', resp);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalFund(undefined);
  };

  const handleDeposit = (number: string) => {
    setShowModal(false);
  };

  return (
    <>
      <PageTitle title="Assets" />
      {showModal && (
        <DepositModal
          fund={modalFund}
          closeModal={closeModal}
          handleDeposit={handleDeposit}
        />
      )}
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
