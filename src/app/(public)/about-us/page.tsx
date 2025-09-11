'use client'
import React from "react";
import { ProductHighlightSection } from "./sections/product-highlight";
import { WellnessEcosystemSection } from "./sections/wellness";
import { OurStorySection } from "./sections/our-story";
import { CultureValuesSection } from "./sections/culturevalues";
import { motion } from "framer-motion";

const imageSlideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut" as any
    }
  }
};


const AboutUsPage = () => {
  return (
    <main className="bg-white w-full">
      <div className="bg-white  w-full pt-16">
        <section className="w-full">
          <ProductHighlightSection />
        </section>

        <motion.section
          className="w-full mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageSlideUp}
          transition={{ delay: 0.5 }}
        >
          <img
            className="w-full h-[430px] object-cover"
            alt="Image"
            src="/ourstory.png"
          />
        </motion.section>

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
