import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full relative min-h-[500px] md:h-[719px] bg-[#FEFFEF] overflow-hidden">
      <img
        className="absolute w-full md:w-[665px] h-full md:h-[719px] top-0 right-0 object-cover object-left md:object-center"
        alt="Element"
        src="/landing.png"
      />
      <div className="flex w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col justify-start relative z-10">
        <div className="pt-16 md:pt-32 mb-4 md:mb-8 font-semibold text-[#b87f14] text-sm md:text-base tracking-[0] leading-[25.2px] whitespace-nowrap">
          Pure &amp; Natural
        </div>
        <div className="max-w-full md:max-w-3xl mb-6 md:mb-8 [font-family:'Poppins',Helvetica] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] tracking-[0] leading-tight md:leading-[64px]">
          <h1 className="text-transparent">
            <span className="text-black">Premium </span>
            <span className="text-[#b87f14]">
              Essential Oils{" "}
            </span>
            <span className="text-black">
              For Your Wellness
            </span>
          </h1>
        </div>
        <div className="w-full max-w-md md:max-w-[437px] mb-6 md:mb-8 [font-family:'Poppins',Helvetica] font-normal text-[#92897e] text-sm md:text-base tracking-[0] leading-normal">
          Discover The Healing Power Of 100% Pure, Therapeutic Grade Essential
          Oils Sourced From The Finest Organic Farms Around The World.
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <Button className="bg-[#bb8116] hover:bg-[#a0701a] rounded-3xl px-6 md:px-[46px] py-2 md:py-3 h-auto w-full sm:w-auto">
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#fbfbfb] text-lg md:text-xl tracking-[0] leading-[normal]">
              Buy Now
            </span>
          </Button>

          <Button
            variant="outline"
            className="group rounded-3xl border-2 border-[#b87f14] px-6 md:px-[46px] py-2 md:py-3 h-auto hover:bg-[#b87f14] hover:text-white w-full sm:w-auto"
          >
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#b87f14] text-lg md:text-xl tracking-[0] leading-[normal] group-hover:text-white">
              Learn More
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;