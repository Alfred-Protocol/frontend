import { BigNumber, ethers } from 'ethers';
import { Label, Modal, TextInput } from 'flowbite-react';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Address,
  erc20ABI,
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';
import Funds from '../../abi/Funds';
import CustomButton from '../Common/CustomButton';

type WithdrawFundProps = {
  fundAddress: string;
  show: boolean;
  onClose: () => void;
};

const WMATIC_MUMBAI_ADDRESS =
  process.env.WMATIC_MUMBAI_ADDRESS ??
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

const WithdrawFundModal = ({
  fundAddress,
  show,
  onClose,
}: WithdrawFundProps) => {
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
        address: fundAddress as Address,
        abi: Funds,
        functionName: 'depositedAmount',
        args: [account.address as Address],
      },
      {
        address: WMATIC_MUMBAI_ADDRESS as Address,
        abi: erc20ABI,
        functionName: 'symbol',
      },
    ],
    enabled: !!account?.address,
  });

  const [wmaticDecimals, wmaticBalance, depositedAmount, wmaticSymbol] =
    wmatic ?? [18, BigNumber.from(0), BigNumber.from(0), 'WMATIC'];

  const { data: signer } = useSigner();

  // wagmi hooks
  const { config } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'withdraw',
    enabled: depositedAmount.gt(0),
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

  useEffect(() => {
    if (txIsSuccess && !hasCreated) {
      setHasCreated(true);
      console.log(`Successfully deposited, transaction hash:`, txReceipt);
      toast.success(
        `Successfully deposited, transaction hash: ${txReceipt?.transactionHash}`
      );
      onClose();
    }
  }, [hasCreated, txIsSuccess, txReceipt?.transactionHash]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHasCreated(false);
    console.log('write', write);
    write?.();
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="h-full">
      <Modal.Header className="bg-gray-800">Withdraw Fund</Modal.Header>
      <Modal.Body className="bg-gray-800">
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="amountToDeposit">
              Amount to Withdraw:{' '}
              {ethers.utils.formatUnits(depositedAmount, wmaticDecimals)}{' '}
              {wmaticSymbol}
            </Label>
          </div>
          <div className="flex space-x-4">
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              type="submit"
              title={'Withdraw'}
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

export default WithdrawFundModal;
