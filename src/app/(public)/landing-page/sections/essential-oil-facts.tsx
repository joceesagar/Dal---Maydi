import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const OilIconShape = ({ index }: { index: number }) => {
  // Common wrapper for background and size
  const wrapperClass =
    "relative w-[66px] h-[66px] -top-px -left-px bg-[#f2f6fd] rounded-2xl flex items-center justify-center";
  // All shapes use the same green color
  const color = "#36b37e";

  switch (index) {
    case 0: // Circle
      return (
        <div className={wrapperClass}>
          <div
            className="w-8 h-8"
            style={{ background: color, borderRadius: "9999px" }}
          />
        </div>
      );
    case 1: // Squircle (rounded-md)
      return (
        <div className={wrapperClass}>
          <div
            className="w-8 h-8"
            style={{ background: color, borderRadius: "0.375rem" }}
          />
        </div>
      );
    case 2: // Hexagon
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
    case 3: // Triangle
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
    <section className="w-full min-h-[60vh] mb-16 md:mb-32 py-8 md:py-16 bg-white px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-semibold text-[#183b56] text-2xl md:text-3xl lg:text-[40px] text-center tracking-[0.20px] leading-tight md:leading-[52px] mb-4">
          Our Essential Oil Facts
        </h2>

        <p className="max-w-[790px] mx-auto [font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-base md:text-lg text-center tracking-[0] leading-6 md:leading-8 mb-12 md:mb-16">
          Rooted in nature&apos;s purity and inspired by holistic wellness, our
          essential oils are carefully sourced and distilled to preserve their
          natural benefits. Each ingredient is chosen for its therapeutic
          properties, ensuring a pure and authentic experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 xl:gap-22 justify-items-center">
          {essentialOils.map((oil, index) => (
            <Card
              key={index}
              className="border-none shadow-none bg-transparent w-full max-w-[250px]"
            >
              <CardContent className="flex flex-col items-center text-center p-0">
                <div className="mb-6 md:mb-8 flex justify-center">
                  <OilIconShape index={index} />
                </div>
                <h3 className="font-medium text-[#183b56] text-lg md:text-xl text-center tracking-[0.20px] leading-6 mb-3 md:mb-4">
                  {oil.title}
                </h3>
                <p className="font-normal text-[#5a7184] text-sm text-center tracking-[0] leading-6 px-2">
                  {oil.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};