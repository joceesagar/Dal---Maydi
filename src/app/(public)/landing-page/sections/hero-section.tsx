"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  },
} as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
} as const;

const HeroSection = () => {
  return (
    <motion.div
      className="w-full relative min-h-[500px] md:h-[719px] bg-[#FEFFEF] overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.img
        className="absolute w-full md:w-[665px] h-full md:h-[719px] top-0 right-0 object-cover object-left md:object-center"
        alt="Element"
        src="/landing.png"
        variants={imageVariants}
      />
      <div className="flex w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col justify-start relative z-10">
        <motion.div
          className="pt-16 md:pt-32 mb-4 md:mb-8 font-semibold text-[#b87f14] text-sm md:text-base tracking-[0] leading-[25.2px] whitespace-nowrap"
          variants={itemVariants}
        >
          Pure &amp; Natural
        </motion.div>

        <motion.div
          className="max-w-full md:max-w-3xl mb-6 md:mb-8 [font-family:'Poppins',Helvetica] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] tracking-[0] leading-tight md:leading-[64px]"
          variants={itemVariants}
        >
          <h1 className="text-transparent">
            <span className="text-black">Premium </span>
            <span className="text-[#b87f14]">
              Essential Oils{" "}
            </span>
            <span className="text-black">
              For Your Wellness
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="w-full max-w-md md:max-w-[437px] mb-6 md:mb-8 [font-family:'Poppins',Helvetica] font-normal text-[#92897e] text-sm md:text-base tracking-[0] leading-normal"
          variants={itemVariants}
        >
          Discover The Healing Power Of 100% Pure, Therapeutic Grade Essential
          Oils Sourced From The Finest Organic Farms Around The World.
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4"
          variants={itemVariants}
        >
          <Button className="bg-[#bb8116] hover:bg-[#a0701a] rounded-3xl px-6 md:px-[46px] py-2 md:py-3 h-auto w-full sm:w-auto">
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#fbfbfb] text-lg md:text-xl tracking-[0] leading-[normal]">
              Buy Now
            </span>
          </Button>

          <Button
            variant="outline"
            className="group rounded-3xl border-2 border-[#b87f14] px-6 md:px-[46px] py-2 md:py-3 h-auto hover:bg-[#b87f14] hover:text-white w-full sm:w-auto"
          >
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#b87f14] text-lg md:text-xl tracking-[0] leading-[normal] group-hover:text-white">
              Learn More
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;