"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8">
                {/* Animated Circle Background */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-32 w-32 rounded-full bg-green-100 flex items-center justify-center"
                >
                    {/* Animated Checkmark */}
                    <svg
                        className="h-16 w-16 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>

                {/* Floating particles/confetti effect (simplified) */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.4 + Math.random() * 0.2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                        className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-green-400"
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4 max-w-md"
            >
                <h2 className="text-3xl font-serif font-bold text-foreground">
                    Order Request Sent!
                </h2>
                <p className="text-muted-foreground text-lg">
                    Thank you for your interest. We have received your order request and will contact you shortly via WhatsApp or Phone to confirm details and payment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Home className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                    <Link href="/catalogue">
                        <Button className="w-full sm:w-auto">
                            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
