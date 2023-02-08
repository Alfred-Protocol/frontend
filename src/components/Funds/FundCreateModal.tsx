import FundsFactory from '@/abi/FundsFactory';
import useCreateFund from '@/hooks/useCreateFund';
import { BigNumber, ethers } from 'ethers';
import { Label, Modal, Textarea, TextInput } from 'flowbite-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Web3 from 'web3';
import CustomButton from '../Common/CustomButton';

interface FundCreateModalProps {
  onClose: () => void;
  show: boolean;
}

const getFundAddressFromReceipt = (
  receipt: ethers.providers.TransactionReceipt
) => {
  const web3 = new Web3();
  let fundAddress: string = '';
  receipt.logs.forEach((log) => {
    if (log.topics.length === 1) {
      const data = web3.eth.abi.decodeParameters(
        [
          { type: 'address', name: 'fund' },
          { type: 'address', name: 'manager' },
        ],
        log.data
      );
      fundAddress = data.fund;
      return;
    }
  });
  return fundAddress;
};

const WMATIC_MUMBAI_ADDRESS =
  process.env.WMATIC_MUMBAI_ADDRESS ??
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

const FundCreateModal = ({ onClose, show }: FundCreateModalProps) => {
  const [fundName, setFundName] = useState('');
  const [fundDescription, setFundDescription] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [matureDate, setMatureDate] = useState(0);

  // wagmi hooks
  const { config } = usePrepareContractWrite({
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: FundsFactory,
    functionName: 'createNewFund',
    args: [
      WMATIC_MUMBAI_ADDRESS as Address,
      BigNumber.from(startDate),
      BigNumber.from(matureDate),
    ],
    enabled: !!startDate && !!matureDate,
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
  const { address } = useAccount();
  const { mutate } = useCreateFund();

  // toasts
  const [hasCreated, setHasCreated] = useState(false);
  useEffect(() => {
    if (txIsSuccess && !hasCreated) {
      setHasCreated(true);
      // upload to database
      mutate({
        name: fundName,
        address: getFundAddressFromReceipt(txReceipt!),
        manager: address!,
        description: fundDescription,
        startDate: new Date(startDate!),
        matureDate: new Date(matureDate!),
      });
      console.log(
        `Successfully created, transaction hash: ${JSON.stringify(txReceipt)}`
      );
      toast.success(
        `Successfully created, transaction hash: ${txReceipt?.transactionHash}`
      );
      onClose();
    }
  }, [hasCreated, txIsSuccess, txReceipt?.transactionHash]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setHasCreated(false);
    if (fundName === '' || fundDescription === '') {
      console.error('Invalid fund name/description');
      return;
    }
    if (!startDate || !matureDate) {
      console.error('Invalid start/mature date', startDate, matureDate);
      return;
    }
    write?.();
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="h-full">
    <Modal.Header className="bg-gray-800">Create Fund</Modal.Header>
      <Modal.Body className="bg-gray-800">
        <form className="space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="fundName">Fund Name</Label>
            <TextInput
              id="fundName"
              type={'text'}
              onChange={(e) => setFundName(e.target.value)}
              required
              placeholder="Enter your fund's name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fundDescription">Fund Description</Label>
            <Textarea
              id="fundDescription"
              minLength={1}
              onChange={(e) => setFundDescription(e.target.value)}
              className="text-sm"
              placeholder="Enter your fund's description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <TextInput
              id="startDate"
              type={'date'}
              required
              onChange={(e) =>
                e.target.valueAsDate !== null &&
                setStartDate(e.target.valueAsDate?.getTime())
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="matureDate">Mature Date</Label>
            <TextInput
              id="matureDate"
              type={'date'}
              required
              onChange={(e) =>
                e.target.valueAsDate !== null &&
                setMatureDate(e.target.valueAsDate.getTime())
              }
            />
          </div>
          <div className="flex space-x-4">
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              type="submit"
              title="Create"
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

export default FundCreateModal;
