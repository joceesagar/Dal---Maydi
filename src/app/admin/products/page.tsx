"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Plus, Search, X } from "lucide-react";
import { toast } from "react-hot-toast";

import ProductModal from "./ProductModal";
import ProductForm from "./ProductForm";
import ProductGrid from "./ProductGrid";
import ProductView from "./ProductView";

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    price: "",
    tags: [],
    images: [],
    category: "",
    volumes: [],
    bundles: [],
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return uniqueCategories;
  }, [products]);

  const fetchProducts = async (search = "", categoryFilter = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (categoryFilter.trim()) params.append('category', categoryFilter.trim());

      const url = `/api/products${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm, category);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCategory("");
    fetchProducts("", "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const method = showEditModal ? "PUT" : "POST";
      const url = showEditModal ? `/api/products/${selectedProduct?.id}` : "/api/products";

      const payload = { ...formData, price: parseFloat(formData.price) };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(showEditModal ? "Product updated!" : "Product created!");
        fetchProducts(searchTerm, category);
        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to save product");
      }
    } catch (error) {
      toast.error("Network error occurred");
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      tags: [],
      images: [],
      category: "",
      volumes: [],
      bundles: [],
    });
  };

  const handleDelete = async (product: any) => {
    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) return;

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(`Deleted ${product.title}`);
        fetchProducts(searchTerm, category);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Network error occurred");
      console.error("Delete error:", error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setImageUploading(true);
    const uploadedImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 10MB)`);
          continue;
        }

        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not an image`);
          continue;
        }

        const timestamp = Math.round(new Date().getTime() / 1000);

        const paramsToSign = {
          timestamp: timestamp,
        };

        const signatureResponse = await fetch('/api/sign-cloudinary-params', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paramsToSign }),
        });

        if (!signatureResponse.ok) {
          const errorText = await signatureResponse.text();
          console.error('Signature API error:', errorText);
          throw new Error(`Failed to get signature: ${signatureResponse.status}`);
        }

        const { signature } = await signatureResponse.json();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp.toString());
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

        Object.entries(paramsToSign).forEach(([key, value]) => {
          if (key !== 'timestamp') {
            formData.append(key, value.toString());
          }
        });

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          uploadedImages.push(data.secure_url);
        } else {
          const errorData = await response.text();
          console.error('Cloudinary upload error:', errorData);
          throw new Error(`Upload failed: ${response.status} - ${errorData}`);
        }
      }

      if (uploadedImages.length > 0) {
        setFormData((prev: any) => ({
          ...prev,
          images: [...prev.images, ...uploadedImages],
        }));

        toast.success(`${uploadedImages.length} image(s) uploaded successfully!`);
      }
    } catch (error) {
      toast.error("Failed to upload images");
      console.error("Upload error:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (i: number) => {
    setFormData((prev: any) => ({ ...prev, images: prev.images.filter((_: any, idx: number) => idx !== i) }));
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                if (!category) fetchProducts("", "");
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Search size={16} /> Search
        </button>

        {(searchTerm || category) && (
          <button
            type="button"
            onClick={clearSearch}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <X size={16} /> Clear
          </button>
        )}
      </form>

      {/* Active Filters Display */}
      {(searchTerm || category) && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              Search: "{searchTerm}"
            </span>
          )}
          {category && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
              Category: {category}
            </span>
          )}
        </div>
      )}

      {/* Products */}
      <ProductGrid
        products={products}
        loading={loading}
        onView={(p: any) => {
          setSelectedProduct(p);
          setShowViewModal(true);
        }}
        onEdit={(p: any) => {
          setSelectedProduct(p);
          setFormData({
            ...p,
            price: p.price.toString(),
          });
          setShowEditModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <ProductModal
        show={showAddModal || showEditModal}
        onClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          resetForm();
        }}
        title={showEditModal ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          submitting={submitting}
          showEditModal={showEditModal}
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          imageUploading={imageUploading}
          onCancel={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            resetForm();
          }}
        />
      </ProductModal>

      <ProductModal show={showViewModal} onClose={() => setShowViewModal(false)} title="Product Details">
        <ProductView product={selectedProduct} />
      </ProductModal>
    </div>
  );
};

export default ProductPage;