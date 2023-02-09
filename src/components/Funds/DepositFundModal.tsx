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
import CustomToastWithLink from '../Common/CustomToastWithLink';

type DepositFundProps = {
  fundAddress: string;
  show: boolean;
  onClose: () => void;
  refetch: () => Promise<void>;
};

const WMATIC_MUMBAI_ADDRESS =
  process.env.WMATIC_MUMBAI_ADDRESS ??
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

const DepositFundModal = ({
  fundAddress,
  show,
  onClose,
  refetch,
}: DepositFundProps) => {
  const [amountToDeposit, setAmountToDeposit] = useState(0);
  const [isApproving, setIsApproving] = useState(false);

  const account = useAccount();
  const { data: wmatic, refetch: wmaticRefresh } = useContractReads({
    scopeKey: WMATIC_MUMBAI_ADDRESS,
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

  const [wmaticDecimals, wmaticBalance, wmaticAllowance] =
    wmatic !== undefined && wmatic.every(Boolean)
      ? wmatic
      : [18, BigNumber.from(0), BigNumber.from(0)];

  const { data: signer } = useSigner();

  // wagmi hooks
  const { config, refetch: depositRefresh } = usePrepareContractWrite({
    address: fundAddress as Address,
    abi: Funds,
    functionName: 'deposit',
    args: [ethers.utils.parseUnits(amountToDeposit.toString(), wmaticDecimals)],
    enabled:
      amountToDeposit > 0 &&
      ethers.utils
        .parseUnits(`${amountToDeposit}`, wmaticDecimals)
        .lt(wmaticBalance),
  });
  const { data, isSuccess, writeAsync } = useContractWrite(config);
  const {
    data: txReceipt,
    isSuccess: txIsSuccess,
    isLoading: txIsLoading,
  } = useWaitForTransaction({
    hash: data?.hash,
    enabled: isSuccess,
  });

  // approve hooks
  const approveErc20 = useCallback(
    async (address: Address) => {
      if (!signer) return;

      const erc20Contract = new ethers.Contract(
        address as string,
        erc20ABI,
        signer
      );
      const tx = await erc20Contract.approve(
        fundAddress as Address,
        ethers.constants.MaxUint256
      );
      setIsApproving(true);
      await tx.wait();
      setIsApproving(false);
      await wmaticRefresh();
      await depositRefresh();
    },
    [depositRefresh, fundAddress, signer, wmaticRefresh]
  );

  // toasts
  const [hasCreated, setHasCreated] = useState(false);

  useEffect(() => {
    if (txIsSuccess && !hasCreated) {
      setHasCreated(true);
      console.log(`Successfully deposited, transaction hash:`, txReceipt);
      toast.success(
        CustomToastWithLink({
          txId: txReceipt?.transactionHash as any,
          content: 'Successfully deposited, transaction hash:',
        })
      );
      refetch();
      onClose();
    }
  }, [hasCreated, txIsSuccess, txReceipt?.transactionHash]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHasCreated(false);

    const amountToDepositWei = ethers.utils.parseUnits(
      `${amountToDeposit}`,
      wmaticDecimals
    );
    if (amountToDepositWei.gt(wmaticBalance)) {
      toast.error(
        `Insufficient balance, currently you have ${ethers.utils.formatEther(
          wmaticBalance
        )} WMATIC`
      );
    }

    if ((wmaticAllowance as BigNumber).lt(amountToDepositWei)) {
      await approveErc20(WMATIC_MUMBAI_ADDRESS as Address);
    } else {
      await writeAsync?.();
    }
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="dark h-full">
      <Modal.Header className="bg-gray-800">Deposit Fund</Modal.Header>
      <Modal.Body className="bg-gray-800">
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="amountToDeposit">WMATIC amount</Label>
            <TextInput
              id="amountToDeposit"
              type="text"
              onChange={(e) => {
                if (
                  !isNaN(Number(e.target.value)) &&
                  Number(e.target.value) > 0
                ) {
                  setAmountToDeposit(Number(e.target.value));
                }
              }}
              required
              placeholder="Enter your deposit amount"
            />
          </div>
          <div className="flex space-x-4">
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              type="submit"
              title={
                ethers.utils
                  .parseUnits(`${amountToDeposit}`, wmaticDecimals)
                  .gt(wmaticAllowance)
                  ? 'Approve'
                  : 'Deposit'
              }
              theme="solidBlue"
              isLoading={txIsLoading || isApproving}
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

export default DepositFundModal;
