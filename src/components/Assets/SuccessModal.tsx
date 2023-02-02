import React from 'react';

interface Props {
  onClick: () => void;
  message: string;
}

const SuccessModal = ({ onClick, message }: Props) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
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
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Successfull
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            id="ok-btn"
            className="px-4 py-2 bg-purple-500 text-white
                            text-base font-medium rounded-md w-full
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
