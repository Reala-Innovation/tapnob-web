"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleContactClick } from "@/lib/utils";
import { useSocket } from "@/app/hooks/useSocket";
import { Copy } from "lucide-react";
import { useToast } from "@/app/providers/toast-provider";

const End: React.FC<{ transactionId: string }> = ({ transactionId }) => {
  const router = useRouter();
  const socket = useSocket();
  const [isPayoutConfirmed, setIsPayoutConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const toast = useToast();

  useEffect(() => {
    toast.showToast({
      severity: "info",
      detail: "Do not refresh this page!",
    });
    if (socket && socket.current) {
      const handlePayout = (data: unknown) => {
        console.log("payment received", data);
        setIsPayoutConfirmed(true);
      };

      socket.current.on("payout_confirmation", handlePayout);

      return () => {
        socket.current?.off("payout_confirmation", handlePayout);
      };
    }
  }, [socket]);

  // Countdown logic
  useEffect(() => {
    if (!isPayoutConfirmed && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPayoutConfirmed, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? `0${secs}` : secs}s`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(transactionId);
  };

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
            <p className="text-sm text-gray-500 mt-2">
              Your payment will be confirmed in approximately{" "}
              <span className="font-medium text-orange-600">
                {formatTime(timeLeft)}
              </span>
              . You can then print your receipt.
            </p>

            <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md border border-gray-200">
              <p className="mb-1">
                <strong>Transaction ID:</strong>
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs break-all">{transactionId}</span>
                <button onClick={copyToClipboard} title="Copy to clipboard">
                  <Copy size={16} className="text-gray-500 hover:text-black" />
                </button>
              </div>
            </div>

        

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
