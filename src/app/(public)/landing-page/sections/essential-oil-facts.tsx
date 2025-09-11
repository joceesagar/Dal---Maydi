"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const OilIconShape = ({ index }: { index: number }) => {
  const wrapperClass =
    "relative w-[66px] h-[66px] -top-px -left-px bg-[#f2f6fd] rounded-2xl flex items-center justify-center";
  const color = "#36b37e";

  switch (index) {
    case 0:
      return (
        <div className={wrapperClass}>
          <div
            className="w-8 h-8"
            style={{ background: color, borderRadius: "9999px" }}
          />
        </div>
      );
    case 1:
      return (
        <div className={wrapperClass}>
          <div
            className="w-8 h-8"
            style={{ background: color, borderRadius: "0.375rem" }}
          />
        </div>
      );
    case 2:
      return (
        <div className={wrapperClass}>
          <div
            className="w-8 h-8"
            style={{
              background: color,
              rotate: "90deg",
              clipPath:
                "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
            }}
          />
        </div>
      );
    case 3:
      return (
        <div className={wrapperClass}>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "16px solid transparent",
              borderRight: "16px solid transparent",
              borderBottom: `28px solid ${color}`,
            }}
          />
        </div>
      );
    default:
      return null;
  }
};

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

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const EssentialOilFactsSection = () => {
  const essentialOils = [
    {
      title: "Lavender Oil",
      description:
        "Known for its calming aroma, it helps reduce stress, promote relaxation, and improve sleep quality.",
    },
    {
      title: "Lemon Oil",
      description:
        "A refreshing oil that uplifts mood, boosts energy, and purifies the air with its citrusy scent.",
    },
    {
      title: "Peppermint Oil",
      description:
        "Revitalizing and cooling, perfect for easing headaches, improving focus, and soothing sore muscles.",
    },
    {
      title: "Tea Tree Oil",
      description:
        "A natural cleanser with antibacterial properties, ideal for skin care and supporting overall immunity.",
    },
  ];

  return (
    <motion.section
      className="w-full min-h-[60vh] mb-16 md:mb-32 py-8 md:py-16 bg-white px-4 sm:px-6 md:px-8 lg:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-semibold text-[#183b56] text-2xl md:text-3xl lg:text-[40px] text-center tracking-[0.20px] leading-tight md:leading-[52px] mb-4"
          variants={itemVariants}
        >
          Our Essential Oil Facts
        </motion.h2>

        <motion.p
          className="max-w-[790px] mx-auto [font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-base md:text-lg text-center tracking-[0] leading-6 md:leading-8 mb-12 md:mb-16"
          variants={itemVariants}
        >
          Rooted in nature&apos;s purity and inspired by holistic wellness, our
          essential oils are carefully sourced and distilled to preserve their
          natural benefits. Each ingredient is chosen for its therapeutic
          properties, ensuring a pure and authentic experience.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 xl:gap-22 justify-items-center"
          variants={staggerVariants}
        >
          {essentialOils.map((oil, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="border-none shadow-none bg-transparent w-full max-w-[250px] hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="flex flex-col items-center text-center p-0">
                  <motion.div
                    className="mb-6 md:mb-8 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <OilIconShape index={index} />
                  </motion.div>
                  <h3 className="font-medium text-[#183b56] text-lg md:text-xl text-center tracking-[0.20px] leading-6 mb-3 md:mb-4">
                    {oil.title}
                  </h3>
                  <p className="font-normal text-[#5a7184] text-sm text-center tracking-[0] leading-6 px-2">
                    {oil.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};