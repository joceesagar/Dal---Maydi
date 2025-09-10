"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

export const LatestProductsSection = () => {
  const allProducts = [
    {
      id: 1,
      name: "Dal - Maydi Oil",
      category: "Essential Oil",
      image: "/product-oil.png",
    },
    {
      id: 2,
      name: "Organic Coconut Oil",
      category: "Essential Oil",
      image: "/product-oil.png",
    },
    {
      id: 3,
      name: "Lavender Extract",
      category: "Essential Oil",
      image: "/product-oil.png",
    },
    {
      id: 4,
      name: "Green Tea Extract",
      category: "Herbal Tea",
      image: "/product-oil.png",
    },
    {
      id: 5,
      name: "Chamomile Tea",
      category: "Herbal Tea",
      image: "/product-oil.png",
    },
    {
      id: 6,
      name: "Mint Leaf Tea",
      category: "Herbal Tea",
      image: "/product-oil.png",
    },
    {
      id: 7,
      name: "Organic Honey",
      category: "Natural Sweetener",
      image: "/product-oil.png",
    },
    {
      id: 8,
      name: "Raw Honey",
      category: "Natural Sweetener",
      image: "/product-oil.png",
    },
    {
      id: 9,
      name: "Manuka Honey",
      category: "Natural Sweetener",
      image: "/product-oil.png",
    },
    {
      id: 10,
      name: "Turmeric Powder",
      category: "Organic Spices",
      image: "/product-oil.png",
    },
    {
      id: 11,
      name: "Cumin Seeds",
      category: "Organic Spices",
      image: "/product-oil.png",
    },
    {
      id: 12,
      name: "Black Pepper",
      category: "Organic Spices",
      image: "/product-oil.png",
    },
    {
      id: 13,
      name: "Aloe Vera Gel",
      category: "Skincare",
      image: "/product-oil.png",
    },
    {
      id: 14,
      name: "Rose Water",
      category: "Skincare",
      image: "/product-oil.png",
    },
    {
      id: 15,
      name: "Neem Oil",
      category: "Skincare",
      image: "/product-oil.png",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter()


  const getProductsToShow = () => {
    if (typeof window === 'undefined') return 3; // SSR fallback
    if (window.innerWidth < 768) return 1;  // Mobile: 1 product
    if (window.innerWidth < 1024) return 2; // Tablet: 2 products
    return 3; // Desktop: 3 products
  };

  const products = allProducts.slice(currentIndex, currentIndex + getProductsToShow());

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (allProducts.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (allProducts.length - 2)) % (allProducts.length - 2));
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  return (
    <section className="w-full relative px-32">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-3 flex flex-col">
          <div className="flex mb-20 mt-5 items-start justify-start gap-2 w-full">
            {new Array(5).fill(0).map((_, index) => (
              <div
                key={index}
                className={`${index === Math.floor(currentIndex / 3)
                  ? "size-3 rounded-full bg-transparent border-gray-400 border-2  flex items-center justify-center mt-0.5"
                  : "size-3 rounded-full bg-gray-100  flex items-center justify-center mt-0.5"
                  }`}
                onClick={() => setCurrentIndex(index * 3)}
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

          <Button className="w-[167px] h-[55px] bg-[#b87f14] hover:bg-[#a06f12] rounded-lg cursor-pointer"
            onClick={() => router.push('/products')}
          >
            <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-lg">
              View All
            </span>
          </Button>
        </div>

        <div
          className="col-span-8 border-l-1 ps-4 border-border/45 h-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronLeft className="w-5 h-5 text-[#183b56]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronRight className="w-5 h-5 text-[#183b56]" />
          </button>

          <div className="grid grid-cols-3 gap-6 transition-all duration-500">
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