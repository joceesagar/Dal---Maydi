"use client";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as any
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut" as any
    }
  }
};

export const ProductDescriptionSection = () => {
  const features = [
    "100% Pure & Natural Essential Oils",
    "Steam-Distilled & Cold-Pressed for Maximum potency",
    "No Synthetic Additives, Chemicals",
  ];

  return (
    <motion.section
      className="w-full py-12 md:py-[90px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 bg-[#F9FBFE]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.div
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
            variants={itemVariants}
          >
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-2xl md:text-3xl lg:text-[40px] tracking-[0.20px] leading-tight md:leading-[52px]">
              The Power
              <br />
              of Nature&apos;s Essence
            </h2>

            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-sm md:text-base tracking-[0] leading-6 md:leading-7 max-w-xl">
              Inspired by ancient wellness traditions and the purity of
              botanicals, our essential oils are crafted to capture the true
              essence of nature. Each drop is filled with powerful natural
              extracts, carefully distilled and blended to support balance,
              relaxation, and holistic well-being.
              <br />
              <br />A calming touch for the mind, body, and soul. Restoring
              harmony with every breath.
            </p>

            <div className="space-y-3 md:space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <CheckIcon className="size-3 text-green-500" />
                  </div>
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-black text-sm md:text-base tracking-[0] leading-6 md:leading-7">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative h-[300px] md:h-[400px] lg:h-[490px] order-1 lg:order-2"
            variants={imageVariants}
          >
            <div className="relative w-full h-full">
              <motion.img
                className="absolute w-[250px] md:w-[300px] lg:w-[400px] z-50 h-[200px] md:h-[300px] lg:h-[425px] top-0 left-0 border-solid object-cover"
                alt="Essential oil product"
                src="/product.png"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              <motion.img
                className="absolute w-[180px] md:w-[220px] lg:w-[290px] h-[150px] md:h-[250px] lg:h-[370px] top-[80px] md:top-[100px] lg:top-[120px] left-[150px] md:left-[200px] lg:left-[300px] object-cover"
                alt="Essential oil product detail"
                src="/product.png"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};