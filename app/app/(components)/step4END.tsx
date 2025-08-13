"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSocket } from "@/app/hooks/useSocket";
import { useToast } from "@/app/providers/toast-provider";
import { handleContactClick } from "@/lib/utils";
import { PayoutConfirmation } from "@/@types";
import ConfirmedMessage from "./confirmedMessage";
import PendingMessage from "./pendingMessage";
import FailedMessage from "./failedMessage";
import { useReceipt } from "@/app/providers/receipt-provider";
import api from "@/app/api/axios";
import ExpiredMessage from "./expiredMessage";

type TransactionStatus =
  | "pending"
  | "confirmed"
  | "failed"
  | "expired"
  | "processing";

const End: React.FC<{ reference: string }> = ({ reference }) => {
  const router = useRouter();
  const socket = useSocket();
  const toast = useToast();
  const { setTransaction } = useReceipt();

  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>("pending");
  const [timeLeft, setTimeLeft] = useState(300);
  useEffect(() => {
    toast.showToast({
      severity: "info",
      detail: "Do not refresh this page!",
    });

    if (socket?.current) {
      const handlePayout = (data: PayoutConfirmation) => {
        console.log("payment received via socket");
        setTransaction(data);
        setTransactionStatus("confirmed");
      };

      const handlePayoutFailed = (data: PayoutConfirmation) => {
        console.log("payment failed via socket");
        setTransactionStatus("failed");
      };

      socket.current.on("payout_confirmation", handlePayout);
      socket.current.on("payout_failed", handlePayoutFailed);

      return () => {
        socket.current?.off("payout_confirmation", handlePayout);
        socket.current?.off("payout_failed", handlePayoutFailed);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (transactionStatus === "pending" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [transactionStatus, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && transactionStatus === "pending") {
      console.log("Timer ended — checking transaction via API...");

      api
        .get(`/transactions/reference/${reference}`)
        .then((res) => {
          if (res.status !== 200)
            throw new Error("Failed to fetch transaction");

          const status = res.data.data?.status;

          switch (status) {
            case "success":
              setTransaction(res.data.data);
              setTransactionStatus("confirmed");
              break;

            case "failed":
              setTransactionStatus("failed");
              break;

            case "expired":
              setTransactionStatus("expired");
              toast.showToast({
                severity: "warn",
                detail: "This payment link has expired.",
              });
              break;

            case "processing":
              setTransactionStatus("processing");
              toast.showToast({
                severity: "info",
                detail:
                  "Payment is still processing. Please check again later.",
              });
              break;

            default:
              toast.showToast({
                severity: "warn",
                detail: "Payment not confirmed yet. Please contact support.",
              });
              break;
          }
        })
        .catch((err) => {
          console.error(err);
          toast.showToast({
            severity: "error",
            detail: "Error checking payment status.",
          });
        });
    }
  }, [timeLeft, transactionStatus, reference, setTransaction, toast]);

  const getImageSrc = () => {
    switch (transactionStatus) {
      case "confirmed":
        return "/success.svg";
      case "failed":
        return "/error.svg";
      default:
        return "/success.svg";
    }
  };

  const renderContent = () => {
    switch (transactionStatus) {
      case "confirmed":
        return <ConfirmedMessage />;
      case "failed":
        return <FailedMessage reference={reference} />;
      case "expired":
        return <ExpiredMessage reference={reference} />;
      default:
        return <PendingMessage reference={reference} timeLeft={timeLeft} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-full flex justify-center">
          <Image
            src={getImageSrc()}
            alt={transactionStatus === "failed" ? "Error" : "Success"}
            width={200}
            height={200}
          />
        </div>

        {renderContent()}

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
