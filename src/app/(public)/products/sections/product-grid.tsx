import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";

export const ProductGridSection = () => {
  const products = [
    {
      id: 1,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail.png",
    },
    {
      id: 2,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-1.png",
    },
    {
      id: 3,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-2.png",
    },
    {
      id: 4,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-3.png",
    },
    {
      id: 5,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-4.png",
    },
    {
      id: 6,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-5.png",
    },
    {
      id: 7,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-6.png",
    },
    {
      id: 8,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-7.png",
    },
    {
      id: 9,
      title: "Essential Oil",
      price: "$ 15.99",
      image: "/thumbnail-8.png",
    },
  ];

  const paginationItems = [
    {
      page: "1",
      isActive: false,
    },
    {
      page: "2",
      isActive: false,
    },
    {
      page: "3",
      isActive: true,
    },
  ];

  return (
    <div className="relative w-full px-5">
      <div className="relative p-5">
        <header className="flex justify-between items-center mb-12">
          <h2 className="[font-family:'Poppins',Helvetica] font-normal text-[#231f20] text-xl tracking-[0] leading-[normal]">
            24 Products
          </h2>

          <div className="relative">
            <Select>
              <SelectTrigger className="w-[241px] h-[50px]  border-[1px] border-black rounded-none">
                <SelectValue
                  placeholder="Sort"
                  className="[font-family:'Poppins',Helvetica] font-normal text-black text-lg tracking-[0] leading-[normal]"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-4 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="w-80 h-[530px] bg-transparent border-none shadow-none"
            >
              <CardContent className="p-0 relative">
                <img
                  className="w-80 h-[441px] object-cover"
                  alt="Thumbnail"
                  src={"product.png"}
                />
                <div className="text-center mt-[22px]">
                  <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#1e1e20] text-2xl tracking-[0] leading-[normal] mb-[1px]">
                    {product.title}
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#1e1e20] text-base tracking-[0] leading-[normal]">
                    {product.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
