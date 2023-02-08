// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { ethers, Signer } from 'ethers';
import PageTitle from '../Layout/PageTitle';

import { LPPositionsMock } from '../../mockData/mockData';
import {
  Address,
  useContractRead,
  useContractReads,
  useSigner,
  useAccount,
} from 'wagmi';
import FundsFactory from '@/abi/FundsFactory';
import { useEffect } from 'react';
import Funds from '@/abi/Funds';
import { sign } from 'crypto';
import AssetsHeader from '../Assets/AssetsHeader';
import AssetsDetail from '../Assets/AssetsDetail';
import FundsDetailsNew from './FundDetailsNew';

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
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1 },
      { assetName: 'USDC', assetValue: 1676.251 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
  {
    fundName: 'Fund B',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1.1 },
      { assetName: 'USDT', assetValue: 1556.251 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
  {
    fundName: 'Fund C',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 2 },
      { assetName: 'USDR', assetValue: 3212 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
  {
    fundName: 'Fund D',
    tvl: 234,
    address: '0x7730b4cdc1b1e7a33a309ab7205411fad009c106',
    manager: '0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3',
    assets: [
      { assetName: 'ETH', assetValue: 1.3 },
      { assetName: 'USDD', assetValue: 5432 },
    ],
    depositEnable: true,
    withdrawEnable: true,
    amount0: 400,
    amount1: 500,
    positions: LPPositionsMock,
  },
];

type modalType = 'success' | 'deposit' | 'withdraw';

const FundsSection = () => {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [modalFund, setModalFund] = useState<Fund | undefined>(undefined);
  const [modalType, setModalType] = useState<modalType | undefined>(undefined);
  const [sucessModalMessage, setSuccessModalMessage] = useState('');

  const { data: signer } = useSigner();
  const { data: addresses, isLoading } = useContractRead({
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: FundsFactory,
    functionName: 'getAllFunds',
    cacheOnBlock: true,
  });

  const { status, address: curUserAddress } = useAccount();

  console.log('status ', status);

  // const [viewState, setViewState] = useState(ViewState.CREATION_ASCENDING);
  // const [showCreateFundModal, setShowCreateFundModal] = useState(false);

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <AssetsHeader
          managerAddress="0x7730b4cdc1b1e7a33a309ab7205411fad009c106"
          netDeposit={3232.3}
          netValue={3223.43}
        />
        <div className="flex w-full flex-col items-center space-y-10">
          {addresses?.map((address, idx) => {
            return (
              <FundsDetailsNew
                fundAddress={address}
                curUserAddress={curUserAddress}
                // address={data.address}
                // key={idx}
                // lpPositions={data.positions}
                // amount0={data.amount0}
                // amount1={data.amount1}
                // totalValueLocked={36}
                // startDate="02/05/2023"
                // matureDate="02/07/2023"
                // fundName={data.fundName}
                // logo1={undefined}
                // logo2={undefined}
                // yieldPercentage={30.2}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FundsSection;
