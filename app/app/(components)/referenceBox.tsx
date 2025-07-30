"use client";

import React from "react";
import { Copy } from "lucide-react";

const ReferenceBox: React.FC<{ reference: string }> = ({ reference }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(reference);
  };

  return (
    <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md border border-gray-200">
      <p className="mb-1">
        <strong>Reference:</strong>
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs break-all">{reference}</span>
        <button onClick={copyToClipboard} title="Copy to clipboard">
          <Copy size={16} className="text-gray-500 hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default ReferenceBox;
