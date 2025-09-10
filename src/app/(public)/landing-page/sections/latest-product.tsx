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
  const [productsPerView, setProductsPerView] = useState(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const updateProductsPerView = () => {
      if (window.innerWidth < 768) {
        setProductsPerView(1);
      } else if (window.innerWidth < 1024) {
        setProductsPerView(2);
      } else {
        setProductsPerView(3);
      }
    };

    updateProductsPerView();
    window.addEventListener('resize', updateProductsPerView);
    return () => window.removeEventListener('resize', updateProductsPerView);
  }, []);

  const maxIndex = allProducts.length - productsPerView;
  const products = allProducts.slice(currentIndex, currentIndex + productsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index * productsPerView);
  };

  const totalDots = Math.ceil(allProducts.length / productsPerView);

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
  }, [isHovered, maxIndex]);

  return (
    <section className="w-full relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 flex flex-col order-2 lg:order-1">
          <div className="flex mb-8 md:mb-20 mt-0 md:mt-5 items-center justify-center lg:justify-start gap-2 w-full">
            {new Array(totalDots).fill(0).map((_, index) => (
              <div
                key={index}
                className={`cursor-pointer ${index === Math.floor(currentIndex / productsPerView)
                    ? "size-3 rounded-full bg-transparent border-gray-400 border-2 flex items-center justify-center mt-0.5"
                    : "size-3 rounded-full bg-gray-100 flex items-center justify-center mt-0.5"
                  }`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>

          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0.20px] leading-tight md:leading-[60px] mb-6 md:mb-8 text-center lg:text-left">
            Our Latest
            <br />
            Products
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#183b56] text-base md:text-lg lg:text-xl tracking-[0.20px] leading-6 mb-8 md:mb-12 max-w-full lg:max-w-[292px] text-center lg:text-left">
            Wide range of organic products and all are handpicker and for you to
            see.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Button
              className="w-full sm:w-[167px] h-[55px] bg-[#b87f14] hover:bg-[#a06f12] rounded-lg cursor-pointer"
              onClick={() => router.push('/products')}
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-lg">
                View All
              </span>
            </Button>
          </div>
        </div>

        <div
          className="lg:col-span-8 xl:col-span-9 lg:border-l lg:border-border/45 lg:pl-4 xl:pl-8 h-full relative order-1 lg:order-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={prevSlide}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronLeft className="w-5 h-5 text-[#183b56]" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronRight className="w-5 h-5 text-[#183b56]" />
          </button>

          <div className={`grid gap-4 md:gap-6 transition-all duration-500 ${productsPerView === 1 ? 'grid-cols-1' :
              productsPerView === 2 ? 'grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
            {products.map((product) => (
              <Card
                key={product.id}
                className="border-none shadow-none bg-transparent"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <img
                      className="w-full h-[250px] md:h-[300px] lg:h-[389px] object-cover mb-4 md:mb-5"
                      alt="Image"
                      src={product.image}
                    />

                    <h3 className="font-normal text-[#183b56] text-lg md:text-xl tracking-[0.20px] leading-9 truncate">
                      {product.name}
                    </h3>

                    <p className="font-normal text-[#5a7184] text-sm md:text-base tracking-[0] leading-9 truncate">
                      {product.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full border-border/45 border-b h-4 mt-8 md:mt-16"></div>
    </section>
  );
};