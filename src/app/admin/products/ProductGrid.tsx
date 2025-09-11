"use client";
import React from "react";
import { Edit2, Trash2, Eye, Image, Package } from "lucide-react";

const ProductGrid = ({ products, loading, onView, onEdit, onDelete }: any) => {
    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <Package className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No products found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {products.map((product: any) => (
                <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md">
                    <div className="aspect-square bg-gray-100 relative">
                        {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Image className="text-gray-400" size={40} />
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2 truncate">{product.title}</h3>
                        <p className="text-green-600 font-semibold mb-3">${product.price}</p>
                        <div className="flex gap-2">
                            <button onClick={() => onView(product)} className="flex-1 bg-gray-100 px-3 py-1.5 rounded">
                                <Eye size={14} /> View
                            </button>
                            <button onClick={() => onEdit(product)} className="flex-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded">
                                <Edit2 size={14} /> Edit
                            </button>
                            <button onClick={() => onDelete(product)} className="flex-1 bg-red-50 text-red-600 px-3 py-1.5 rounded">
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
