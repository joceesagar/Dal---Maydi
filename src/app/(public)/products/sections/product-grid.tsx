"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  date: string;
  image: string;
}

interface GridProps {
  filters: {
    category: string;
    priceRange: number[];
    sort: string;
    page: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      priceRange: number[];
      sort: string;
      page: number;
    }>
  >;
}

export const ProductGridSection = ({ filters, setFilters }: GridProps) => {
  const [message, setMessage] = useState<string | null>(null);

  const products: Product[] = [
    { id: 1, title: "Essential Oil", price: 15.99, category: "essential oils", date: "2024-09-01", image: "/product.png" },
    { id: 2, title: "Luxury Candle", price: 25.99, category: "candles", date: "2024-08-15", image: "/product.png" },
    { id: 3, title: "Face Cream", price: 30.5, category: "skincare", date: "2024-07-10", image: "/product.png" },
    { id: 4, title: "Lavender Oil", price: 19.99, category: "essential oils", date: "2024-06-05", image: "/product.png" },
    { id: 5, title: "Rose Candle", price: 18.99, category: "candles", date: "2024-05-12", image: "/product.png" },
    { id: 6, title: "Essential Oil", price: 17.99, category: "essential oils", date: "2024-05-12", image: "/product.png" },
    { id: 7, title: "Essential Oil", price: 16.9, category: "essential oils", date: "2024-05-12", image: "/product.png" },
    { id: 8, title: "Essential Oil", price: 21.9, category: "essential oils", date: "2024-05-12", image: "/product.png" },
    { id: 9, title: "Essential Oil", price: 18.99, category: "candles", date: "2024-05-12", image: "/product.png" },
  ];

  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (filters.category !== "all") {
      data = data.filter((p) => p.category === filters.category);
    }
    data = data.filter((p) => p.price <= filters.priceRange[1]);

    if (filters.sort === "price-asc") data.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-desc") data.sort((a, b) => b.price - a.price);
    else if (filters.sort === "date-asc") data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else if (filters.sort === "date-desc") data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return data;
  }, [filters, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

  // 👉 Save to localStorage with feedback
  const handleAddToCart = (product: Product) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    existing.push(product);
    localStorage.setItem("cart", JSON.stringify(existing));

    // show feedback
    setMessage(`${product.title} added to cart`);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <div className="relative w-full px-2 md:px-5">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="font-medium text-lg text-gray-800">
          {filteredProducts.length} Products
        </h2>

        <Select
          value={filters.sort}
          onValueChange={(val) => setFilters((prev) => ({ ...prev, sort: val }))}
        >
          <SelectTrigger className="w-[200px] h-[40px] border border-black rounded-none">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="date-asc">Date: Oldest First</SelectItem>
            <SelectItem value="date-desc">Date: Newest First</SelectItem>
          </SelectContent>
        </Select>
      </header>

      {/* Success message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
          {message}
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {paginatedProducts.map((product) => (
          <Card key={product.id} className="w-full bg-transparent border-none shadow-none">
            <CardContent className="p-0 relative">
              <img className="w-full h-[350px] object-cover" alt={product.title} src={product.image} />
              <div className="text-center mt-4">
                <h3 className="font-semibold text-lg text-gray-900">{product.title}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#bb8116] hover:bg-[#a0701a] rounded-[21.88px] h-11 mt-3"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  <span className="font-medium text-white text-sm">Add to Cart</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pb-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            variant="ghost"
            onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
            className={`w-[34px] h-[34px] p-0 rounded-none ${filters.page === i + 1 ? "bg-black text-white" : "bg-transparent text-black"
              }`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
