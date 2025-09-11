"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductFiltersSection } from "./sections/product-filter";
import { ProductGridSection } from "./sections/product-grid";
import { Loader2 } from "lucide-react";

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
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as any
    }
  }
};

const imageSlideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut" as any
    }
  }
};

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 100],
    sort: "date-desc",
    page: 1,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#b87f14]" />
          <p className="text-[#183b56]">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h3 className="text-xl font-medium text-[#183b56] mb-2">Error Loading Products</h3>
          <p className="text-[#5a7184]">{error}</p>
          <button
            className="mt-4 bg-[#b87f14] hover:bg-[#a06f12] text-white px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Banner */}
      <motion.img
        className="w-full h-[250px] md:h-[553px] object-cover border-[10px] border-solid border-white"
        alt="Banner"
        src="/ourstory.png"
        variants={imageSlideUp}
      />

      <motion.div
        className="w-full flex flex-col md:flex-row relative px-4 md:px-12 py-8"
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
        {/* Background */}
        <motion.img
          className="absolute w-full h-full top-0 left-0 -z-10"
          alt="Bg"
          src="/bg-1.svg"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        />

        {/* Sidebar Filters */}
        <motion.div variants={fadeInUp} transition={{ delay: 0.5 }}>
          <ProductFiltersSection filters={filters} setFilters={setFilters} />
        </motion.div>

        {/* Product Grid */}
        <motion.div variants={fadeInUp} transition={{ delay: 0.6 }}>
          <ProductGridSection
            filters={filters}
            setFilters={setFilters}
            products={products}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductsPage;