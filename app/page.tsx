import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import WhatIsArchtyp from "@/components/sections/WhatIsArchtyp";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import ForManufacturers from "@/components/sections/ForManufacturers";
import Pricing from "@/components/sections/Pricing";
import PartnerWithUs from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import DataStream from "@/components/animations/DataStream";

export default function Home() {
  return (
    <main className="relative bg-archtyp-bg-primary text-archtyp-text-primary grid-bg">
      {/* Global rain effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <DataStream />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <WhatIsArchtyp />
        <Solution />
        <HowItWorks />
        <ForManufacturers />
        <Pricing />
        <PartnerWithUs />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
