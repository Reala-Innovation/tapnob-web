"use client";

import React, { createContext, useContext, useState } from "react";
import { PayoutConfirmation, Transaction } from "@/@types";

interface ReceiptContextType {
  transaction: PayoutConfirmation| null;
  setTransaction: (tx: PayoutConfirmation) => void;
}

const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export const ReceiptProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transaction, setTransaction] = useState<PayoutConfirmation | null>(null);

  return (
    <ReceiptContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context)
    throw new Error("useReceipt must be used within ReceiptProvider");
  return context;
};
