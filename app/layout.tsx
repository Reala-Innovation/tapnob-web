import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import ToastContextProvider from "./providers/toast-provider";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tapnob - Send Bitcoin and Instantly Cash Out to Bank",
  description:
    "Tapnob offers off-ramp and on-ramp services across Bitcoin and USDT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <PrimeReactProvider>
          <ToastContextProvider>{children}</ToastContextProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
