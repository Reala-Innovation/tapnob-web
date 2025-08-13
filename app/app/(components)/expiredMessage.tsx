import React from "react";
import { useRouter } from "next/navigation";

const ExpiredMessage: React.FC<{ reference: string }> = ({ reference }) => {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-600">
        Transaction Expired
      </h2>
      <p className="text-gray-600">
        Your transaction session has expired. This can happen if too much time
        passes before completion.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-700">
          <strong>Reference:</strong> {reference}
        </p>
        <p className="text-sm text-yellow-700 mt-2">
          If you think this was a mistake, please contact support with the
          reference number above.
        </p>
      </div>
      <div className="flex flex-col space-y-3 mt-6">
        <button
          onClick={handleRetry}
          className="bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Start New Transaction
        </button>
      </div>
    </div>
  );
};

export default ExpiredMessage;
