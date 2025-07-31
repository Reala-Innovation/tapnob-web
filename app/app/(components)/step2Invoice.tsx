"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/api/axios";
import { FormData, QuoteResponse } from "@/@types";
import { Loader2 } from "lucide-react";
import { useToast } from "@/app/providers/toast-provider";
interface Props {
  data: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: () => void;
  onPrev: () => void;
  quote: QuoteResponse | null;
  setQuote: React.Dispatch<React.SetStateAction<QuoteResponse | null>>;
}

const Step2 = ({ data, onNext, onPrev, quote, setQuote }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();
console.log(data)
  //this is written by solomon not ai
  //so we set amount, in localstorage so we can autoremmeber user amount from landing,
  //in step 1 we call it savedAmount, we want to clear it in this step
  if (window) {
    localStorage.removeItem("amount");
  }
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const payload = {
          bankCode: data.bank,
          accountNumber: data.accountNumber,
          chain: data.chain.toLowerCase(),
          settlementAmount: Number(data.amount),
          email: data.email || undefined,
        };

        const res = await api.post("/transactions/initiate-payout", payload);

        setQuote(res.data.data);
      } catch (err) {
        toast.showToast({
          severity: "error",
          life: 10000,
          detail: "Failed to generate invoice",
        });
        setError("Failed to generate invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

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
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">
        Convert Bitcoin to Naira
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <p>
          <strong>Amount:</strong> ${quote?.amount.toFixed(2)}
        </p>
        <p>
          <strong>SAT Amount:</strong> {quote?.satAmount} SAT
        </p>
        <p>
          <strong>BTC Amount:</strong> {quote?.btcAmount.toFixed(8)} BTC
        </p>
        <p>
          <strong>Exchange Rate:</strong> $1 ={" "}
          {quote?.exchangeRate.toLocaleString()} NGN
        </p>
        <p>
          <strong>You&apos;ll Receive:</strong> ₦
          {quote?.settlementAmount.toLocaleString()}
        </p>

        <div className="pt-3">
          <h3 className="font-medium">Bank Details:</h3>
          <p>
            <strong>Name:</strong> {quote?.destination.accountName}
          </p>
          <p>
            <strong>Account:</strong> {quote?.destination.accountNumber}
          </p>
          <p>
            <strong>Bank:</strong> {quote?.destination.bankName}
          </p>
        </div>

        <p className="text-sm text-orange-600 mt-3">
          {quote?.expiresInText || "This invoice expires in 5 minutes"}
        </p>
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 py-2 rounded-xl border border-orange-500 text-orange-600 text-sm font-medium hover:bg-orange-50 transition"
        >
          Go Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-2 rounded-xl bg-orange-600 text-white text-sm font-medium hover:scale-[1.02] transition"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default Step2;
