"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterProps {
  filters: {
    category: string;
    priceRange: number[];
    sort: string;
    page: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      priceRange: number[];
      sort: string;
      page: number;
    }>
  >;
}

export const ProductFiltersSection = ({ filters, setFilters }: FilterProps) => {
  const categories = ["all", "essential oils", "candles", "skincare"];

  return (
    <aside className="w-full md:w-[250px] bg-white mb-8 md:mb-0 md:mr-8">
      <Accordion type="multiple" className="w-full border-b">
        {/* Price Filter */}
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="px-0 py-3 text-base font-medium">
            Price
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-2">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [0, Number(e.target.value)],
                  page: 1,
                }))
              }
              className="w-full"
            />
            <p className="text-sm text-gray-600">
              Up to ${filters.priceRange[1]}
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="categories" className="border-b border-gray-200">
          <AccordionTrigger className="px-0 py-3 text-base font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, category: cat, page: 1 }))
                }
                className={`block text-left w-full px-2 py-1 rounded ${filters.category === cat
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
