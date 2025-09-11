"use client";

import { motion, Variants } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { CartLink } from "./(public)/products/sections/cart-items";

const containerVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0, transformOrigin: "center" },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
        },
    },
};

const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.6 + i * 0.15,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const contentVariantsRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.6 + i * 0.15,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

export function Header() {
    return (
        <motion.header
            className="w-full bg-[#feffef] border-b border-border py-4 md:py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ originX: 0.5 }}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
                <div className="flex justify-between items-center">
                    <motion.div
                        className="flex-shrink-0"
                        variants={contentVariants}
                        custom={0}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="font-semibold text-[#bc8217] text-lg sm:text-xl md:text-[25.2px]">
                            Dal - Maydi
                        </div>
                    </motion.div>

                    <motion.div
                        className="hidden md:block"
                        variants={contentVariantsRight}
                        custom={1}
                        initial="hidden"
                        animate="visible"
                    >
                        <Navigation />
                    </motion.div>

                    <motion.div
                        variants={contentVariantsRight}
                        custom={2}
                        initial="hidden"
                        animate="visible"
                    >
                        <CartLink />
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
}