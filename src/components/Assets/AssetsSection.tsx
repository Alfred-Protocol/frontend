// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { ethers } from 'ethers';
import Card from './Card';
import PageTitle from '../Layout/PageTitle';
import DepositModal from './DepositModal';
import SuccessModal from './SuccessModal';
import WithdrawModal from './WithdrawModal';
import AssetsHeader from './AssetsHeader';
import AssetsDetail from './AssetsDetail';

export type Fund = {
  fundName: string;
  tvl: number;
  manager: string;
  assets: { assetName: string; assetValue: number }[];
  depositEnable: boolean;
  withdrawEnable: boolean;
};

const mockData = [
  {
    fundName: 'Fund A',
    tvl: 234,
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1 },
      { assetName: 'USDC', assetValue: 1676.251 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAIZ',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
  {
    fundName: 'Fund B',
    tvl: 234,
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1.1 },
      { assetName: 'USDT', assetValue: 1556.251 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
  {
    fundName: 'Fund C',
    tvl: 234,
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 2 },
      { assetName: 'USDR', assetValue: 3212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
  },
  {
    fundName: 'Fund D',
    tvl: 234,
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1.3 },
      { assetName: 'USDD', assetValue: 5432 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: [
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
      {
        token0: 'DAI',
        token1: 'WBTC',
        address0: '0xBA47cF08bDFbA09E7732c0e48E12a11Cd1536bce',
        address1: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c746',
        fee: 0.02,
        min: 1500,
        max: 2500,
        amount0: 2,
        amount1: 2000,
      },
    ],
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
    <div>
      <div className="flex flex-col items-center justify-center">
        <AssetsHeader
          managerAddress="0x7730b4cdc1b1e7a33a309ab7205411fad009c106"
          netDeposit={3232.3}
          netValue={3223.43}
        />
        <div className="flex w-full flex-col items-center space-y-10">
          {mockData.map((data, idx) => {
            return (
              <AssetsDetail
                key={idx}
                lpPositions={data.positions}
                amount0={data.amount0}
                amount1={data.amount1}
                totalValueLocked={36}
                startDate="02/05/2023"
                matureDate="02/07/2023"
                fundName={data.fundName}
                logo1={undefined}
                logo2={undefined}
                yieldPercentage={30.2}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AssetsSection;
