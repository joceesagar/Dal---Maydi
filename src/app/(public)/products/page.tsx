"use client";
import React, { useState } from "react";
import { ProductFiltersSection } from "./sections/product-filter";
import { ProductGridSection } from "./sections/product-grid";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 100],
    sort: "date-desc",
    page: 1,
  });

  return (
    <div className="bg-white w-full">
      {/* Hero Banner */}
      <img
        className="w-full h-[250px] md:h-[553px] object-cover border-[10px] border-solid border-white"
        alt="Banner"
        src="/ourstory.png"
      />

      <div className="w-full flex flex-col md:flex-row relative px-4 md:px-12 py-8">
        {/* Background */}
        <img
          className="absolute w-full h-full top-0 left-0 -z-10"
          alt="Bg"
          src="/bg-1.svg"
        />

        {/* Sidebar Filters */}
        <ProductFiltersSection filters={filters} setFilters={setFilters} />

        {/* Product Grid */}
        <ProductGridSection filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default ProductsPage;
