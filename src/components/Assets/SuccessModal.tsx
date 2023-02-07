import React from 'react';

interface Props {
  onClick: () => void;
  message: string;
}

const SuccessModal = ({ onClick, message }: Props) => {
  return (
    <div className="absolute left-1/2 mx-auto w-96 -translate-x-1/2 rounded-md border bg-white p-5 shadow-lg">
      <div className="mt-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <svg
            className="h-6 w-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Successfull
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            id="ok-btn"
            className="w-full rounded-md bg-purple-500 px-4
                            py-2 text-base font-medium text-white
                            shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
            onClick={onClick}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
