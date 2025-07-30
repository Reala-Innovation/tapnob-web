"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReferenceBox from "./referenceBox";

interface Props {
  reference: string;
  timeLeft: number;
}

const PendingMessage: React.FC<Props> = ({ reference, timeLeft }) => {
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? `0${secs}` : secs}s`;
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">
        Thank you for using <span className="text-orange-500">Tapnob</span>
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Your payment will be confirmed in approximately{" "}
        <span className="font-medium text-orange-600 text-2xl">
          {formatTime(timeLeft)}
        </span>
        . You can then print your receipt.
      </p>

      <ReferenceBox reference={reference} />

      <button
        onClick={() => router.push("/")}
        className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-400 transition"
      >
        Return to Home
      </button>
    </>
  );
};

export default PendingMessage;
