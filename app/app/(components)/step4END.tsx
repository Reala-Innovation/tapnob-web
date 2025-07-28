"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleContactClick } from "@/lib/utils";
const End = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-6">

        <div className="w-full flex justify-center">
          <Image
            src="/success.svg" 
            alt="Success"
            width={200}
            height={200}
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Thank you for using <span className="text-orange-500">Tapnob</span>
        </h1>
        <p className="text-gray-600 text-sm">
          Your funds will arrive shortly. You will receive a confirmation once the
          transfer is complete.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-400 transition"
        >
          Return to Home
        </button>
          <p
                className="text-center text-blue-500 underline cursor-pointer text-sm"
                onClick={handleContactClick}
              >
                Contact Support
              </p>
      </div>
    </div>
  );
};

export default End;
