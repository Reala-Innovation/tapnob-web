"use client";

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "@/components/layout/header";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Transaction } from "@/@types";
import { useToast } from "../providers/toast-provider";
import { BackButton } from "@/components/sections/backbutton";

const Page = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const transactions = await api.get("/transactions/lists");
        setAllTransactions(transactions.data.data.offRamps);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        toast.showToast({
          detail: "failed to fetch transactions",
          severity: "error",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredTransactions = allTransactions.filter(
    (tx) =>
      tx.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm) ||
      tx.settlementAmount.toString().includes(searchTerm)
  );

  return (
    <div className="p-4">
      <Header />
      <div className="mt-5 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-2xl font-semibold text-orange-600">
            Transactions
          </h1>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Search by reference or amount"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 focus-visible:ring-orange-600"
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <Table>
          <TableCaption>A list of recent off-ramp transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-orange-600">Reference</TableHead>
              <TableHead className="text-orange-600">Amount in ($)</TableHead>
              <TableHead className="text-orange-600">Amount in (₦)</TableHead>
              <TableHead className="text-orange-600">Currency</TableHead>
              <TableHead className="text-orange-600">Status</TableHead>
              <TableHead className="text-orange-600">Date</TableHead>
              <TableHead className="text-orange-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.reference}</TableCell>
                <TableCell>${tx.amount}</TableCell>
                <TableCell>{tx.settlementAmount}</TableCell>
                <TableCell>{tx.toCurrency.toUpperCase()}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setSelectedTransaction(tx)}
                    className="text-orange-600 hover:underline text-sm"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative border-t-4 border-orange-600">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-orange-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-orange-600">
              Transaction Details
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Ref:</strong> {selectedTransaction.reference}
              </p>
              <p>
                <strong>Status:</strong> {selectedTransaction.status}
              </p>
              <p>
                <strong>Amount (USD):</strong> ${selectedTransaction.amount}
              </p>
              <p>
                <strong>Sats Amount:</strong> {selectedTransaction.satAmount}{" "}
                sats
              </p>
              <p>
                <strong>BTC Amount:</strong> {selectedTransaction.btcAmount} BTC
              </p>
              <p>
                <strong>BTC Rate:</strong> $
                {selectedTransaction.exchangeRate?.btc?.usd ?? "N/A"}
              </p>
              <p>
                <strong>Exchange Rate:</strong> ₦
                {selectedTransaction.exchangeRate.rate.toLocaleString()}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedTransaction.createdAt).toLocaleString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
              {selectedTransaction.address && (
                <div>
                  <p className="font-semibold">Lightning Invoice:</p>
                  <code className="block text-xs break-words bg-gray-100 p-2 rounded">
                    {selectedTransaction.address}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
