"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useReceipt } from "@/app/providers/receipt-provider";
import { downloadReceipt } from "@/utils/downloadReceipt";

const ConfirmedMessage = () => {
  const router = useRouter();
  const { transaction } = useReceipt();

  const handleDownload = () => {
    if (transaction) {
      downloadReceipt(transaction);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-green-700">
        Payment Confirmed!
      </h1>
      <p className="text-gray-600 text-sm">
        Your payout was successful. You can now print your receipt.
      </p>
      <div className="mt-4 flex gap-2">
        {/* <button
          onClick={() => router.push("/receipt")}
          className="flex-1 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition"
        >
          View Receipt
        </button> */}
        <button
          onClick={handleDownload}
          className="flex-1 py-3 rounded-xl border border-green-600 text-green-600 font-medium hover:bg-green-50 transition"
        >
          Download PDF
        </button>
        <button
          onClick={() => router.push("/app")}
          className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-400 transition"
        >
          New Transaction
        </button>
      </div>
    </>
  );
};

export default ConfirmedMessage;
