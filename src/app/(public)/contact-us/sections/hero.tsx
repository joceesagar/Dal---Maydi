'use client';
import { motion } from "framer-motion";
import { socialIcons } from "@/app/(public)/landing-page/sections/site-footer";
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as any
    }
  }
};

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

export const HeroSection = () => {
  return (
    <motion.section
      className="flex flex-col w-full items-center justify-between relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.img
        className="flex-shrink-0"
        alt="Social media"
        src="/ourstory.png"
        variants={imageSlideUp}
      />

      <div className="flex flex-col items-start gap-7 flex-1 w-full pt-16">
        <motion.div
          className="[font-family:'Poppins',Helvetica] font-normal text-black text-[20.8px] tracking-[0] leading-[31.2px]  px-32"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          Get Started
        </motion.div>

        <div className="flex  px-32 gap-4">
          <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
            <h1 className="[font-family:'Poppins',Helvetica] font-bold text-black text-[78px] tracking-[0] leading-[86.7px]">
              Get in touch with us. We&#39;re here to assist you.
            </h1>
          </motion.div>
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
            transition={{ delay: 0.5 }}
          >
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.width} h-10   overflow-hidden flex items-center justify-center border-border/45 border-2 rounded-full cursor-pointer hover:bg-[#ffffff2a] transition-colors`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.1 * index }}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="currentColor"
                  style={{ color: "#111111" }}
                >
                  <title>{social.name}</title>
                  <path d={social.icon.path} />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};