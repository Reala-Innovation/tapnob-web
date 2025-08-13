import api from "@/app/api/axios";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Bank, FormData } from "@/@types";
import { useToast } from "@/app/providers/toast-provider";
import Select, { SingleValue } from "react-select";
type PayoutLimit = {
  high: number;
  low: number;
  loading: boolean;
};
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
  const [amount, setAmount] = useState(data.amount || "");
  const [resolving, setResolving] = useState(false);
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const [payoutLimit, setPayoutLimit] = useState<PayoutLimit>({
    high: 100000,
    low: 1000,
    loading: true,
  });
  console.log('Hi there',resolvedAccountName);
  const [isAccountResolved, setIsAccountResolved] = useState(false);

  const options = banks.map((bank) => ({
    value: bank.bankCode,
    label: bank.bankName,
  }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("amount");
      if (saved) {
        setAmount(saved);
        onChange({
          target: {
            name: "amount",
            value: saved,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, []);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    onChange(e);
    localStorage.setItem("amount", value);
  };

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
    const fetchWithdrawalLimit = async () => {
      try {
        setPayoutLimit({ ...payoutLimit, loading: true });
        const res = await api.get("/transactions/get-payout-limit");
        const { lowerLimit, higherLimit } = res.data.data;
        const low = isNaN(Number(lowerLimit)) ? 0 : Number(lowerLimit);
        const high = isNaN(Number(higherLimit)) ? 0 : Number(higherLimit);
        setPayoutLimit({ low, high, loading: false });
      } catch (ex) {
        console.log("Failed to load limit, defaulting to original values");
        setPayoutLimit({ low: 0, high: 0, loading: false });
      } finally {
        setPayoutLimit({ ...payoutLimit, loading: false });
      }
    };

    fetchBanks();
    fetchWithdrawalLimit();
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
    Number(data.amount) >= payoutLimit.low &&
    Number(data.amount) <= payoutLimit.high;

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
        <Select
          name="bank"
          options={options}
          value={options.find((option) => option.value === data.bank)}
          onChange={(
            selectedOption: SingleValue<{ value: string; label: string }>
          ) => {
            const syntheticEvent = {
              target: {
                name: "bank",
                value: selectedOption?.value ?? "",
                type: "select-one",
              } as HTMLSelectElement,
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange(syntheticEvent);
          }}
          isDisabled={loadingBanks}
          className="mt-1 w-full text-base focus:border-orange-600"
          classNamePrefix="react-select"
        />
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
          {!payoutLimit.loading ? (
            `Amount (₦${payoutLimit.low.toLocaleString()}-₦
          ${payoutLimit.high.toLocaleString()})`
          ) : (
            <Loader2 className="animate-spin w-4 h-4 text-orange-500" />
          )}
        </label>
        <Input
          type="number"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
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
