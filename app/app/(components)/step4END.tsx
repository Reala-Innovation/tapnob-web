"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSocket } from "@/app/hooks/useSocket";
import { useToast } from "@/app/providers/toast-provider";
import { handleContactClick } from "@/lib/utils";
import { PayoutConfirmation, Transaction } from "@/@types";
import ConfirmedMessage from "./confirmedMessage";
import PendingMessage from "./pendingMessage";
import { useReceipt } from "@/app/providers/receipt-provider";

const End: React.FC<{ reference: string }> = ({ reference }) => {
  const router = useRouter();
  const socket = useSocket();
  const toast = useToast();
  const { setTransaction } = useReceipt();
  const [isPayoutConfirmed, setIsPayoutConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    toast.showToast({
      severity: "info",
      detail: "Do not refresh this page!",
    });

    if (socket?.current) {
      const handlePayout = (data: PayoutConfirmation) => {
        console.log("payment received", data);
        setTransaction(data);
        setIsPayoutConfirmed(true);
      };

      socket.current.on("payout_confirmation", handlePayout);
      return () => {
        socket.current?.off("payout_confirmation", handlePayout);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (!isPayoutConfirmed && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPayoutConfirmed, timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-full flex justify-center">
          <Image src="/success.svg" alt="Success" width={200} height={200} />
        </div>

        {isPayoutConfirmed ? (
          <ConfirmedMessage />
        ) : (
          <PendingMessage reference={reference} timeLeft={timeLeft} />
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
