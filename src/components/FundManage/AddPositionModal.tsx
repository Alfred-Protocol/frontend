import React, { useState } from 'react';
import type { Fund } from '../Assets/AssetsSection';
import Spinner from '../Layout/Spinner';

interface DropdownProps {
  value?: string;
  options: string[];
  setValue: (val: string) => void;
}
const DropDown = ({ value, options, setValue }: DropdownProps) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="mr-4 inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsHidden(!isHidden)}
      >
        {value ? value : 'Select Token'}
        <svg
          className="ml-2 h-4 w-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {!isHidden && (
        <div
          id="dropdown"
          className="absolute z-10 w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
          style={{ display: isHidden ? 'none' : 'normal' }}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option) => {
              return (
                <li
                  key={option}
                  onClick={() => {
                    setValue(option);
                    setIsHidden(true);
                  }}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {option}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

interface ModalProp {
  closeModal: () => void;
  fund?: Fund;
  addPosition: ({
    token1,
    token2,
    amount1,
    amount2,
    minPrice,
    maxPrice,
  }: {
    token1: string;
    token2: string;
    amount1: number;
    amount2: number;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

const AddPositionModal = ({ closeModal, fund, addPosition }: ModalProp) => {
  const [number, setNumber] = useState<string>('');
  const [token1, setToken1] = useState('ETH');
  const [token2, setToken2] = useState('');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(7000);
  const min = 100;
  const max = 10000;
  const [minthumb, setMinThumb] = useState(0);
  const [maxthumb, setMaxThumb] = useState(0);
  //   const assets = fund.assets;

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const continueAddPosition = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addPosition({ token1, token2, amount1, amount2, minPrice, maxPrice });
      closeModal();
    }, 1000);
  };

  const setMinTrigger = () => {
    setMinPrice(Math.min(minPrice, maxPrice - 500));
    setMinThumb(((minPrice - min) / (max - min)) * 100);
  };

  const setMaxTrigger = () => {
    setMaxPrice(Math.max(maxPrice, minPrice + 500));
    setMaxThumb(100 - ((maxPrice - min) / (max - min)) * 100);
  };

  const fieldFulFill =
    token1 &&
    token2 &&
    amount1 > 0 &&
    amount2 > 0 &&
    minPrice > 0 &&
    maxPrice > 0;
  return (
    <div>
      <div
        id="defaultModal"
        className="absolute left-1/2 -translate-x-1/2"
        style={{ minWidth: 600 }}
      >
        <div className="relative h-full w-full max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg bg-white shadow-md dark:bg-sky-900">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Uniswap V3 Position
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

            <div className="space-y-6 p-6">
              <p className="text-left text-base leading-relaxed text-gray-500 dark:text-purple-100">
                Select Pairs of Token
              </p>
              <div className="flex">
                <DropDown
                  value={token1}
                  options={['ETH', 'USDC', 'USDT']}
                  setValue={(val) => setToken1(val)}
                />
                <DropDown
                  value={token2}
                  options={['ETH', 'USDC', 'USDT']}
                  setValue={(val) => setToken2(val)}
                />
              </div>
              {token1 && token2 && (
                <div>
                  <div className="mb-3 flex items-center">
                    <input
                      value={amount1}
                      type="text"
                      id="first_name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setAmount1(e.target.value)
                      }
                      className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="pl-2 text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {token1}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      value={amount2}
                      type="text"
                      id="first_name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setAmount2(e.target.value)
                      }
                      className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="pl-2 text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {token2}
                    </p>
                  </div>
                </div>
              )}

              {amount1 > 0 && amount2 > 0 && (
                <div>
                  <div className="mb-3 flex items-center">
                    <input
                      value={minPrice}
                      type="text"
                      id="first_name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setMinPrice(e.target.value)
                      }
                      className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="pl-2 text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {token1} per {token2}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      value={maxPrice}
                      type="text"
                      id="first_name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setMaxPrice(e.target.value)
                      }
                      className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="pl-2 text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {token1} per {token2}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* <!-- Modal footer --> */}
            <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="flex rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-indigo-700 disabled:opacity-80 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                onClick={continueAddPosition}
                disabled={!fieldFulFill}
              >
                {isLoading ? (
                  <div role="status" className="flex">
                    <Spinner className="mr-2 h-3 w-3 border-2" />
                    <p className="">Loading...</p>
                  </div>
                ) : (
                  <>+ Add Position</>
                )}
              </button>
              {/*
              <button type="button" className="bg-indigo-500 ..." disabled>
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
                Processing...
              </button> */}
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

export default AddPositionModal;
