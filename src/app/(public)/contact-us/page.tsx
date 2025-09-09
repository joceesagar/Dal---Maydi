import React from "react";
import { HeroSection } from "./sections/hero";
import { MessageInputSection } from "./sections/message";

const ContactUsPage = () => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      <div className="bg-white w-full  flex flex-col">
        <HeroSection />
        <MessageInputSection />
      </div>
    </div>
  );
};
export default ContactUsPage;
