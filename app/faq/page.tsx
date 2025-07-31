import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { BackButton } from "@/components/sections/backbutton";
import FaqSection from "@/components/sections/faq-section";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <div className="px-4 md:px-8 lg:mt-10 mt-4 sticky">
        <BackButton />
      </div>
      <FaqSection />
      <Footer />
    </div>
  );
};

export default page;
