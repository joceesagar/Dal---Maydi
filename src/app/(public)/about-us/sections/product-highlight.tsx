"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as any
    }
  }
};

export const ProductHighlightSection = () => {
  return (
    <motion.section
      className="flex flex-col w-full max-w-[860px] mx-auto items-center gap-[19px] px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      <motion.h2
        className="self-stretch [font-family:'Poppins',Helvetica] font-bold text-black text-[40px] text-center tracking-[0] leading-[36.9px]"
        variants={fadeInUp}
      >
        Our Story
      </motion.h2>

      <motion.p
        className="self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#92897e] text-base text-center tracking-[0] leading-[normal]"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        At Dal - Maydi Oil, We Believe That True Wellness Begins With Nature.
        Our Journey Started With A Passion To Bring The Purest Essential Oils
        Into Everyday Life, Promoting Balance, Relaxation, And Healing The
        Natural Way. From Ancient Traditions To Modern Aromatherapy, We
        Carefully Source And Craft Oils That Nurture Both Body And Mind. With A
        Commitment To Purity And Authenticity, We Ensure Every Bottle Is
        Ethically Sourced, Carefully Distilled, And Rigorously Tested To Deliver
        Nature&apos;s Best To Your Hands.
      </motion.p>
    </motion.section>
  );
};