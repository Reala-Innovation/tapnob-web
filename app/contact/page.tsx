import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { BackButton } from "@/components/sections/backbutton";
import React from "react";

const page = () => {
  return (
    <div className="bg-white text-gray-900">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <BackButton />
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
            Contact Us
          </h1>
          <p className="text-lg leading-relaxed">
            We’d love to hear from you! Whether you have questions about Tapnob,
            need support, or want to partner with us — our team is here to help.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Customer Support
          </h2>
          <div className="text-lg space-y-3">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:gettapnob@gmail.com"
                className="text-orange-600 underline"
              >
                gettapnob@gmail.com
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong>{" "}
              <a
                href="https://wa.me/2347063702228"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline"
              >
                +234 706 370 2228
              </a>
              {", "}
              <a
                href="https://wa.me/2348037287834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline"
              >
                +234 803 728 7834
              </a>
            </p>
            <p>
              <strong>Telegram:</strong>{" "}
              <a
                href="https://t.me/mubitech23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline"
              >
                @mubitech23
              </a>
            </p>
            <p>
              <strong>Availability:</strong> 24/7
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
