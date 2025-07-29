"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Menu, X, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const isOnApp = pathname === "/app";
  console.log(pathname, isOnApp);

  return (
    <>
    <div className="w-full">
      <div className="inline-flex absolute top-10 left-[40%] items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full border border-orange-200 mx-auto w-fit">
        <Smartphone className="w-3 h-3" />
        <span>in Beta</span>
      </div>
</div>
      <header className="sticky top-5 z-50 mx-auto w-[95%] max-w-6xl md:rounded-full bg-transparent md:bg-white/80 md:shadow-lg md:backdrop-blur-md border-none md:border border-white/30 px-4">
        <div className="flex items-center justify-between py-3">
          <div
            className="flex items-center gap-3"
            onClick={() => router.push("/")}
          >
            <Image
              src="/tapnob-logo.svg"
              alt="tapnob-logo"
              height={60}
              width={60}
              className="cursor-pointer"
            />
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#features" className="hover:underline">
              Service
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
            <a href="#faqs" className="hover:underline">
              FAQs
            </a>
            <Button
              onClick={() => router.push(isOnApp ? "/transactions" : "/app")}
              className="bg-orange-600 text-white rounded-xl"
            >
              {!isOnApp ? "Get Started" : "View transactions"}
            </Button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#efefee] flex mb-10 flex-col gap-4 px-4 pb-4 text-sm font-medium">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#features" className="hover:underline">
              Service
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
            <a href="#faqs" className="hover:underline">
              FAQs
            </a>
            <Button
              onClick={() => router.push(isOnApp ? "/transactions" : "/app")}
              className="bg-orange-600 text-white rounded-xl"
            >
              {!isOnApp ? "Get Started" : "View transactions"}
            </Button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
