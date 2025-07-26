"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
const steps = [
  {
    step: "1",
    title: "Enter Amount & Recipient",
    description:
      "Choose the payout currency and enter the bank account or mobile money details.",
  },
  {
    step: "2",
    title: "Review the Rate",
    description:
      "We show the exact amount of Bitcoin required and the amount that will land in local currency. No hidden charges.",
  },
  {
    step: "3",
    title: "Send Bitcoin",
    description:
      "Send the displayed BTC amount to the Tapnob address (or scan QR). We lock the rate for a short window.",
  },
  {
    step: "4",
    title: "Instant Payout",
    description:
      "As soon as the Bitcoin payment confirms (usually seconds with Lightning or soon after with on-chain fast-confirm settings), Tapnob triggers a payout to the recipient’s bank.*",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};




const customEase: Easing = [0.25, 0.1, 0.25, 1];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: customEase,
    },
  },
};


const HowItWorks = () => {
  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-12">
          How it works?
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex items-start gap-4 text-left"
            >
              <div className="text-orange-600 font-bold text-3xl w-10">
                {step.step}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-orange-600">
                  {step.title}
                </h3>
                <p className="text-black text-sm mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
