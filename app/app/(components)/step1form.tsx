import api from "@/app/api/axios";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Bank, FormData } from "@/@types";
import { useToast } from "@/app/providers/toast-provider";
interface Props {
  data: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSetAccountName: (name: string) => void;
  onNext: () => void;
}
const Step1 = ({ data, onChange, onSetAccountName, onNext }: Props) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const toast = useToast();
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [resolving, setResolving] = useState(false);
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  console.log(resolvedAccountName);
  const [isAccountResolved, setIsAccountResolved] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await api.get("/transactions/bank-lists");
        setBanks(res.data?.data || []);
      } catch (err) {
        toast.showToast({
          severity: "error",
          detail: "Unable to load banks. Please refresh.",
          life: 3000,
        });
      } finally {
        setLoadingBanks(false);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    const shouldResolve = data.bank && data.accountNumber.length === 10;

    if (shouldResolve) {
      resolveAccount();
    } else {
      setResolvedAccountName("");
      setIsAccountResolved(false);
      onSetAccountName("");
    }
  }, [data.bank, data.accountNumber]);

  const resolveAccount = async () => {
    setResolving(true);
    setResolvedAccountName("");
    setIsAccountResolved(false);

    try {
      const res = await api.post("/transactions/resolve-account-number", {
        accountNumber: data.accountNumber,
        bankCode: data.bank,
      });

      const accountName = res.data?.data?.accountName;
      if (!accountName) throw new Error("Account name could not be resolved.");

      setResolvedAccountName(accountName);
      setIsAccountResolved(true);
      onSetAccountName(accountName);
    } catch (err) {
      toast.showToast({
        severity: "error",
        detail: "Account lookup failed,confrim details or try again later",
        life: 3000,
      });
    } finally {
      setResolving(false);
    }
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    }
  };

  const isAmountValid =
    Number(data.amount) >= 1000 && Number(data.amount) <= 250000;

  let savedAmount: null | number = null;
  if (typeof window !== "undefined")
    savedAmount = localStorage.getItem("amount") as number | null;
  if (savedAmount) {
    data.amount = savedAmount as unknown as string;
  }
  const isFormValid =
    data.bank &&
    data.accountNumber.length === 10 &&
    isAmountValid &&
    isAccountResolved;

  return (
    <div className="space-y-6 ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500">Choose Country</label>
          <select
            name="country"
            value={data.country}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="NIGERIA">Nigeria</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">Chain</label>
          <select
            name="chain"
            value={data.chain}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="LIGHTNING">Lightning</option>
            <option value="ONCHAIN">Onchain</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500 flex items-center gap-2">
          Select Bank{" "}
          {loadingBanks && (
            <Loader2 className="animate-spin w-4 h-4 text-orange-500" />
          )}
        </label>
        <select
          name="bank"
          value={data.bank}
          onChange={onChange}
          disabled={loadingBanks}
          className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select a bank</option>
          {banks.map((bank) => (
            <option key={bank.bankCode} value={bank.bankCode}>
              {bank.bankName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-500">Account Number</label>
        <Input
          name="accountNumber"
          maxLength={10}
          value={data.accountNumber}
          onChange={onChange}
          placeholder="1234567890"
          className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {resolving && (
          <p className="text-xs text-gray-500 mt-1">Resolving account...</p>
        )}
      </div>

      {data.accountName && (
        <div>
          <label className="text-sm text-gray-500">Account Name</label>
          <Input
            value={data.accountName}
            disabled
            className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-base text-gray-700"
          />
        </div>
      )}

      <div>
        <label className="text-sm text-gray-500">
          Amount (₦1,000 - ₦250,000)
        </label>
        <Input
          type="number"
          name="amount"
          value={data.amount}
          onChange={onChange}
          placeholder="Enter amount"
          className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">
          Email Address (Optional)
        </label>
        <Input
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="e.g john@email.com"
          className="mt-1 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!isFormValid}
        className={`w-full py-2 mt-4 rounded-xl bg-orange-600 text-white text-sm font-medium hover:scale-[1.02] transition ${
          !isFormValid && "opacity-50 bg-slate-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
