import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
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
      <p className="text-md">
        Address: {fundAddress}{' '}
        <ClipboardDocumentIcon
          width={16}
          height={16}
          className="inline transition-colors hover:cursor-pointer hover:stroke-fuchsia-300"
          onClick={() => {
            navigator.clipboard.writeText(fundAddress);
            toast.success('Fund address copied to clipboard!');
          }}
        />
      </p>
      <p className="text-md mb-5">
        Manager: {fundManager}{' '}
        <ClipboardDocumentIcon
          width={16}
          height={16}
          className="inline transition-colors hover:cursor-pointer hover:stroke-fuchsia-300"
          onClick={() => {
            navigator.clipboard.writeText(fundManager);
            toast.success('Manager address copied to clipboard!');
          }}
        />
      </p>
      <div className="flex">
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold">Net USD Value</p>
          <p className="mb-2 text-4xl font-thin">{netValue.toFixed(5)}</p>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold">Net USD Deposit</p>
          <p className="mb-2 text-4xl font-thin">{netDeposit.toFixed(5)}</p>
        </div>
      </div>
    </div>
  );
};

export default FundDetailHeader;
