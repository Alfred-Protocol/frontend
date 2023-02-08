import { BigNumber, ethers } from 'ethers';
import { Label, Modal, Textarea, TextInput } from 'flowbite-react';
import React, { FormEventHandler, useState } from 'react';
import {
  Address,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractReads,
  erc20ABI,
} from 'wagmi';
import Funds from '../../abi/Funds';
import CustomButton from '../Common/CustomButton';

type DepositFundProps = {
  fundAddress: string;
  show: boolean;
  onClose: () => void;
};

const WMATIC_MUMBAI_ADDRESS = (process.env.WMATIC_MUMBAI_ADDRESS ??
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889') as Address;

const WETH_MUMBAI_ADDRESS = (process.env.WETH_MUMBAI_ADDRESS ??
  '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa') as Address;

const SwapTokensModal = ({ fundAddress, show, onClose }: DepositFundProps) => {
  const [amountToDeposit, setAmountToDeposit] = useState(0);

  const account = useAccount();

  const { data: wmatic } = useContractReads({
    contracts: [
      {
        address: WMATIC_MUMBAI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'decimals',
      },
      {
        address: WMATIC_MUMBAI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address as Address],
      },
      {
        address: WMATIC_MUMBAI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address as Address, fundAddress as Address],
      },
      {
        address: WMATIC_MUMBAI_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [fundAddress as Address],
      },
    ],
    enabled: (account?.address?.length ?? 0) > 0 && fundAddress.length > 0,
  });

  const [wmaticDecimals, wmaticBalance, wmaticAllowance, fundWmaticBalance] =
    wmatic ?? [18, 0, 0, 0];

  // const { config: approveErc20Config } = usePrepareContractWrite({
  //   scopeKey: 'approveErc20',
  //   address: WMATIC_MUMBAI_ADDRESS as Address,
  //   abi: erc20ABI,
  //   functionName: 'approve',
  //   args: [fundAddress as Address, ethers.constants.MaxUint256],
  //   enabled: false,
  // });

  // const {
  //   data: approveErc20Data,
  //   writeAsync: approveErc20Write,
  //   isSuccess: isAddressApproved,
  // } = useContractWrite(approveErc20Config);

  // const { isSuccess: approveErc20IsSuccess } = useWaitForTransaction({
  //   hash: approveErc20Data?.hash,
  //   enabled: isAddressApproved,
  // });

  // wagmi hooks
  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'swapTokens',
    args: [
      WMATIC_MUMBAI_ADDRESS,
      WETH_MUMBAI_ADDRESS,
      BigNumber.from(amountToDeposit).mul(
        BigNumber.from(10).pow(wmaticDecimals)
      ),
    ],
    enabled:
      amountToDeposit > 0 &&
      ethers.utils.parseUnits(`${amountToDeposit}`, wmaticDecimals) <=
        wmaticBalance,
  });
  const { data, isSuccess, write } = useContractWrite({
    mode: 'prepared',
  });
  const {
    data: txReceipt,
    isSuccess: txIsSuccess,
    isLoading: txIsLoading,
  } = useWaitForTransaction({
    hash: data?.hash,
    enabled: isSuccess,
  });

  // toasts
  const [hasCreated, setHasCreated] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHasCreated(false);
    console.log(
      WMATIC_MUMBAI_ADDRESS,
      WETH_MUMBAI_ADDRESS,
      ethers.utils.parseUnits(`${amountToDeposit}`, wmaticDecimals)
    );
    console.log('write', write);

    if (
      // !approveErc20IsSuccess &&
      wmaticAllowance <
      ethers.utils.parseUnits(`${amountToDeposit}`, wmaticDecimals ?? 18)
    ) {
      // await approveErc20Write?.();
    } else {
      write?.();
    }
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="h-full">
      <Modal.Header className="bg-gray-800">Swap tokens in Fund</Modal.Header>
      <Modal.Body className="bg-gray-800">
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="fundName">WMATIC amount</Label>
            <TextInput
              id="amountToDeposit"
              type="text"
              onChange={(e) => setAmountToDeposit(+e.target.value)}
              required
              placeholder="Enter your deposit amount"
            />
          </div>
          <div className="flex space-x-4">
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              type="submit"
              title="Approve"
              theme="solidBlue"
              isLoading={txIsLoading}
            />
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              title="Cancel"
              theme="solidPurple"
              onClick={onClose}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SwapTokensModal;

// 0. Ability to swap tokens
// 1. Create LP position
// 2. Withdraw LP position
// 3. Redeem LP positions
