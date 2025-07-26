"use client";

import React, { useState } from "react";
import { faqs } from "@/app/data/faqs"; 

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white py-16">
      <section className="max-w-3xl w-full mx-auto px-6 bg-white rounded-xl">
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className=" pb-4">
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-orange-600 font-medium text-lg">
                  {faq.question}
                </span>
                <span className="text-orange-600 text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-black text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
