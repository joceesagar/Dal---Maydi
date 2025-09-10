"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export const CustomerTestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      image: "/testimonial.png",
      quote: "I've tried many essential oils before, but nothing compares to the purity and quality of these. The lavender oil helps me sleep peacefully every night, and the peppermint oil is my go-to for instant refreshment. Absolutely love it!",
      author: "Amara S."
    },
    {
      id: 2,
      image: "/testimonial.png",
      quote: "These organic products have transformed my daily routine completely. The quality is outstanding and you can really feel the difference. My skin has never looked better since I started using their natural skincare line!",
      author: "Sarah M."
    },
    {
      id: 3,
      image: "/testimonial.png",
      quote: "As someone who values natural and organic products, I'm impressed with the authenticity and effectiveness. The herbal teas are incredibly soothing, and the honey is the purest I've ever tasted. Highly recommended!",
      author: "David R."
    },
    {
      id: 4,
      image: "/testimonial.png",
      quote: "The customer service is exceptional and the product quality speaks for itself. I've been using their organic spices for months now, and the flavor difference is remarkable. Will definitely continue purchasing!",
      author: "Maya L."
    },
    {
      id: 5,
      image: "/testimonial.png",
      quote: "From the packaging to the product itself, everything screams premium quality. The essential oils are pure and potent, exactly what I was looking for. These have become a staple in my wellness routine.",
      author: "James K."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="w-full bg-[#f9fbfe] py-6">
      <Card className="max-w-7xl mx-auto bg-[#f9fbfe] border-none shadow-none">
        <CardContent
          className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 p-4 md:p-8 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={prevSlide}
            className={`absolute cursor-pointer left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-1.5 md:p-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#183b56]" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute cursor-pointer right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-1.5 md:p-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#183b56]" />
          </button>

          <div className="flex-shrink-0 order-2 lg:order-1">
            <img
              className="w-[250px] h-[230px] sm:w-[300px] sm:h-[280px] md:w-[341px] md:h-[317px] object-cover transition-all duration-700 ease-in-out mx-auto"
              alt="Customer testimonial"
              src={currentTestimonial.image}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='341' height='317' viewBox='0 0 341 317'%3E%3Crect width='341' height='317' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3ETestimonial Image%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>

          <div className="flex-1 relative transition-all duration-700 ease-in-out order-1 lg:order-2 text-center lg:text-left">
            <img
              className="w-[50px] md:w-[70px] lg:w-[90px] absolute right-0 lg:right-0 bottom-0 h-[50px] md:h-[70px] lg:h-[90px] object-fill opacity-20"
              alt="quote-img"
              src="/quote-left.png"
            />

            <blockquote className="mb-4 md:mb-6">
              <p className="font-normal text-[#183b56] text-sm sm:text-base md:text-lg tracking-[0.12px] leading-6 md:leading-8 transition-all duration-700 ease-in-out">
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            <cite className="font-semibold text-[#183b56] text-base md:text-lg lg:text-xl tracking-[0.20px] leading-6 not-italic transition-all duration-700 ease-in-out">
              -{currentTestimonial.author}
            </cite>

            <div className="mt-4 flex gap-2 justify-center lg:justify-start">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${index === currentIndex
                      ? "size-3 rounded-full bg-transparent border-gray-400 border-2 flex items-center justify-center mt-0.5 transition-all duration-300"
                      : "size-3 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 hover:bg-gray-300 transition-all duration-300"
                    }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === currentIndex && (
                    <div className="size-1.5 rounded-full bg-gray-400"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};