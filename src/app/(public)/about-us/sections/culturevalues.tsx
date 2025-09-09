import { CheckIcon } from "lucide-react";
import React from "react";

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
    <section className="relative w-full px-12 mb-40 mt-22">
      <div className="relative h-[536px] w-full bg-[#F9FBFE]   ">
        <h2 className="absolute w-[485px] top-20 left-[150px] [font-family:'Poppins',Helvetica] font-medium text-[#183b56] text-5xl tracking-[0.20px] leading-[60px]">
          Our Culture &amp; Values
        </h2>

        <img
          className="w-[455px] h-[520px] top-[100px] left-[735px] absolute -bottom-5 object-cover"
          alt="Image"
          src="/culture.png"
        />

        <p className="absolute w-[455px] top-56 left-[150px] [font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-lg tracking-[0] leading-8">
          We are guided by principles that reflect our love for nature and care
          for our customers:
        </p>

        <div className="absolute top-[351px] left-[150px] space-y-[21px]">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex items-start gap-[26px] h-[22px] overflow-hidden"
            >
              <CheckIcon className="w-4 h-4 mt-2 text-green-500" />
              <div
                className={`${value.width} [font-family:'Poppins',Helvetica] font-normal text-[#183b56] text-base tracking-[0] leading-[normal] -mt-px`}
              >
                {value.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
