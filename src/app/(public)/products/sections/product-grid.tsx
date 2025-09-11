"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

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

  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (filters.category !== "all") {
      data = data.filter((p) => p.category === filters.category);
    }

    data = data.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.sort === "price-asc") data.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-desc") data.sort((a, b) => b.price - a.price);
    else if (filters.sort === "date-asc") data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (filters.sort === "date-desc") data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return data;
  }, [filters, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

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

  const handleAddToCart = (product: Product) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existing.findIndex((item: Product) => item.id === product.id);

    if (existingIndex >= 0) {
      existing[existingIndex] = product;
    } else {
      existing.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existing));

    setMessage(`${product.title} added to cart`);
    setTimeout(() => setMessage(null), 2000);
  };

  if (loading) {
    return (
      <div className="relative w-full px-2 md:px-5 flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#b87f14]" />
          <p className="text-[#183b56]">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full px-2 md:px-5 flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-medium text-[#183b56] mb-2">Error Loading Products</h3>
          <p className="text-[#5a7184]">{error}</p>
          <Button
            className="mt-4 bg-[#b87f14] hover:bg-[#a06f12]"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full px-2 md:px-5">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="font-medium text-lg text-gray-800">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </h2>

        <Select
          value={filters.sort}
          onValueChange={(val) => setFilters((prev) => ({ ...prev, sort: val, page: 1 }))}
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
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedProducts.map((product) => (
              <Card
                key={product.id}
                className="w-full bg-transparent border-none shadow-none cursor-pointer group"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <CardContent className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={product.title}
                      src={getProductImage(product)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/product-oil.png";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-[#b87f14] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#b87f14] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 capitalize">{product.category}</p>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
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
          {totalPages > 1 && (
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
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-xl font-medium text-[#183b56] mb-2">No Products Found</h3>
            <p className="text-[#5a7184]">Try adjusting your filters to see more results.</p>
          </div>
        </div>
      )}
    </div>
  );
};