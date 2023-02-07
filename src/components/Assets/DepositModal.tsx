import { useState } from 'react';
import type { Fund } from './AssetsSection';

interface ModalProp {
  closeModal: () => void;
  fund?: Fund;
  handleDeposit: (number: string) => void;
}

const DepositModal = ({ closeModal, fund, handleDeposit }: ModalProp) => {
  const [number, setNumber] = useState<string>('');
  if (!fund) {
    return <div></div>;
  }

  const assets = fund.assets;

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const continueDeposit = () => {
    handleDeposit(number);
  };

  return (
    <div className="">
      <div
        id="defaultModal"
        className="absolute left-1/2 -translate-x-1/2 -translate-y-8"
        style={{ minWidth: 600 }}
      >
        <div className="relative h-full w-full max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Deposit
              </h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
                onClick={closeModal}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="space-y-6 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Fund Name: {fund.fundName}
              </h3>
              <p className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Pair of Token
              </p>
              {assets.map((asset) => {
                return (
                  <p
                    key={asset.assetName}
                    className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400"
                  >
                    {asset.assetName}
                  </p>
                );
              })}
              <div className="flex items-center">
                <input
                  value={number}
                  type="text"
                  id="first_name"
                  onChange={onChangeText}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter Asset"
                  required
                />
                <p className="pl-2 text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  USDC
                </p>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={continueDeposit}
              >
                Continue Deposit
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
