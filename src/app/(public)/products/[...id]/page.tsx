"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import React, { useState } from "react";

const ProductPage = () => {
  const [selectedBundle, setSelectedBundle] = useState(0);

  const featureBadges = [
    "100% Pure & Natural",
    "Stress Relaxation",
    "Promotes Better Sleep",
  ];

  const volumeOptions = [
    { label: "10ml/33oz", selected: true },
    { label: "15ml/50oz", selected: false },
  ];

  const bundleOptions = [
    {
      title: "Buy One",
      subtitle: "Standard Price",
      price: "$14.00",
      originalPrice: null,
      selected: true,
      bgColor: "bg-gray-900",
      textColor: "text-white",
    },
    {
      title: "Buy Two",
      subtitle: "You Save 10%",
      price: "$12.60",
      originalPrice: "$14.00",
      selected: false,
      bgColor: "bg-[#f8f8f8]",
      textColor: "text-black",
    },
    {
      title: "Buy Three",
      subtitle: "You Save 20%",
      price: "$11.20",
      originalPrice: "$14.00",
      selected: false,
      bgColor: "bg-[#f8f8f8]",
      textColor: "text-black",
    },
  ];

  return (
    <div className="bg-[#f8f8f8] min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-[#f8f8f8] px-4">
        {/* Main Product Section */}
        <div className="flex gap-8 pt-[120px] pb-16">
          {/* Product Image Section */}
          <div className="w-[610px] h-[599px] relative flex-shrink-0 ml-[96px]">
            <img
              className="w-full h-full rounded-[15.57px] object-cover"
              alt="Rectangle"
              src="/rectangle-3.png"
            />

            <img
              className="absolute w-[46px] h-[46px] top-9 right-20"
              alt="Group"
              src="/group-98.png"
            />

            <img
              className="absolute w-full h-full top-0 left-0"
              alt="Element"
              src="/product-detail.png"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex-1  pt-1">
            {/* Heart Icon */}

            {/* Product Title */}
            <div className="flex items-center gap-5">
              <div>
                <h1 className="[font-family:'Poppins',Helvetica] font-medium text-gray-900 text-5xl tracking-[0] leading-[normal]">
                  Lavender Essential Oil
                </h1>
              </div>

              <div className="bg-[#D9D9D97D] rounded-full flex items-center justify-center w-[50px] h-[50px]">
                <Heart />
              </div>
            </div>

            {/* Product Description */}
            <p className="[font-family:'Poppins',Helvetica]  font-normal max-w-xl text-gray-500 text-base tracking-[0] leading-[normal] mb-[32px]">
              Calm your mind, relax your body, and embrace restful sleep with
              nature&apos;s most soothing aroma.
            </p>

            {/* Feature Badges */}
            <div className="flex items-center gap-[15px] mb-[12px]">
              {featureBadges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex w-auto h-12 items-center justify-center gap-[3.46px] px-3 py-1.5 bg-gray-100 rounded-lg [font-family:'Poppins',Helvetica] font-normal text-gray-700 text-xs text-center tracking-[0] leading-[normal]"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Volume Selection */}
            <div className="mb-[34px] flex flex-col items-start">
              <div className="[font-family:'Poppins',Helvetica] font-medium text-black text-base text-center tracking-[0] leading-[normal] mb-[12px]">
                Volume
              </div>

              <div className="flex gap-5">
                {volumeOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant={option.selected ? "outline" : "ghost"}
                    className={`w-[239px] h-11 items-center justify-center gap-[3.46px] px-[12.11px] py-[3.46px] ${
                      option.selected
                        ? "bg-white rounded-[6.92px] border-[0.69px] border-solid border-gray-900"
                        : "bg-[#f8f8f8] rounded-[6.92px] border-[0.69px] border-solid border-[#0000001c]"
                    } [font-family:'Poppins',Helvetica] font-normal text-gray-900 text-base text-center tracking-[0] leading-[normal]`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bundle Selection */}
            <div className="mb-[34px] flex flex-col items-start">
              <div className="[font-family:'Poppins',Helvetica] font-medium text-black text-base text-center tracking-[0] leading-[normal] mb-[12px]">
                Bundle &amp; Save
              </div>

              <div className="flex gap-[13px]">
                {bundleOptions.map((option, index) => {
                  const isSelected = selectedBundle === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedBundle(index)}
                      className={`
                    flex-1 min-w-[160px] border border-gray-200 h-[89px] p-3 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between
                    ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }
                  `}
                    >
                      <div className="flex justify-end">
                        <div className="text-right">
                          <div
                            className={`font-semibold text-sm ${
                              isSelected ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {option.price}
                          </div>
                          {option.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                              {option.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div
                          className={`font-medium text-xs ${
                            isSelected ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {option.title}
                        </div>
                        <div
                          className={`text-xs font-light ${
                            isSelected ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {option.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 flex flex-col justify-end max-w-lg">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-[245px] h-[50px] rounded-[12.11px] border-[1.5px] border-solid border-black [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]"
                >
                  Add to Cart
                </Button>

                <Button className="w-[245px] h-[50px] bg-gray-900 rounded-[12.11px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]">
                  Buy Now
                </Button>
              </div>
              <div className="flex items-center justify-end gap-[3px] pe-4">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Frame"
                  src="/cancel.png"
                />
                <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-700 text-xs tracking-[0] leading-[normal]">
                  Cancel Anytime
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Gallery Section */}
        <section className="max-w-5xl mx-auto pb-16">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="grid grid-rows-2 gap-4 h-[700px]">
              {/* Wide image - top left (full width of left column) */}
              <div className="bg-pink-50  overflow-hidden shadow-sm">
                <img
                  src="/product-detail.png"
                  alt="Essential Oil Product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom row - two half-width images */}
              <div className="grid grid-cols-2 gap-4">
                {/* Bottom left image */}
                <div className="bg-pink-50  overflow-hidden shadow-sm">
                  <img
                    src="/product-detail.png"
                    alt="Essential Oil Product"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom center image */}
                <div className="bg-pink-50  overflow-hidden shadow-sm">
                  <img
                    src="/product-detail.png"
                    alt="Essential Oil Product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - single tall image */}
            <div className="bg-pink-50  overflow-hidden shadow-sm h-[700px]">
              <img
                src="/product-detail.png"
                alt="Essential Oil Product"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
