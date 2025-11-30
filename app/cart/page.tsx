"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import OrderSuccess from "@/components/checkout/OrderSuccess";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error on typing
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.name.trim() || !formData.phone.trim()) {
            setError("Please enter both your Name and Phone Number.");
            return;
        }

        if (formData.phone.trim().length < 10) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: formData.name,
                    contactNumber: formData.phone,
                    items: cart.map(item => ({
                        productId: item.id,
                        title: item.title,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.selectedSize
                    })),
                    totalAmount: cartTotal
                }),
            });

            if (res.ok) {
                clearCart();
                setIsSuccess(true);
                window.scrollTo(0, 0);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to place order. Please try again.");
            }
        } catch (err) {
            console.error("Order error:", err);
            setError("An error occurred. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return <OrderSuccess />;
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
                <div className="h-24 w-24 rounded-full bg-secondary/30 flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground text-center max-w-sm">
                    Looks like you haven't added any exquisite pieces to your collection yet.
                </p>
                <Link href="/catalogue">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.cartId}
                                className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border border-border bg-card shadow-sm"
                            >
                                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-md bg-muted">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-serif text-lg font-semibold text-foreground">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{item.category}</p>
                                            <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>Size: <span className="font-medium text-foreground">{item.selectedSize}</span></span>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-lg text-primary">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>

                                    {item.note && (
                                        <div className="mt-3 bg-muted p-3 rounded-md text-sm text-muted-foreground italic border border-border">
                                            " {item.note} "
                                        </div>
                                    )}

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-muted-foreground">Qty:</span>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.cartId, parseInt(e.target.value))}
                                                className="rounded-md border border-input bg-background py-1 px-2 text-sm text-foreground focus:border-primary focus:outline-none"
                                            >
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary & Checkout Form */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sticky top-24">
                            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                            <div className="space-y-4 text-sm text-muted-foreground">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping Estimate</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax Estimate</span>
                                    <span>Calculated at checkout</span>
                                </div>

                                <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg text-foreground">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Guest Checkout Form */}
                            <div className="mt-8 space-y-4">
                                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-4">
                                    <h3 className="font-medium text-primary mb-2 text-sm">Guest Checkout</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Enter your details below. We will contact you to confirm the order.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Priya Sharma"
                                        className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${error && !formData.name ? 'border-red-500' : 'border-input'}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 9876543210"
                                        className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${error && (!formData.phone || formData.phone.length < 10) ? 'border-red-500' : 'border-input'}`}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <Button
                                size="lg"
                                className="w-full mt-6 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Order Request <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            <p className="mt-4 text-xs text-center text-muted-foreground">
                                By clicking send, you agree to be contacted regarding this order.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
