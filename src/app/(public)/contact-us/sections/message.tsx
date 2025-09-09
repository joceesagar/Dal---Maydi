import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

export const MessageInputSection = () => {
  const inputFields = [
    { placeholder: "Your Name" },
    { placeholder: "Email Address" },
    { placeholder: "Phone Number (optional)" },
  ];

  return (
    <section className="flex flex-col w-full items-start gap-[41.62px] relative px-32 pt-16 mb-32">
      <div className="flex items-start gap-[27.75px] relative w-full">
        {inputFields.map((field, index) => (
          <div key={index} className="flex-1">
            <Input
              placeholder={field.placeholder}
              className="border-0 border-b-[0.87px] border-[#c9c9c9] rounded-none bg-transparent px-[8.67px] pt-[8.67px] pb-[27.75px] [font-family:'Poppins',Helvetica] font-normal text-black text-[20.8px] leading-[31.2px] placeholder:text-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#bb8116]"
            />
          </div>
        ))}
      </div>

      <div className="w-full">
        <Textarea
          placeholder="Message"
          className="border-0 border-b-[0.87px] border-[#c9c9c9] rounded-none bg-transparent px-[8.67px] pt-[8.67px] pb-[86.72px] min-h-[126.61px] resize-none [font-family:'Poppins',Helvetica] font-normal text-black text-[20.8px] leading-[31.2px] placeholder:text-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#bb8116]"
        />
      </div>

      <Button className="flex w-[310.44px] items-center justify-center gap-[4.34px] px-[21.68px] py-[21.68px] bg-[#bb8116] hover:bg-[#a06f13] rounded-[32.08px] h-auto">
        <span className="[font-family:'Inter',Helvetica] font-normal text-white text-[19.1px] text-center">
          Leave us a Message
        </span>
        <ArrowRightIcon className="w-[20.81px] h-[20.81px]" />
      </Button>
    </section>
  );
};
