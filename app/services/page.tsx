import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { BackButton } from "@/components/sections/backbutton";
import React from "react";

const page = () => {
  return (
    <div className="bg-white text-gray-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <BackButton/>
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
            Our Services
          </h1>
          <p className="text-lg leading-relaxed">
            At <span className="font-semibold text-orange-600">Tapnob</span>, we
            provide simple, secure, and reliable Bitcoin services tailored for
            the African market. Whether you’re buying, selling, or spending
            Bitcoin, we make it fast and effortless.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Bitcoin On-Ramp
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Easily purchase Bitcoin using your local currency.</li>
            <li>Instant and transparent transactions.</li>
            <li>Competitive rates with no hidden fees.</li>
            <li>Perfect for both beginners and experienced users.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Bitcoin Off-Ramp
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Convert your Bitcoin to local bank transfers in seconds.</li>
            <li>Direct, instant cash-outs to your bank account.</li>
            <li>No need for complicated exchanges or intermediaries.</li>
            <li>Safe, affordable, and hassle-free.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Everyday Spending
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Spend your Bitcoin seamlessly for daily needs.</li>
            <li>Pay bills, send money, or shop — all powered by Bitcoin.</li>
            <li>Tapnob makes Bitcoin as easy to use as cash.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Cross-Border Payments
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Send and receive money across Africa without high fees.</li>
            <li>Leverage Bitcoin for fast, low-cost international payments.</li>
            <li>
              Avoid the delays and limitations of traditional remittances.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Secure Transactions
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Your security is our priority.</li>
            <li>We use bank-level encryption and blockchain security.</li>
            <li>Reliable systems built to protect your funds at all times.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Why Choose Tapnob?
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              <strong>Speed:</strong> Instant processing for all transactions.
            </li>
            <li>
              <strong>Simplicity:</strong> No complicated exchanges or long
              waiting periods.
            </li>
            <li>
              <strong>Accessibility:</strong> Built for the African market with
              local currency support.
            </li>
          </ul>
        </section>

      </main>
      <Footer/>
    </div>
  );
};

export default page;
