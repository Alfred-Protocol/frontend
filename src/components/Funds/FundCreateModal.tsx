import FundsFactory from '@/abi/FundsFactory';
import NormalButton from '@/components/Layout/NormalButton';
import useDebounce from '@/hooks/useDebounce';
import { BigNumber } from 'ethers';
import { Modal, Label, TextInput, Textarea } from 'flowbite-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import CustomButton from '../Common/CustomButton';

interface FundCreateModalProps {
  onClose: () => void;
  show: boolean;
}

const FundCreateModal = ({ onClose, show }: FundCreateModalProps) => {
  const fundNameRef = useRef<HTMLInputElement>(null);
  const fundDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const matureDateRef = useRef<HTMLInputElement>(null);

  const fundName = useDebounce(fundNameRef?.current?.value);
  const startDate = useDebounce(startDateRef?.current?.valueAsDate?.getTime());
  const matureDate = useDebounce(
    matureDateRef?.current?.valueAsDate?.getTime()
  );

  const { config } = usePrepareContractWrite({
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: FundsFactory,
    functionName: 'createNewFund',
    args: [
      process.env.USDC_MUMBAI_ADDRESS as Address,
      BigNumber.from(startDate || 0),
      BigNumber.from(matureDate || 0),
    ],
    enabled: !!startDate && !!matureDate,
  });

  const { data, isSuccess, write } = useContractWrite(config);
  const { data: txReceipt, isSuccess: txIsSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: isSuccess,
  });

  const [hasCreated, setHasCreated] = useState(false);
  useEffect(() => {
    if (txIsSuccess && !hasCreated) {
      setHasCreated(true);
      toast.success(
        `Successfully created, transaction hash: ${txReceipt?.transactionHash}`
      );
    }
  }, [hasCreated, txIsSuccess, txReceipt?.transactionHash]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ fundName, startDate, matureDate });
    console.log(config, write);
    write?.();
  };

  return (
    <Modal show={show} dismissible onClose={onClose} className="rounded">
      <Modal.Header>Create Fund</Modal.Header>
      <Modal.Body>
        <form className="mb-4 space-y-4 rounded" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="fundName">Fund Name</Label>
            <TextInput
              id="fundName"
              type={'text'}
              ref={fundNameRef}
              placeholder="Enter your fund's name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fundDescription">Fund Description</Label>
            <Textarea
              id="fundDescription"
              ref={fundDescriptionRef}
              className="text-sm"
              placeholder="Enter your fund's description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <TextInput id="startDate" type={'date'} ref={startDateRef} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="matureDate">Mature Date</Label>
            <TextInput id="matureDate" type={'date'} ref={matureDateRef} />
          </div>
          <div className="flex space-x-4">
            <CustomButton
              className="focus:shadow-outline rounded py-2 px-4"
              type="submit"
              title="Create"
              theme="solidBlue"
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
