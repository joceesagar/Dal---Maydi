import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export const ProductFiltersSection = () => {
  const filterSections = [
    {
      id: "price",
      title: "PRICE",
      content: "",
    },
    {
      id: "categories",
      title: "CATEGORIES",
      content: "",
    },
  ];

  return (
    <aside className="w-[250px] bg-white">
      <Accordion type="multiple" className="w-full border-b">
        {filterSections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border-b border-gray-200"
          >
            <AccordionTrigger className="flex justify-between items-center w-full px-0 py-3 text-left [font-family:'Poppins',Helvetica] font-normal text-[#222222] text-base tracking-[0] leading-[normal] hover:no-underline">
              <span>{section.title}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};
