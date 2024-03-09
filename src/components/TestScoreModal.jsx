import React from "react";

const TestScoreModal = ({ score, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative bg-slate-900 rounded-lg max-w-md w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/100/external-verified-check-circle-for-approved-valid-content-basic-filled-tal-revivo.png"
            className="h-16 w-16"
            alt=""
          />
        </div>
        <h3 className="text-lg font-medium text-gray-200 text-center mb-4">
          Test Score
        </h3>
        <p className="text-sm text-gray-300 text-center">
          Your score is: {score}
        </p>
      </div>
    </div>
  );
};

export default TestScoreModal;
