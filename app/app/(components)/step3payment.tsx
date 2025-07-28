"use client";

import React, { useEffect, useRef, useState } from "react";
import api from "@/app/api/axios";
import { Quote, QuoteResponse } from "@/@types";
import { Copy, Loader2, Clock } from "lucide-react";
import QRCode from "./sections/renderQRCode";
import { handleContactClick } from "@/lib/utils";

interface Props {
  quoteData: QuoteResponse;
  onNext: () => void;
  onPrev: () => void;
}

const Step3 = ({ quoteData, onNext, onPrev }: Props) => {
  const [invoiceData, setInvoiceData] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const expiryRef = useRef<HTMLSpanElement>(null);

  const copyToClipboard = () => {
    if (invoiceData?.address) {
      navigator.clipboard.writeText(invoiceData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.post("/transactions/finitiate-payout", {
          quoteId: quoteData.quoteId,
          transactionId: quoteData.id,
        });
        setInvoiceData(res.data.data);
        updateExpiry(res.data.data.expiryTimeStamp);
      } catch (err) {
        setError("Failed to initiate payout");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [quoteData]);

  const updateExpiry = (timestamp: number) => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = timestamp - now;

      if (diff <= 0) {
        if (expiryRef.current) expiryRef.current.innerText = "Expired";
        return;
      }

      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      if (expiryRef.current)
        expiryRef.current.innerText = `${minutes}m ${seconds}s`;
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={onPrev}
          className="mt-4 underline text-orange-600 hover:text-orange-500 text-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6 text-sm text-gray-800">
      <div className="mx-auto max-w-[260px] rounded-xl p-3 bg-white shadow-md">
        <QRCode value={invoiceData?.address as string} size={256} />
      </div>

      <div className="text-center">
        <p className="font-semibold text-base">
          Send: {invoiceData?.satAmount?.toLocaleString()} SAT
        </p>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
        <strong className="text-gray-600">To:</strong>
        <input
          className="bg-transparent text-xs w-full focus:outline-none"
          value={invoiceData?.address as string}
          readOnly
        />
        <button onClick={copyToClipboard}>
          <Copy className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      {copied && <p className="text-green-600 text-xs">Copied!</p>}

      <div className="space-y-1">
        <p>
          <strong>Exchange Rate:</strong> ₦
          {invoiceData?.exchangeRate.toLocaleString()} / USD
        </p>
        <p>
          <strong>Amount to receive:</strong> ₦
          {invoiceData?.settlementAmount.toLocaleString()}
        </p>
        <p>
          <strong>Payment ETA:</strong> {invoiceData?.paymentETA}
        </p>
        <p className="flex items-center gap-2">
          <strong>Expires In:</strong>
          <Clock className="w-4 h-4 text-yellow-500" />
          <span
            ref={expiryRef}
            className="text-orange-500 font-medium inline-block min-w-[60px] text-center"
          >
            Loading...
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <button
          onClick={onNext}
          className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 font-medium transition"
        >
          I&apos;VE PAID
        </button>
        <button
          onClick={onPrev}
          className="w-full py-2 border border-orange-500 text-orange-600 rounded-xl font-medium hover:bg-orange-50"
        >
          Go Back
        </button>
      </div>

      <p
        className="text-center text-blue-500 underline cursor-pointer text-sm"
        onClick={handleContactClick}
      >
        Contact Support
      </p>
    </div>
  );
};

export default Step3;
