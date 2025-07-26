"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
}

const QRCode: React.FC<QRCodeProps> = ({ value, size = 200 }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeSVG value={value} size={size} />
    </div>
  );
};

export default QRCode;
