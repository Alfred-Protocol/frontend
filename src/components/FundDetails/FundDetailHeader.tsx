import {
  ClipboardDocumentIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Tooltip } from 'flowbite-react';
import { toast } from 'react-toastify';

interface Props {
  fundName: string;
  fundAddress: string;
  fundManager: string;
  fundDescription: string;
  netValue: number;
  netDeposit: number;
}

const FundDetailHeader = ({
  fundName,
  fundAddress,
  fundManager,
  fundDescription,
  netDeposit,
  netValue,
}: Props) => {
  return (
    <div className="w-full rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-fuchsia-100">
      <h1 className="mb-2 text-5xl font-bold">{fundName}</h1>
      <p className="mb-3 text-lg">{fundDescription}</p>
      <p className="mb-1 text-sm">
        Address: {fundAddress}{' '}
        <ClipboardDocumentIcon
          width={14}
          height={14}
          className="inline transition-colors hover:cursor-pointer hover:stroke-fuchsia-300"
          onClick={() => {
            navigator.clipboard.writeText(fundAddress);
            toast.success('Fund address copied to clipboard!');
          }}
        />
      </p>
      <p className="mb-5 text-sm">
        Manager: {fundManager}{' '}
        <ClipboardDocumentIcon
          width={14}
          height={14}
          className="inline transition-colors hover:cursor-pointer hover:stroke-fuchsia-300"
          onClick={() => {
            navigator.clipboard.writeText(fundManager);
            toast.success('Manager address copied to clipboard!');
          }}
        />
      </p>
      <div className="flex">
        <div className="flex-1">
          <div className="mb-2 flex items-center">
            <p className="text-2xl font-bold">Net WMATIC Value</p>
            <Tooltip
              content="Total net value of your funds"
              className="px-2 text-center"
            >
              <InformationCircleIcon
                height={20}
                width={20}
                className="ml-2 transition-colors hover:stroke-fuchsia-300"
              />
            </Tooltip>
          </div>
          <p className="mb-2 text-4xl font-thin">{netValue.toFixed(5)}</p>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center">
            <p className="text-2xl font-bold">Net WMATIC Deposits</p>
            <Tooltip
              content="Total value of your deposits in all funds"
              className="px-2 text-center"
            >
              <InformationCircleIcon
                height={20}
                width={20}
                className="ml-2 transition-colors hover:stroke-fuchsia-300"
              />
            </Tooltip>
          </div>{' '}
          <p className="mb-2 text-4xl font-thin">{netDeposit.toFixed(5)}</p>
        </div>
      </div>
    </div>
  );
};

export default FundDetailHeader;
