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
      <div className="mb-10 text-3xl font-bold md:text-5xl">
        <span className="pr-1">👋</span>
        <span>Welcome Back!</span>
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="relative mb-2 flex items-center lg:flex-wrap">
            <p className="text-lg font-bold md:text-2xl">Net WMATIC Value</p>
            <Tooltip
              content="Total net value of your funds"
              className="text-center shadow-xl px-2"
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
          <div className="relative mb-2 flex items-center lg:flex-wrap">
            <p className="md;text-2xl text-lg font-bold">Net WMATIC Deposits</p>
            <Tooltip
              content="Total net value of your funds"
              className="text-center shadow-xl px-2"
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
