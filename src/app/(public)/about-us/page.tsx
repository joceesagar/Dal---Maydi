import React from "react";
import { ProductHighlightSection } from "./sections/product-highlight";
import { WellnessEcosystemSection } from "./sections/wellness";
import { OurStorySection } from "./sections/our-story";
import { CultureValuesSection } from "./sections/culturevalues";

const AboutUsPage = () => {
  return (
    <main className="bg-white w-full">
      <div className="bg-white  w-full pt-16">
        <section className="w-full">
          <ProductHighlightSection />
        </section>

        <section className="w-full mt-8">
          <img
            className="w-full h-[430px] object-cover"
            alt="Image"
            src="/ourstory.png"
          />
        </section>

        <section className="w-full">
          <WellnessEcosystemSection />
        </section>

        <section className="w-full">
          <OurStorySection />
        </section>

        <section className="w-full relative">
          <CultureValuesSection />
        </section>
      </div>
    </main>
  );
};

export default AboutUsPage;
