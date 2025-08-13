import React from "react";
import { useRouter } from "next/navigation";

const FailedMessage: React.FC<{ reference: string }> = ({ reference }) => {
  const router = useRouter();

  const handleRetry = () => {
    
    router.push("/");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-red-600">Transaction Failed</h2>
      <p className="text-gray-600">
        Unfortunately, your transaction could not be completed.
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-700">
          <strong>Reference:</strong> {reference}
        </p>
        <p className="text-sm text-red-700 mt-2">
          Please contact support with this reference number if you believe this
          is an error.
        </p>
      </div>
      <div className="flex flex-col space-y-3 mt-6">
        <button
          onClick={handleRetry}
          className="bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FailedMessage;
