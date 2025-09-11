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

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as any
    }
  }
};

export const OurStorySection = () => {
  return (
    <motion.section
      className="w-full overflow-hidden"
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
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 py-16 px-4 lg:px-8">
        <div className="flex-1 relative min-h-[575px]">
          <motion.img
            className="w-[415px] h-[440px] absolute top-0 z-50 left-0 object-cover"
            alt="Image"
            src="/aboutstory1.png"
            variants={scaleIn}
          />
          <motion.img
            className="w-[341px] h-[450px] absolute top-[125px] left-[278px] object-cover"
            alt="Image"
            src="/aboutstory2.png"
            variants={scaleIn}
            transition={{ delay: 0.3 }}
          />
        </div>

        <motion.div
          className="flex-1 flex flex-col gap-6 pt-16"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-5xl tracking-[0.20px] leading-[60px]">
            Building a Natural Wellness Ecosystem
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-lg tracking-[0] leading-8 max-w-[484px]">
            Our oils are more than just scents – they&apos;re part of a holistic
            lifestyle. Whether you&apos;re seeking calm, energy, focus, or skin
            support, our wide range of blends and single oils help create
            balance in your daily rituals. We partner with sustainable farms and
            use eco-friendly practices to ensure our products are kind to you
            and the planet.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};