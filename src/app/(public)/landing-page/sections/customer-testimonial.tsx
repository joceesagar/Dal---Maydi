"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

export const CustomerTestimonialsSection = () => {
  let [currentIndex, setCurrentIndex] = useState(3);
  return (
    <section className="w-full bg-[#f9fbfe] py-6">
      <Card className="max-w-7xl mx-auto bg-[#f9fbfe] border-none shadow-none">
        <CardContent className="flex items-center gap-8 p-8">
          <div className="flex-shrink-0">
            <img
              className="w-[341px] h-[317px] object-cover"
              alt="Essential oils product"
              src="/testimonial.png"
            />
          </div>

          <div className="flex-1 relative">
            <img
              className="w-[90px] absolute right-0 bottom-0 h-[90px] object-fill"
              alt="quote-img"
              src="/quote-left.png"
            />
            <blockquote className="mb-6">
              <p className="font-normal text-[#183b56] text-lg tracking-[0.12px] leading-8">
                "I've tried many essential oils before, but nothing compares to
                the purity and quality of these. The lavender oil helps me sleep
                peacefully every night, and the peppermint oil is my go-to for
                instant refreshment. Absolutely love it!"
              </p>
            </blockquote>

            <cite className="font-semibold text-[#183b56] text-xl tracking-[0.20px] leading-6 not-italic">
              -Amara S.
            </cite>

            <div className="mt-4 flex gap-2">
              {new Array(5).fill(0).map((_, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentIndex
                      ? "size-3 rounded-full bg-transparent border-gray-400 border-2  flex items-center justify-center mt-0.5"
                      : "size-3 rounded-full bg-gray-200  flex items-center justify-center mt-0.5"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
