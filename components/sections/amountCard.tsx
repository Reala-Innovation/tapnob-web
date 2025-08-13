"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
const AmountForm: React.FC = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const formatNaira = (value: string): string => {
    const numeric = value.replace(/[^\d]/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatNaira(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawAmount = amount.replace(/,/g, "");
    if (!rawAmount || isNaN(Number(rawAmount))) {
      alert("Please enter a valid amount");

      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("amount", rawAmount);
    }

    router.push("/app");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[90%] lg:w-full max-w-md space-y-3"
    >
      <label
        htmlFor="amount"
        className="block text-sm font-medium text-gray-700"
      >
        Enter Amount to Pay(₦)
      </label>

      <div className="relative flex">
        <Input
          id="amount"
          name="amount"
          type="text"
          inputMode="numeric"
          placeholder="0.00"
          className="p-6 text-xl font-medium rounded-r-none border-r-0 flex-1 h-16"
          value={amount}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="h-16 p-6 rounded-l-none border-l-0 bg-orange-600 hover:bg-orange-800 hover:border-orange-800 hover:border-4 flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </form>
  );
};

export default AmountForm;
