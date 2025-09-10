"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const CartLink = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Load from localStorage
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        setCount(stored.length);

        // listen for changes from other components
        const handleStorageChange = () => {
            const updated = JSON.parse(localStorage.getItem("cart") || "[]");
            setCount(updated.length);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <Link
            href="/cart"
            className="flex items-center bg-[#bb8116] hover:bg-[#a0701a] rounded-[21.88px] h-11 px-4"
        >
            <ShoppingCart className="w-5 h-5 mr-2 text-white" />
            <span className="font-medium text-white text-sm">
                {count} {count === 1 ? "item" : "items"}
            </span>
        </Link>
    );
};
