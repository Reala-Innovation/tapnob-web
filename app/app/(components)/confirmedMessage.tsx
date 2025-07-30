"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ConfirmedMessage = () => {
  const router = useRouter();

  return (
    <>
      <h1 className="text-2xl font-semibold text-green-700">
        Payment Confirmed!
      </h1>
      <p className="text-gray-600 text-sm">
        Your payout was successful. You can now print your receipt.
      </p>
      <button
        onClick={() => router.push("/receipt")}
        className="mt-4 w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition"
      >
        Print Receipt
      </button>
    </>
  );
};

export default ConfirmedMessage;
