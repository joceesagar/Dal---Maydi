"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    date: string;
    image: string;
}

const CartSection = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(stored);
    }, []);

    const handleRemove = (id: number) => {
        const updated = cart.filter((p) => p.id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    return (
        <div className="relative w-full px-2 md:px-5">
            <h2 className="font-medium text-lg text-gray-800 mb-6">
                {cart.length} items in Cart
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {cart.map((product) => (
                    <Card key={product.id} className="w-full bg-transparent border-none shadow-none">
                        <CardContent className="p-0 relative">
                            <img className="w-full h-[350px] object-cover" alt={product.title} src={product.image} />
                            <div className="text-center mt-4">
                                <h3 className="font-semibold text-lg text-gray-900">{product.title}</h3>
                                <p className="text-gray-600">${product.price.toFixed(2)}</p>

                                <Button
                                    onClick={() => handleRemove(product.id)}
                                    className="bg-red-600 hover:bg-red-700 rounded-[21.88px] h-11 mt-3"
                                >
                                    <Trash2 className="w-5 h-5 mr-2" />
                                    <span className="font-medium text-white text-sm">Remove</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CartSection
