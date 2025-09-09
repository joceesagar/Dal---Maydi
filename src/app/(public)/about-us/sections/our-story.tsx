import React from "react";

export const OurStorySection = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 py-16 px-4 lg:px-8">
        <div className="flex-1 relative min-h-[575px]">
          <img
            className="w-[415px] h-[440px] absolute top-0 z-50 left-0 object-cover"
            alt="Image"
            src="/aboutstory1.png"
          />
          <img
            className="w-[341px] h-[450px] absolute top-[125px] left-[278px] object-cover"
            alt="Image"
            src="/aboutstory2.png"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 pt-16">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-5xl tracking-[0.20px] leading-[60px]">
            Building a Natural Wellness Ecosystem
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-lg tracking-[0] leading-8 max-w-[484px]">
            Our oils are more than just scents – they&apos;re part of a holistic
            lifestyle. Whether you&apos;re seeking calm, energy, focus, or skin
            support, our wide range of blends and single oils help create
            balance in your daily rituals. We partner with sustainable farms and
            use eco-friendly practices to ensure our products are kind to you
            and the planet.
          </p>
        </div>
      </div>
    </section>
  );
};
