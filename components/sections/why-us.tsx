"use client";

import React from "react";

const reasons = [
  {
    title: "High remittance fees that drain income.",
    description:
      "Traditional money transfers often come with high fees that reduce the amount families receive. Tapnob provides a low-cost alternative using Bitcoin, keeping more money in the hands of your loved ones.",
  },
  {
    title: "Unstable exchange rates and fast devaluation",
    description:
      "In many regions, local currencies lose value quickly. Tapnob helps users hold and convert Bitcoin into spendable value, providing protection from currency devaluation.",
  },
  {
    title: "Limited access to reliable cross-border payments",
    description:
      "Banking systems aren't always accessible or efficient for international transactions. Tapnob bridges the gap with seamless cross-border Bitcoin transfers that are reliable and secure.",
  },
  {
    title: "Delays or friction when receiving funds from abroad",
    description:
      "Waiting days to receive money can disrupt everyday life. Tapnob enables near-instant Bitcoin-based payments, giving recipients faster access to their funds.",
  },
];

const WhyUs = () => {
  return (
    <div className="w-full bg-white py-16">
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-orange-600 mb-12 text-center">
          Why Us?
        </h2>
        <div className="space-y-10">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src="/question.svg"
                alt="Reason Icon"
                className="w-6 h-6 mt-1 flex-shrink-0"
              />
              <div>
                <h3 className="text-black font-semibold text-lg mb-1">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
