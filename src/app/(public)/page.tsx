import React from "react";
import HeroSection from "./landing-page/sections/hero-section";
import { EssentialOilFactsSection } from "./landing-page/sections/essential-oil-facts";
import { FAQSection } from "./landing-page/sections/calltoaction";
import { CustomerTestimonialsSection } from "./landing-page/sections/customer-testimonial";
import { LatestProductsSection } from "./landing-page/sections/latest-product";
import { ProductDescriptionSection } from "./landing-page/sections/product-description";

const Landing = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <HeroSection />
      <EssentialOilFactsSection />
      <ProductDescriptionSection />
      <LatestProductsSection />
      <CustomerTestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Landing;
