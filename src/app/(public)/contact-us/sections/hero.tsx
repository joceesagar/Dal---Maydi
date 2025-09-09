import { socialIcons } from "@/app/(public)/landing-page/sections/site-footer";
import React from "react";

export const HeroSection = () => {
  return (
    <section className="flex flex-col w-full items-center justify-between relative">
      <img className="flex-shrink-0" alt="Social media" src="/ourstory.png" />

      <div className="flex flex-col items-start gap-7 flex-1 w-full pt-16">
        <div className="[font-family:'Poppins',Helvetica] font-normal text-black text-[20.8px] tracking-[0] leading-[31.2px]  px-32">
          Get Started
        </div>

        <div className="flex  px-32 gap-4">
          <div>
            <h1 className="[font-family:'Poppins',Helvetica] font-bold text-black text-[78px] tracking-[0] leading-[86.7px]">
              Get in touch with us. We&#39;re here to assist you.
            </h1>
          </div>
          <div className="flex flex-col gap-2 ">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.width} h-10   overflow-hidden flex items-center justify-center border-border/45 border-2 rounded-full cursor-pointer hover:bg-[#ffffff2a] transition-colors`}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="currentColor"
                  style={{ color: "#111111" }}
                >
                  <title>{social.name}</title>
                  <path d={social.icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
