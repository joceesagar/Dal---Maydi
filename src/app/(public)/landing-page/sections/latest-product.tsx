"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  tags: string[];
  volumes?: string[];
  bundles?: string[];
  createdAt: string;
  updatedAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any
    }
  }
};

const productVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as any
    }
  }
};

export const LatestProductsSection = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [productsPerView, setProductsPerView] = useState(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/products?limit=15&page=1');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.products && Array.isArray(data.products)) {
          setAllProducts(data.products);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

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

  const maxIndex = Math.max(0, allProducts.length - productsPerView);
  const products = allProducts.slice(currentIndex, currentIndex + productsPerView);
  const totalDots = Math.ceil(allProducts.length / productsPerView);

  const nextSlide = () => {
    if (allProducts.length > productsPerView) {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }
  };

  const prevSlide = () => {
    if (allProducts.length > productsPerView) {
      setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index * productsPerView, maxIndex));
  };

  useEffect(() => {
    if (!isHovered && allProducts.length > productsPerView) {
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
  }, [isHovered, maxIndex, allProducts.length, productsPerView]);

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return "/product-oil.png";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <motion.section
        className="w-full relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 md:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b87f14]"></div>
            <p className="text-[#183b56] text-lg">Loading latest products...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  if (error || allProducts.length === 0) {
    return (
      <motion.section
        className="w-full relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 md:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex flex-col order-2 lg:order-1">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0.20px] leading-tight md:leading-[60px] mb-6 md:mb-8 text-center lg:text-left">
              Our Latest
              <br />
              Products
            </h2>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#183b56] text-base md:text-lg lg:text-xl tracking-[0.20px] leading-6 mb-8 md:mb-12 max-w-full lg:max-w-[292px] text-center lg:text-left">
              Wide range of organic products and all are handpicked for you to see.
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

          <div className="lg:col-span-8 xl:col-span-9 lg:border-l lg:border-border/45 lg:pl-4 xl:pl-8 h-full relative order-1 lg:order-2">
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-[#183b56] mb-2">No Products Available</h3>
              <p className="text-[#5a7184] text-base max-w-md">
                {error ? 'Failed to load products. Please try again later.' : 'No products have been added yet.'}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full border-border/45 border-b h-4 mt-8 md:mt-16"></div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="w-full relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          className="lg:col-span-3 flex flex-col order-2 lg:order-1"
          variants={itemVariants}
        >
          {totalDots > 1 && (
            <div className="flex mb-8 md:mb-20 mt-0 md:mt-5 items-center justify-center lg:justify-start gap-2 w-full">
              {new Array(totalDots).fill(0).map((_, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${index === Math.floor(currentIndex / productsPerView)
                    ? "size-3 rounded-full bg-transparent border-[#b87f14] border-2 flex items-center justify-center mt-0.5"
                    : "size-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mt-0.5"
                    }`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            </div>
          )}

          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0.20px] leading-tight md:leading-[60px] mb-6 md:mb-8 text-center lg:text-left">
            Our Latest
            <br />
            Products
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#183b56] text-base md:text-lg lg:text-xl tracking-[0.20px] leading-6 mb-8 md:mb-12 max-w-full lg:max-w-[292px] text-center lg:text-left">
            Wide range of organic products and all are handpicked for you to see.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Button
              className="w-full sm:w-[167px] h-[55px] bg-[#b87f14] hover:bg-[#a06f12] rounded-lg cursor-pointer transition-colors"
              onClick={() => router.push('/products')}
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-lg">
                View All
              </span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-8 xl:col-span-9 lg:border-l lg:border-border/45 lg:pl-4 xl:pl-8 h-full relative order-1 lg:order-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variants={itemVariants}
        >
          {allProducts.length > productsPerView && (
            <>
              <motion.button
                onClick={prevSlide}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                aria-label="Previous products"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-[#183b56]" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                aria-label="Next products"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-[#183b56]" />
              </motion.button>
            </>
          )}

          <div className={`grid gap-4 md:gap-6 transition-all duration-500 ${productsPerView === 1 ? 'grid-cols-1' :
            productsPerView === 2 ? 'grid-cols-2' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={productVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className="border-none shadow-none bg-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="relative overflow-hidden rounded-lg mb-4 md:mb-5">
                        <motion.img
                          className="w-full h-[250px] md:h-[300px] lg:h-[389px] object-cover transition-transform duration-300 hover:scale-110"
                          alt={product.title}
                          src={getProductImage(product)}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/product-oil.png";
                          }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="absolute top-4 left-4 bg-[#b87f14] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      <h3 className="font-normal text-[#183b56] text-lg md:text-xl tracking-[0.20px] leading-9 truncate hover:text-[#b87f14] transition-colors">
                        {product.title}
                      </h3>

                      <p className="font-normal text-[#5a7184] text-sm md:text-base tracking-[0] leading-9 truncate">
                        {product.category}
                      </p>

                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {product.tags.length > 2 && (
                            <span className="text-gray-400 text-xs px-2 py-1">
                              +{product.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="w-full border-border/45 border-b h-4 mt-8 md:mt-16"></div>
    </motion.section>
  );
};