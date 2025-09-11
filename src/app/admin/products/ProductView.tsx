"use client";
import React from "react";

const ProductView = ({ product }: any) => {
    if (!product) return null;

    return (
        <div className="space-y-6">
            {/* Images */}
            {product.images?.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {product.images.map((img: string, i: number) => (
                        <img key={i} src={img} className="w-full h-32 object-cover rounded-lg border" />
                    ))}
                </div>
            )}

            {/* Info */}
            <h3 className="text-xl font-bold">{product.title}</h3>
            <p className="text-lg text-green-600">${product.price}</p>
            {product.description && <p className="text-gray-600">{product.description}</p>}
        </div>
    );
};

export default ProductView;
