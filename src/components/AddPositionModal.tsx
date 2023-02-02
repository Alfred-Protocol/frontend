import React, { useState } from 'react';
import type { Fund } from './AssetsSection';

interface DropdownProps {
  value?: string;
  options: string[];
  setValue: (val: string) => void;
}
const DropDown = ({ value, options, setValue }: DropdownProps) => {
  const [isHidden, setIsHidden] = useState(true);
  //   const [value, setValue] = useState(curValue);
  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsHidden(!isHidden)}
      >
        {value ? value : 'Select Token'}
        <svg
          className="w-4 h-4 ml-2"
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
          className="absolute w-24 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
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
    <div className="">
      <div
        id="defaultModal"
        className="absolute left-1/2 -translate-x-1/2 "
        style={{ minWidth: 600 }}
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Uniswap V3 Position
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
                onClick={closeModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
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

            <div className="p-6 space-y-6">
              <p className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
                  <div className="flex items-center mb-3">
                    <input
                      value={amount1}
                      type="text"
                      id="first_name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setAmount1(e.target.value)
                      }
                      className="w-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400 pl-2">
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
                      className="w-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400 pl-2">
                      {token2}
                    </p>
                  </div>
                </div>
              )}

              {amount1 > 0 && amount2 > 0 && (
                <div>
                  <div className="flex items-center mb-3">
                    <input
                      value={minPrice}
                      type="text"
                      id="first_name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setMinPrice(e.target.value)
                      }
                      className="w-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400 pl-2">
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
                      className="w-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Asset"
                      required
                    />
                    <p className="text-left text-base leading-relaxed text-gray-500 dark:text-gray-400 pl-2">
                      {token1} per {token2}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="flex text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:bg-gray-300"
                onClick={continueAddPosition}
                disabled={!fieldFulFill}
              >
                {isLoading ? (
                  <div role="status" className="flex">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-800"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
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
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
