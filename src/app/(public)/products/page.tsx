"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductFiltersSection } from "./sections/product-filter";
import { ProductGridSection } from "./sections/product-grid";

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
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as any,
    },
  },
};

const imageSlideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut" as any,
    },
  },
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();

        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

        {/* Product Grid (with skeletons when loading) */}
        <motion.div variants={fadeInUp} transition={{ delay: 0.6 }}>
          <ProductGridSection
            filters={filters}
            setFilters={setFilters}
            products={products}
            loading={loading}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductsPage;
