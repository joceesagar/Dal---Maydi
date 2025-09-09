import React from "react";
import { ProductFiltersSection } from "./sections/product-filter";
import { ProductGridSection } from "./sections/product-grid";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ProductsPage = () => {
  const paginationItems = [
    {
      page: "1",
      isActive: false,
    },
    {
      page: "2",
      isActive: true,
    },
    {
      page: "3",
      isActive: false,
    },
  ];
  return (
    <div className="bg-white w-full">
      <img
        className="w-full h-[453px] object-cover border-[10px] border-solid border-white"
        alt="Image"
        src="/ourstory.png"
      />

      <div className="w-full flex relative px-12">
        <img
          className="absolute w-full h-[1453px] -z-10"
          alt="Bg"
          src="/bg-1.svg"
        />
        <ProductFiltersSection />
        <ProductGridSection />
      </div>
      <div className="flex justify-center items-center gap-2  pt-12 mb-22">
        {paginationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-[34px] h-[34px] p-0 rounded-none hover:bg-transparent ${
              item.isActive ? "bg-black" : "bg-transparent"
            }`}
          >
            <span
              className={`[font-family:'Montserrat',Helvetica] font-normal text-lg tracking-[0] leading-[normal] ${
                item.isActive ? "text-white" : "text-[#231f20]"
              }`}
            >
              {item.isActive ? <ChevronRight /> : item.page}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;
