"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any
    }
  }
};

const accordionVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as any
    }
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as any
    }
  }
};

export const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>("item-1");

  const faqData = [
    {
      id: "item-1",
      question: "Are your essential oils 100% pure?",
      answer:
        "Yes, all our essential oils are 100% pure, natural, and free from synthetic additives, fillers, or chemicals. Each batch is carefully tested for quality and authenticity.",
    },
    {
      id: "item-2",
      question: "How should I use essential oils?",
      answer:
        "Essential oils can be used in several ways: diffuse them in the air for aromatherapy benefits, dilute with a carrier oil for topical application, or add a few drops to your bath. Always follow proper dilution guidelines and safety instructions.",
    },
    {
      id: "item-3",
      question: "Can I apply essential oils directly to my skin?",
      answer:
        "Most essential oils should be diluted with a carrier oil before applying to skin. Some oils like lavender and tea tree can be used neat (undiluted) in small amounts, but always do a patch test first to check for sensitivity.",
    },
    {
      id: "item-4",
      question: "How long do essential oils last?",
      answer:
        "When stored properly in a cool, dark place, most essential oils last 2-3 years. Citrus oils typically have a shorter shelf life of 1-2 years, while oils like patchouli and sandalwood can improve with age.",
    },
  ];

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <motion.section
      className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Header Section */}
          <motion.div
            className="lg:col-span-2 text-center lg:text-left"
            variants={itemVariants}
          >
            <h2 className="font-semibold text-black text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6 font-['Poppins']">
              FAQs
            </h2>
            <p className="font-normal text-[#183b56] text-lg md:text-xl lg:text-2xl leading-relaxed font-['Poppins']">
              Everything You Need to Know About Our Essential Oils
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-3 w-full"
            variants={itemVariants}
          >
            <div className="space-y-4">
              {faqData.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-4 md:px-8 py-4 md:py-6 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-normal text-black text-base md:text-lg lg:text-xl leading-normal font-['Poppins'] pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openItem === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown
                        className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0"
                      />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openItem === faq.id && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={accordionVariants}
                      >
                        <div className="px-4 md:px-8 pb-4 md:pb-6 pt-2 bg-gray-50">
                          <motion.p
                            className="font-light text-[#606060] text-sm md:text-base leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};