"use client";
import { CheckIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const fadeInLeft = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as any
    }
  }
};

const fadeInRight = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as any
    }
  }
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any
    }
  }
};

export const CultureValuesSection = () => {
  const values = [
    {
      text: "Purity First – No additives, no fillers, only nature.",
      width: "w-[378px]",
    },
    {
      text: "Sustainability Always – Ethical sourcing & eco-friendly packaging.",
      width: "w-[551px]",
    },
    {
      text: "Wellness for All – Supporting mind, body, and spirit.",
      width: "w-[444px]",
    },
  ];

  return (
    <motion.section
      className="relative w-full px-12 mb-40 mt-22"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
    >
      <div className="relative h-[536px] w-full bg-[#F9FBFE]">
        <motion.h2
          className="absolute w-[485px] top-20 left-[150px] [font-family:'Poppins',Helvetica] font-medium text-[#183b56] text-5xl tracking-[0.20px] leading-[60px]"
          variants={fadeInLeft}
        >
          Our Culture &amp; Values
        </motion.h2>

        <motion.img
          className="w-[455px] h-[520px] top-[100px] left-[735px] absolute -bottom-5 object-cover"
          alt="Image"
          src="/culture.png"
          variants={fadeInRight}
          transition={{ delay: 0.3 }}
        />

        <motion.p
          className="absolute w-[455px] top-56 left-[150px] [font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-lg tracking-[0] leading-8"
          variants={fadeInLeft}
          transition={{ delay: 0.2 }}
        >
          We are guided by principles that reflect our love for nature and care
          for our customers:
        </motion.p>

        <motion.div
          className="absolute top-[351px] left-[150px] space-y-[21px]"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-[26px] h-[22px] overflow-hidden"
              variants={fadeInUp}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <CheckIcon className="w-4 h-4 mt-2 text-green-500" />
              <div
                className={`${value.width} [font-family:'Poppins',Helvetica] font-normal text-[#183b56] text-base tracking-[0] leading-[normal] -mt-px`}
              >
                {value.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};