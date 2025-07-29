"use client";

import React, { useState } from "react";
import Header from "@/components/layout/header";
import Step1 from "./(components)/step1form";
import Step2 from "./(components)/step2Invoice";
import VisualStepper from "./(components)/sections/visual-indicator";
import { QuoteResponse } from "@/@types";
import Step3 from "./(components)/step3payment";
import End from "./(components)/step4END";
const Page = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    country: "NIGERIA",
    chain: "LIGHTNING",
    bank: "",
    accountNumber: "",
    amount: "",
    email: "",
    accountName: "",
  });
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSetAccountName = (name: string) => {
    setFormData((prev) => ({ ...prev, accountName: name }));
  };

  const goToNextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length));
  const goToPrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { title: "Fill in details" },
    { title: "Create Invoice" },
    { title: "Proceed to Pay" },
    { title: "Finish" },
  ];

  return (
    <div>
      <Header />

      <section className="min-h-screen flex justify-center px-4 py-10">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-10">
          <VisualStepper currentStep={step} steps={steps} />

          <div className="flex-1 w-full max-w-lg mx-auto">
            {step === 1 && (
              <Step1
                data={formData}
                onChange={handleChange}
                onSetAccountName={handleSetAccountName}
                onNext={goToNextStep}
              />
            )}
            {step === 2 && (
              <Step2
                data={formData}
                onChange={handleChange}
                onNext={goToNextStep}
                onPrev={goToPrevStep}
                quote={quote}
                setQuote={setQuote}
              />
            )}

            {step === 3 && (
              <Step3
                quoteData={quote as QuoteResponse}
                onNext={goToNextStep}
                onPrev={goToPrevStep}
              />
            )}

            {step === 4 && <End transactionId={quote?.id || "trx-xxx-xxx"} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
