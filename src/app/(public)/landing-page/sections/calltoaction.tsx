"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <section className="w-full px-8 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Header Section */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-black text-5xl leading-tight mb-6 font-['Poppins']">
              FAQs
            </h2>
            <p className="font-normal text-[#183b56] text-2xl leading-relaxed font-['Poppins']">
              Everything You Need to Know About Our Essential Oils
            </p>
          </div>

          <div className="lg:col-span-3 w-full">
            <div className="space-y-4">
              {faqData.map((faq) => (
                <div
                  key={faq.id}
                  className="border-2 min-w-2xl border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-normal text-black text-xl leading-normal font-['Poppins'] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
                        openItem === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openItem === faq.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-6 pt-2 bg-gray-50">
                      <p className="font-light text-[#606060] text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
