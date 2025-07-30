import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { BackButton } from "@/components/sections/backbutton";
import React from "react";

const page = () => {
  return (
    <div className="bg-white text-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <BackButton />
        <section className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-orange-600 mb-4">
            About Us
          </h1>
          <p className=" leading-relaxed">
            At <span className="font-semibold text-orange-600">Tapnob</span>, we
            simplify spending Bitcoin across Africa. Our platform bridges the
            gap between Bitcoin and instant bank transfers, enabling you to
            convert and use Bitcoin effortlessly. No complicated exchanges, no
            long wait times — just fast, secure, and affordable payments for
            your everyday needs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">
            Our Mission
          </h2>
          <p className=" leading-relaxed">
            Our mission is to make Bitcoin adoption easy, practical, and
            accessible for everyone, one seamless bank transaction at a time. We
            believe Bitcoin is the future of money, and we’re building the tools
            to make that future a reality in Africa.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">
            Who We Are
          </h2>
          <p className=" leading-relaxed">
            <span className="font-semibold">Tapnob</span> is a product of Reala
            Innovative Solutions Ltd, a forward-thinking technology company
            focused on building tools for the modern African economy. We combine
            deep expertise in blockchain technology with a passion for financial
            freedom.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              <strong>Bitcoin On-Ramp:</strong> Easily purchase Bitcoin with
              your local currency.
            </li>
            <li>
              <strong>Bitcoin Off-Ramp:</strong> Convert Bitcoin into instant
              bank transfers without hassle.
            </li>
            <li>
              <strong>Everyday Spending:</strong> Use Bitcoin for day-to-day
              expenses directly through Tapnob.
            </li>
            <li>
              <strong>Fast, Secure, and Affordable Payments:</strong> Enjoy
              seamless transactions designed with your convenience in mind.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-orange-600 mb-2">
            Why Tapnob?
          </h2>
          <p className=" leading-relaxed">
            We are more than just a service — we are creating a bridge to the
            future of digital money in Africa. Whether you are new to Bitcoin or
            an experienced user, Tapnob provides a simple and reliable platform
            to transact with confidence.
          </p>
        </section>
        <Footer/>
      </main>
    </div>
  );
};

export default page;
