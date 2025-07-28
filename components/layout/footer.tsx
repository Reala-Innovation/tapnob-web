"use client";

import React from "react";
import { Twitter, SendHorizonal as Telegram ,Mail} from "lucide-react";

const Footer: React.FC<{ white?: boolean }> = ({ white }) => {
  const year = new Date().getFullYear();
  const textColor = white ? "text-white" : "text-black";

  return (
    <footer className={`w-full bg-white py-12 ${textColor}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        {/* Top */}
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-2xl font-bold text-orange-600">Tapnob</h1>
          <p className="text-sm font-medium">
            Spend Bitcoin. Keep Your Bitcoin.
          </p>
          <div className="flex gap-5 mt-2">
            <a
              href="https://t.me/@mubitech23"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition"
            >
              <Telegram size={24} />
            </a>
            <a
              href="https://twitter.com/tap_nob"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition"
            >
              <Twitter size={24} />
            </a>
            <a
              href="mailto:gettapnob@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Middle */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-2 text-orange-600">Contact</h4>
            <p>
              Support:{" "}
              <a href="mailto:gettapnob@gmail.com" className="underline">
                gettapnob@gmail.com
              </a>
            </p>
            <p>
              Business:{" "}
              <a href="mailto:partners@tapnob.com" className="underline">
                gettapnob@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-orange-600">Legal</h4>
            <p>Terms • Privacy • Disclosures • AML</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-orange-600">Community</h4>
            <p>X/Twitter • GitHub • Newsletter</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-orange-600">Initiatives</h4>
            <p>Freedom Fund • Grants • Bounties</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs border-t border-gray-200 pt-6">
          <p>© {year} Tapnob. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
