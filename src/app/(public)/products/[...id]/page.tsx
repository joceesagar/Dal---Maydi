"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  tags: string[];
  volumes?: string[];
  bundles?: string[]; // Simple array of strings
  createdAt: string;
  updatedAt: string;
}

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBundle, setSelectedBundle] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

        if (data) {
          setProduct(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  const volumeOptions = product?.volumes || ["10ml/33oz", "15ml/50oz"];

  // Default bundles if none provided
  const bundleOptions = product?.bundles || ["Buy One", "Buy Two", "Buy Three"];

  // Calculate prices based on bundle selection
  const calculateBundlePrice = (bundleIndex: number) => {
    if (!product) return 0;

    const basePrice = product.price;

    switch (bundleIndex) {
      case 0: // Buy One
        return basePrice;
      case 1: // Buy Two
        return basePrice * 2 * 0.9; // 10% discount
      case 2: // Buy Three
        return basePrice * 3 * 0.8; // 20% discount
      default:
        return basePrice;
    }
  };

  const calculateOriginalPrice = (bundleIndex: number) => {
    if (!product) return 0;

    const basePrice = product.price;

    switch (bundleIndex) {
      case 0: // Buy One
        return null;
      case 1: // Buy Two
        return basePrice * 2;
      case 2: // Buy Three
        return basePrice * 3;
      default:
        return null;
    }
  };

  const getBundleSubtitle = (bundleIndex: number) => {
    switch (bundleIndex) {
      case 0:
        return "Standard Price";
      case 1:
        return "You Save 10%";
      case 2:
        return "You Save 20%";
      default:
        return "";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleAddToCart = (buyNow = false) => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      title: product.title,
      price: calculateBundlePrice(selectedBundle),
      image: product.images[0] || "/product-oil.png",
      quantity: selectedBundle === 0 ? 1 : selectedBundle === 1 ? 2 : 3,
      bundle: bundleOptions[selectedBundle],
      volume: volumeOptions[selectedVolume]
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in cart
    const existingIndex = existingCart.findIndex((item: any) =>
      item.id === cartItem.id &&
      item.bundle === cartItem.bundle &&
      item.volume === cartItem.volume
    );

    if (existingIndex >= 0) {
      // Update quantity if product exists
      existingCart[existingIndex].quantity += cartItem.quantity;
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Update cart count in other components
    window.dispatchEvent(new Event("storage"));

    // Show feedback
    setMessage(`${product.title} added to cart`);
    setTimeout(() => setMessage(null), 2000);

    // Redirect to cart if "Buy Now" was clicked
    if (buyNow) {
      router.push("/cart");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f8f8f8] min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b87f14]"></div>
          <p className="text-[#183b56]">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#f8f8f8] min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium text-[#183b56] mb-2">Error Loading Product</h3>
          <p className="text-[#5a7184]">{error || "Product not found"}</p>
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
    <div className="bg-[#f8f8f8] min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-[#f8f8f8] px-4">
        {/* Success message */}
        {message && (
          <div className="fixed top-4 right-4 z-50 p-3 bg-green-100 text-green-700 rounded-md text-sm shadow-lg">
            {message}
          </div>
        )}

        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 pt-[120px] pb-16">
          {/* Product Image Section */}
          <div className="w-full lg:w-[610px] h-auto lg:h-[599px] relative flex-shrink-0 lg:ml-[96px]">
            <img
              className="w-full h-full rounded-[15.57px] object-cover"
              alt={product.title}
              src={product.images[0] || "/rectangle-3.png"}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/rectangle-3.png";
              }}
            />
          </div>

          {/* Product Details Section */}
          <div className="flex-1 pt-1">
            {/* Heart Icon */}

            {/* Product Title */}
            <div className="flex items-center gap-5">
              <div>
                <h1 className="[font-family:'Poppins',Helvetica] font-medium text-gray-900 text-3xl lg:text-5xl tracking-[0] leading-[normal]">
                  {product.title}
                </h1>
              </div>

              <div
                className={`rounded-full flex items-center justify-center w-[50px] h-[50px] cursor-pointer ${isFavorite ? "bg-red-100" : "bg-[#D9D9D97D]"
                  }`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={isFavorite ? "text-red-500 fill-red-500" : ""} />
              </div>
            </div>

            {/* Product Description */}
            <p className="[font-family:'Poppins',Helvetica] font-normal max-w-xl text-gray-500 text-base tracking-[0] leading-[normal] mb-[32px]">
              {product.description}
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center gap-[15px] mb-[12px]">
              {product.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex w-auto h-12 items-center justify-center gap-[3.46px] px-3 py-1.5 bg-gray-100 rounded-lg [font-family:'Poppins',Helvetica] font-normal text-gray-700 text-xs text-center tracking-[0] leading-[normal]"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Volume Selection */}
            <div className="mb-[34px] flex flex-col items-start">
              <div className="[font-family:'Poppins',Helvetica] font-medium text-black text-base text-center tracking-[0] leading-[normal] mb-[12px]">
                Volume
              </div>

              <div className="flex gap-5 flex-wrap">
                {volumeOptions.map((volume, index) => (
                  <Button
                    key={index}
                    variant={selectedVolume === index ? "outline" : "ghost"}
                    className={`w-full sm:w-[239px] h-11 items-center justify-center gap-[3.46px] px-[12.11px] py-[3.46px] ${selectedVolume === index
                      ? "bg-white rounded-[6.92px] border-[0.69px] border-solid border-gray-900"
                      : "bg-[#f8f8f8] rounded-[6.92px] border-[0.69px] border-solid border-[#0000001c]"
                      } [font-family:'Poppins',Helvetica] font-normal text-gray-900 text-base text-center tracking-[0] leading-[normal]`}
                    onClick={() => setSelectedVolume(index)}
                  >
                    {volume}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bundle Selection */}
            <div className="mb-[34px] flex flex-col items-start">
              <div className="[font-family:'Poppins',Helvetica] font-medium text-black text-base text-center tracking-[0] leading-[normal] mb-[12px]">
                Bundle &amp; Save
              </div>

              <div className="flex gap-[13px] flex-wrap">
                {bundleOptions.map((bundle, index) => {
                  const isSelected = selectedBundle === index;
                  const bundlePrice = calculateBundlePrice(index);
                  const originalPrice = calculateOriginalPrice(index);

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedBundle(index)}
                      className={`
                    flex-1 min-w-[160px] border border-gray-200 h-[89px] p-3 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between
                    ${isSelected
                          ? "bg-gray-900 text-white"
                          : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                        }
                  `}
                    >
                      <div className="flex justify-end">
                        <div className="text-right">
                          <div
                            className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-900"
                              }`}
                          >
                            {formatPrice(bundlePrice)}
                          </div>
                          {originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                              {formatPrice(originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div
                          className={`font-medium text-xs ${isSelected ? "text-white" : "text-gray-900"
                            }`}
                        >
                          {bundle}
                        </div>
                        <div
                          className={`text-xs font-light ${isSelected ? "text-gray-300" : "text-gray-500"
                            }`}
                        >
                          {getBundleSubtitle(index)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 flex flex-col justify-end max-w-lg">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="w-full sm:w-[245px] h-[50px] rounded-[12.11px] border-[1.5px] border-solid border-black [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]"
                  onClick={() => handleAddToCart(false)}
                >
                  Add to Cart
                </Button>

                <Button
                  className="w-full sm:w-[245px] h-[50px] bg-gray-900 rounded-[12.11px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]"
                  onClick={() => handleAddToCart(true)}
                >
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="grid grid-rows-2 gap-4 h-[700px]">
              {/* Wide image - top left (full width of left column) */}
              <div className="bg-pink-50 overflow-hidden shadow-sm rounded-lg">
                <img
                  src={product.images[0] || "/product-detail.png"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/product-detail.png";
                  }}
                />
              </div>

              {/* Bottom row - two half-width images */}
              <div className="grid grid-cols-2 gap-4">
                {/* Bottom left image */}
                <div className="bg-pink-50 overflow-hidden shadow-sm rounded-lg">
                  <img
                    src={product.images[1] || "/product-detail.png"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/product-detail.png";
                    }}
                  />
                </div>

                {/* Bottom center image */}
                <div className="bg-pink-50 overflow-hidden shadow-sm rounded-lg">
                  <img
                    src={product.images[2] || "/product-detail.png"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/product-detail.png";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - single tall image */}
            <div className="bg-pink-50 overflow-hidden shadow-sm h-[700px] rounded-lg">
              <img
                src={product.images[3] || "/product-detail.png"}
                alt={product.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/product-detail.png";
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;