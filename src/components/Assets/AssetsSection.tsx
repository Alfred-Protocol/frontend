// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { ethers } from 'ethers';
import Card from './Card';
import PageTitle from '../Layout/PageTitle';
import DepositModal from './DepositModal';
import SuccessModal from './SuccessModal';
import WithdrawModal from './WithdrawModal';

export type Fund = {
  fundName: string;
  tvl: number;
  manager: string;
  assets: { assetName: string; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
};

const mockData: Fund[] = [
  {
    fundName: 'Fund A',
    tvl: 234,
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
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
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
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
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
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
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1212 },
      { assetName: 'USDC', assetValue: 1212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
  },
];

type modalType = 'success' | 'deposit' | 'withdraw';

const AssetsSection = () => {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [modalFund, setModalFund] = useState<Fund | undefined>(undefined);
  const [modalType, setModalType] = useState<modalType | undefined>(undefined);
  const [sucessModalMessage, setSuccessModalMessage] = useState('');

  const onClickDeposit = (fund: Fund) => {
    setModalType('deposit');
    setModalFund(fund);
    // fetchCollection();
    setShowModal(true);
  };

  const onClickWithdraw = (fund: Fund) => {
    setModalType('withdraw');
    setModalFund(fund);
    // fetchCollection();
    setShowModal(true);
  };

  // const fetchCollection = async () => {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     'https://hardworking-late-firefly.quiknode.pro/65fc8167ff913b5f6e127f71b9f6deeddd651f71/'
  //   );
  //   let resp = await provider.send('qn_getTokenMetadataByContractAddress', {
  //     contract: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
  //   });

  //   console.log('resp ', resp);
  // };

  const closeModal = () => {
    setShowModal(false);
    setModalFund(undefined);
  };

  const handleDeposit = (number: string) => {
    resetModal();

    setTimeout(() => {
      setSuccessModalMessage('Deposit has been successful');
      setModalType('success');
      setShowModal(true);
    }, 400);
  };

  const handleWithdraw = () => {
    resetModal();

    setTimeout(() => {
      setSuccessModalMessage('Withdraw has been successful');
      setModalType('success');
      setShowModal(true);
    }, 400);
  };

  const resetModal = () => {
    setShowModal(false);
    setModalType(undefined);
  };

  const renderModal = () => {
    if (!modalType) {
      return;
    }

    if (modalType === 'deposit') {
      return (
        <DepositModal
          fund={modalFund}
          closeModal={closeModal}
          handleDeposit={handleDeposit}
        />
      );
    }

    if (modalType === 'withdraw') {
      return (
        <WithdrawModal
          fund={modalFund}
          maxAmount={20}
          closeModal={closeModal}
          handleWithdraw={handleWithdraw}
          withdrawAbleAmount={20}
        />
      );
    }

    if (modalType === 'success') {
      return <SuccessModal message={sucessModalMessage} onClick={resetModal} />;
    }
  };

  return (
    <>
      <PageTitle title="Assets" />
      {showModal && renderModal()}

      <div className="flex flex-row flex-wrap">
        {mockData.map((fund) => {
          return (
            <Card
              key={fund.fundName}
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
