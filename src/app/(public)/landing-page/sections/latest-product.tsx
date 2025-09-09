"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

export const LatestProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Dal - Maydi Oil",
      category: "Essential Oil",
      image: "/product-oil.png",
    },
    {
      id: 2,
      name: "Dal - Maydi Oil",
      category: "Essential Oil",
      image: "/product-oil.png",
    },
    {
      id: 3,
      name: "Dal - Maydi Oil",
      category: "Essential Oil",
      image: "/product-oil.png",
    },
  ];
  let [currentIndex, setCurrentIndex] = useState(3);
  return (
    <section className="w-full relative px-32">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-3 flex flex-col">
          <div className="flex mb-20 mt-5 items-start justify-start gap-2 w-full">
            {new Array(5).fill(0).map((_, index) => (
              <div
                key={index}
                className={`${
                  index === currentIndex
                    ? "size-3 rounded-full bg-transparent border-gray-400 border-2  flex items-center justify-center mt-0.5"
                    : "size-3 rounded-full bg-gray-100  flex items-center justify-center mt-0.5"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>

          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-5xl tracking-[0.20px] leading-[60px] mb-8">
            Our Latest
            <br />
            Products
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#183b56] text-xl tracking-[0.20px] leading-6 mb-12 max-w-[292px]">
            Wide range of organic products and all are handpicker and for you to
            see.
          </p>

          <Button className="w-[167px] h-[55px] bg-[#b87f14] hover:bg-[#a06f12] rounded-lg ">
            <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-lg">
              View All
            </span>
          </Button>
        </div>

        <div className="col-span-8 border-l-1 ps-4 border-border/45 h-full">
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="border-none shadow-none bg-transparent"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <img
                      className="w-full h-[389px] object-cover mb-5"
                      alt="Image"
                      src={product.image}
                    />

                    <h3 className=" font-normal text-[#183b56] text-xl tracking-[0.20px] leading-9 whitespace-nowrap">
                      {product.name}
                    </h3>

                    <p className="font-normal text-[#5a7184] text-md tracking-[0] leading-9 whitespace-nowrap">
                      {product.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="w-full px-32 border-border/45 border-b h-4"></div>
      </div>
    </section>
  );
};
