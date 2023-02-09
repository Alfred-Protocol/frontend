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
  useSigner,
} from 'wagmi';
import Funds from '../../abi/Funds';
import CustomButton from '../Common/CustomButton';

type DepositFundProps = {
  fundAddress: string;
  show: boolean;
  onClose: () => void;
};

const UNI_GOERLI_ADDRESS = (process.env.UNI_GOERLI_ADDRESS ??
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984') as Address;
const WETH_GOERLI_ADDRESS = (process.env.WETH_GOERLI_ADDRESS ??
  '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6') as Address;

const SwapTokensModal = ({ fundAddress, show, onClose }: DepositFundProps) => {
  const [amountToDeposit, setAmountToDeposit] = useState(0);
  console.log('amountToDeposit', UNI_GOERLI_ADDRESS, WETH_GOERLI_ADDRESS);
  const account = useAccount();

  const { data: wmatic } = useContractReads({
    contracts: [
      {
        address: WETH_GOERLI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'decimals',
      },
      {
        address: WETH_GOERLI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address as Address],
      },
      {
        address: WETH_GOERLI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address as Address, fundAddress as Address],
      },
      {
        address: WETH_GOERLI_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [fundAddress as Address],
      },
    ],
    enabled: (account?.address?.length ?? 0) > 0 && fundAddress.length > 0,
    staleTime: 1000 * 15,
  });

  const [wethDecimals, wethBalance, wethAllowance, fundWethBalance] =
    wmatic ?? [18, 0, 0, 0];

  // 1 ETH = 1.5 UNI on Goerli
  const sqrtPriceMax = priceToSqrtPrice(2);

  // ??
  console.log('sqrtPriceMax', sqrtPriceMax.toString());

  // wagmi hooks
  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'swapTokens',
    args: [
      WETH_GOERLI_ADDRESS,
      UNI_GOERLI_ADDRESS,
      ethers.utils.parseUnits(`${amountToDeposit}`, wethDecimals),
      sqrtPriceMax,
    ],
    enabled:
      amountToDeposit > 0 &&
      ethers.utils.parseUnits(`${amountToDeposit}`, wethDecimals) <=
        wethBalance,
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

  const { data: signer } = useSigner();

  const swapTokens = async () => {
    if (!signer) return;

    const fundsContract = new ethers.Contract(
      fundAddress as Address,
      Funds,
      signer
    );
    const tx = await fundsContract.swapTokens(
      WETH_GOERLI_ADDRESS,
      UNI_GOERLI_ADDRESS,
      ethers.utils.parseUnits(`${amountToDeposit}`, wethDecimals),
      sqrtPriceMax,
      {
        gasLimit: 1000000,
      }
    );
    console.log('tx', tx);
  };

  console.log(
    'fundWethBalance',
    fundWethBalance.toString(),
    wethAllowance.toString()
  );

  // toasts
  const [hasCreated, setHasCreated] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHasCreated(false);

    if (write) {
      write?.();
    } else {
      swapTokens();
    }
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="h-full">
      <Modal.Header>Swap tokens in Fund</Modal.Header>
      <Modal.Body>
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="fundName">WETH amount</Label>
            <TextInput
              id="amountToDeposit"
              type="text"
              onChange={(e) => setAmountToDeposit(Number(e.target.value))}
              required
              placeholder="Enter your deposit amount"
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

const priceToSqrtPrice = (price: number) => {
  return BigNumber.from(Math.ceil(Math.sqrt(price))).mul(
    BigNumber.from(2).pow(96)
  );
};

export default SwapTokensModal;

// 0. Ability to swap tokens
// 1. Create LP position
// 2. Withdraw LP position
// 3. Redeem LP positions
