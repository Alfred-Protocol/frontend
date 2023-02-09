import { BigNumber, ethers } from 'ethers';
import { Label, Modal, TextInput } from 'flowbite-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Address,
  erc20ABI,
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
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
  const [swapAmount, setSwapAmount] = useState(0);

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
    wmatic !== undefined && wmatic.every(Boolean)
      ? wmatic
      : [18, BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)];

  // wagmi hooks
  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'swapTokens',
    args: [
      WMATIC_MUMBAI_ADDRESS,
      WETH_MUMBAI_ADDRESS,
      ethers.utils.parseUnits(`${swapAmount}`, wmaticDecimals),
    ],
    enabled:
      swapAmount > 0 &&
      ethers.utils.parseUnits(`${swapAmount}`, wmaticDecimals) <= wmaticBalance,
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

  useEffect(() => {
    if (txIsSuccess && !hasCreated) {
      setHasCreated(true);
      console.log(`Successfully swapped, transaction hash:`, txReceipt);
      toast.success(
        `Successfully swapped, transaction hash: ${txReceipt?.transactionHash}`
      );
      onClose();
    }
  }, [hasCreated, txIsSuccess, txReceipt?.transactionHash]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHasCreated(false);

    if (
      ethers.utils.parseUnits(`${swapAmount}`, wmaticDecimals) > wmaticBalance
    ) {
      toast.error(
        `Insufficient balance, currently you have ${ethers.utils.formatEther(
          wmaticBalance
        )} WMATIC`
      );
    }
    write?.();
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="dark h-full">
      <Modal.Header className="bg-gray-800">Swap tokens in Fund</Modal.Header>
      <Modal.Body className="bg-gray-800">
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="amountToSwap">WMATIC amount</Label>
            <TextInput
              id="amountToSwap"
              type="text"
              onChange={(e) => {
                if (
                  !isNaN(Number(e.target.value)) &&
                  Number(e.target.value) > 0
                ) {
                  setSwapAmount(Number(e.target.value));
                }
              }}
              required
              placeholder="Enter your swap amount"
            />
          </div>
          <div className="flex space-x-4">
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              type="submit"
              title="Swap"
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
