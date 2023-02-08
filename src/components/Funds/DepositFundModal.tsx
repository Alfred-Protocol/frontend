import { ethers } from 'ethers';
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

const WMATIC_MUMBAI_ADDRESS =
  process.env.WMATIC_MUMBAI_ADDRESS ??
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

const DepositFundModal = ({ fundAddress, show, onClose }: DepositFundProps) => {
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
    ],
    enabled: !!account?.address,
  });

  const [wmaticDecimals, wmaticBalance, wmaticAllowance] = wmatic ?? [];

  console.log('wmatic', wmaticAllowance?.toString());

  // const { config: approveErc20Config } = usePrepareContractWrite({
  //   address: WMATIC_MUMBAI_ADDRESS,
  //   abi: erc20ABI,
  //   functionName: 'approve',
  //   args: [fundAddress as Address, ethers.constants.MaxUint256],
  // });

  // const { write: approveErc20Write } = useContractWrite(approveErc20Config);

  // wagmi hooks
  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'deposit',
    args: [
      ethers.utils.parseUnits(amountToDeposit.toString(), wmaticDecimals ?? 18),
    ],
    enabled:
      amountToDeposit > 0 &&
      ethers.utils.parseUnits(`${amountToDeposit}`, wmaticDecimals ?? 18) <=
        wmaticBalance! &&
      wmaticAllowance! >=
        ethers.utils.parseUnits(`${amountToDeposit}`, wmaticDecimals ?? 18),
  });
  const { data, isSuccess, write } = useContractWrite(config);
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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setHasCreated(false);
    console.log('write', write);

    write?.();

    // if (wmaticAllowance != null) {
    //   if (
    //     wmaticAllowance <
    //     ethers.utils.parseUnits(`${amountToDeposit}`, wmaticDecimals ?? 18)
    //   ) {
    //     approveErc20Write?.();
    //   } else {
    //     write?.();
    //   }
    // } else {
    //   approveErc20Write?.();
    // }
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="h-full">
      <Modal.Header>Deposit Fund</Modal.Header>
      <Modal.Body>
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="fundName">WMATIC amount</Label>
            <TextInput
              id="amountToDeposit"
              type="text"
              onChange={(e) => setAmountToDeposit(Number(e.target.value))}
              required
              placeholder="Enter your deposit amount"
            />
          </div>
          <div className="flex space-x-4">
            {wmaticAllowance != null ? (
              wmaticAllowance <
              ethers.utils.parseUnits(
                `${amountToDeposit}`,
                wmaticDecimals ?? 18
              ) ? (
                <CustomButton
                  className="focus:shadow-outline rounded py-2 px-4"
                  type="submit"
                  title="Approve"
                  theme="solidBlue"
                  isLoading={txIsLoading}
                />
              ) : (
                <CustomButton
                  className="focus:shadow-outline rounded py-2 px-4"
                  type="submit"
                  title="Create"
                  theme="solidBlue"
                  isLoading={txIsLoading}
                />
              )
            ) : null}
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

export default DepositFundModal;
