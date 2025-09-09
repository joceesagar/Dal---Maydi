import { CheckIcon } from "lucide-react";
import React from "react";

export const ProductDescriptionSection = () => {
  const features = [
    "100% Pure & Natural Essential Oils",
    "Steam-Distilled & Cold-Pressed for Maximum potency",
    "No Synthetic Additives, Chemicals",
  ];

  return (
    <section className="w-full py-[90px] px-4 bg-[#F9FBFE]">
      <div className="w-full px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-8">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-[40px] tracking-[0.20px] leading-[52px]">
              The Power
              <br />
              of Nature&apos;s Essence
            </h2>

            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-base tracking-[0] leading-7 max-w-xl">
              Inspired by ancient wellness traditions and the purity of
              botanicals, our essential oils are crafted to capture the true
              essence of nature. Each drop is filled with powerful natural
              extracts, carefully distilled and blended to support balance,
              relaxation, and holistic well-being.
              <br />
              <br />A calming touch for the mind, body, and soul. Restoring
              harmony with every breath.
            </p>

            <div>
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100  flex items-center justify-center mt-0.5">
                    <CheckIcon className="size-3 text-green-500" />
                  </div>
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-black text-base tracking-[0] leading-7">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[490px] lg:h-[490px]">
            <div className="relative w-full h-full">
              <img
                className="absolute w-[400px] z-50 h-[425px] top-0 left-0  border-solid  object-cover"
                alt="Essential oil product"
                src="/product.png"
              />

              <img
                className="absolute w-[290px] h-[370px] top-[120px] left-[300px] object-cover"
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
