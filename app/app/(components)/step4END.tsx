"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleContactClick } from "@/lib/utils";
import { useSocket } from "@/app/hooks/useSocket";

const End = () => {
  const router = useRouter();
  const socket = useSocket();
  const [isPayoutConfirmed, setIsPayoutConfirmed] = useState(false);

  useEffect(() => {
    if (socket && socket.current) {
      const handlePayout = (data:unknown) => {
        console.log("payment received", data);
        setIsPayoutConfirmed(true);
      };

      socket.current.on("payout_confirmation", handlePayout);

      return () => {
        socket.current?.off("payout_confirmation", handlePayout);
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-full flex justify-center">
          <Image src="/success.svg" alt="Success" width={200} height={200} />
        </div>

        {isPayoutConfirmed ? (
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
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-800">
              Thank you for using{" "}
              <span className="text-orange-500">Tapnob</span>
            </h1>
            <p className="text-gray-600 text-sm">
              Your funds will arrive shortly. You will receive a confirmation
              once the transfer is complete.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-400 transition"
            >
              Return to Home
            </button>
          </>
        )}

        <p
          className="text-center text-blue-500 underline cursor-pointer text-sm"
          onClick={handleContactClick}
        >
          Contact Support
        </p>
      </div>
    </div>
  );
};

export default End;
