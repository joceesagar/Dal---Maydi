import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full relative h-[719px] bg-[#FEFFEF]">
      <img
        className="absolute w-[665px] h-[719px] top-0 right-0"
        alt="Element"
        src="/landing.png"
      />
      <div className="flex w-full ps-32 flex-col justify-start relative z-10">
        <div className="pt-32 mb-8 font-semibold text-[#b87f14] text-base tracking-[0] leading-[25.2px] whitespace-nowrap">
          Pure &amp; Natural
        </div>
        <div className="max-w-3xl mb-8 [font-family:'Poppins',Helvetica] font-bold text-[64px] tracking-[0] leading-[64px]">
          <h1 className="text-transparent">
            <span className="text-black leading-[59.0px]">Premium </span>
            <span className="text-[#b87f14] leading-[59.0px]">
              Essential Oils{" "}
            </span>
            <span className="text-black leading-[59.0px]">
              For Your Wellness
            </span>
          </h1>
        </div>
        <div className="w-[437px] mb-8 [font-family:'Poppins',Helvetica] font-normal text-[#92897e] text-base tracking-[0] leading-[normal]">
          Discover The Healing Power Of 100% Pure, Therapeutic Grade Essential
          Oils Sourced From The Finest Organic Farms Around The World.
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-[#bb8116] hover:bg-[#a0701a] rounded-3xl px-[46px] py-3 h-auto">
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#fbfbfb] text-xl tracking-[0] leading-[normal]">
              Buy Now
            </span>
          </Button>

          <Button
            variant="outline"
            className="group rounded-3xl border-2 border-[#b87f14] px-[46px] py-3 h-auto hover:bg-[#b87f14] hover:text-white"
          >
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#b87f14] text-xl tracking-[0] leading-[normal] group-hover:text-white">
              Learn More
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
