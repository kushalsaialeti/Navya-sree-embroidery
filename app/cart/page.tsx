"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

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

                    {/* Order Summary */}
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

                            {/* Checkout Form */}
                            <div className="mt-8 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        id="customerName"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Your Phone Number"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        id="contactNumber"
                                    />
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full mt-6 text-base"
                                onClick={async () => {
                                    const nameInput = document.getElementById("customerName") as HTMLInputElement;
                                    const phoneInput = document.getElementById("contactNumber") as HTMLInputElement;
                                    const name = nameInput.value;
                                    const phone = phoneInput.value;

                                    if (!name || !phone) {
                                        alert("Please enter your name and phone number.");
                                        return;
                                    }

                                    try {
                                        const res = await fetch("/api/orders", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                customerName: name,
                                                contactNumber: phone,
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
                                            alert("Order placed successfully! We will contact you shortly.");
                                            // clearCart(); // Need to expose clearCart from context if not already
                                            window.location.href = "/";
                                        } else {
                                            alert("Failed to place order. Please try again.");
                                        }
                                    } catch (error) {
                                        console.error("Order error:", error);
                                        alert("An error occurred. Please try again.");
                                    }
                                }}
                            >
                                Send Order Request <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <p className="mt-4 text-xs text-center text-muted-foreground">
                                This will send a request to our team via WhatsApp/Email for confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
