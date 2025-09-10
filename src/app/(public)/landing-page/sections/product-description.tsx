import { CheckIcon } from "lucide-react";
import React from "react";

export const ProductDescriptionSection = () => {
  const features = [
    "100% Pure & Natural Essential Oils",
    "Steam-Distilled & Cold-Pressed for Maximum potency",
    "No Synthetic Additives, Chemicals",
  ];

  return (
    <section className="w-full py-12 md:py-[90px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 bg-[#F9FBFE]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
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
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <CheckIcon className="size-3 text-green-500" />
                  </div>
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-black text-sm md:text-base tracking-[0] leading-6 md:leading-7">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-[490px] order-1 lg:order-2">
            <div className="relative w-full h-full">
              <img
                className="absolute w-[250px] md:w-[300px] lg:w-[400px] z-50 h-[200px] md:h-[300px] lg:h-[425px] top-0 left-0 border-solid object-cover"
                alt="Essential oil product"
                src="/product.png"
              />

              <img
                className="absolute w-[180px] md:w-[220px] lg:w-[290px] h-[150px] md:h-[250px] lg:h-[370px] top-[80px] md:top-[100px] lg:top-[120px] left-[150px] md:left-[200px] lg:left-[300px] object-cover"
                alt="Essential oil product detail"
                src="/product.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};