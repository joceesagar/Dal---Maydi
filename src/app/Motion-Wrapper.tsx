"use client";
import { motion } from "framer-motion";

export const FadeInUp = ({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
        {children}
    </motion.div>
);

export const FadeInLeft = ({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
        {children}
    </motion.div>
);

export const FadeInRight = ({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
        {children}
    </motion.div>
);
