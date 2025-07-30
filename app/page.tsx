import Hero from "@/components/sections/hero";
import Header from "@/components/layout/header";
import TapnobAdvantage from "@/components/sections/tapnob-advantage";
import FaqSection from "@/components/sections/faq-section";
import WhyUs from "@/components/sections/why-us";
import HowItWorks from "@/components/sections/how-it-works";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="bg-[#efefee] scroll-smooth">
      <Header />
      <Hero />
      <TapnobAdvantage />
      <HowItWorks />
      <FaqSection />
      <WhyUs />
      <Footer />
    </div>
  );
}
