"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
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
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

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
  products: Product[];
  loading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as any } },
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as any } },
};

export const ProductGridSection = ({ filters, setFilters, products, loading }: GridProps) => {
  const [message, setMessage] = React.useState<string | null>(null);
  const router = useRouter();
  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (filters.category !== "all") data = data.filter((p) => p.category === filters.category);
    data = data.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.sort === "price-asc") data.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-desc") data.sort((a, b) => b.price - a.price);
    else if (filters.sort === "date-asc")
      data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (filters.sort === "date-desc")
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return data;
  }, [filters, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

  const getProductImage = (product: Product) =>
    product.images && product.images.length > 0 ? product.images[0] : "/product-oil.png";

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  const handleAddToCart = (product: Product) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existing.findIndex((item: Product) => item.id === product.id);
    if (existingIndex >= 0) existing[existingIndex] = product;
    else existing.push(product);
    localStorage.setItem("cart", JSON.stringify(existing));
    setMessage(`${product.title} added to cart`);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <motion.div
      className="relative w-full px-2 md:px-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        variants={fadeInUp}
      >
        <h2 className="font-medium text-lg text-gray-800">
          {loading
            ? "Loading..."
            : `${filteredProducts.length} ${filteredProducts.length === 1 ? "Product" : "Products"}`}
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
      </motion.header>

      {/* Success message */}
      {message && (
        <motion.div
          className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}

      {/* Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="w-full h-full bg-transparent border-none shadow-none"
            >
              <CardContent className="p-0 w-full h-full">
                <Skeleton className="w-[320px] h-[420px] rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : paginatedProducts.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
          >
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <Card
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
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-2 pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
                  className={`w-[34px] h-[34px] p-0 rounded-none ${filters.page === i + 1
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                    }`}
                >
                  {i + 1}
                </Button>
              ))}
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          className="flex items-center justify-center h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-medium text-[#183b56] mb-2">No Products Found</h3>
            <p className="text-[#5a7184]">Try adjusting your filters to see more results.</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
