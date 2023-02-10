import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'flowbite-react';

interface Props {
  managerAddress: string;
  netValue: number;
  netDeposit: number;
}

const AssetsHeader = ({ managerAddress, netDeposit, netValue }: Props) => {
  return (
    <div className="mb-12 mt-10 w-full rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-fuchsia-100 ">
      <div className="mb-10 text-5xl font-bold">
        <span className="pr-1">👋</span>
        <span>Welcome Back!</span>
      </div>
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
          <p className="mb-2 text-4xl font-thin">{netValue.toFixed(3)}</p>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center">
            <p className="text-2xl font-bold">Net WMATIC Deposits</p>
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
          </div>{' '}
          <p className="mb-2 text-4xl font-thin">{netDeposit.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
};

export default AssetsHeader;
