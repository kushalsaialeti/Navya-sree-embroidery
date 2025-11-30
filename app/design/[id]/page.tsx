"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";

export default function DesignDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    // const product = products.find((p) => p.id === id); // Removed mock data lookup

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("M");
    const [note, setNote] = useState("");

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    // Transform data to match UI expectations
                    setProduct({
                        ...data,
                        id: data._id,
                        image: data.images ? data.images[0] : "",
                        rating: 4.8, // Default
                        material: "Premium Silk", // Default
                    });
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-serif text-foreground">Product Not Found</h2>
                <Button variant="outline" className="mt-4" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, selectedSize, quantity, note);
        // Could add a toast notification here
        router.push("/cart");
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Collection
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-lg">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 ring-primary transition-all">
                                    <Image
                                        src={product.image}
                                        alt={`View ${i}`}
                                        fill
                                        className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                <div className="flex items-center text-yellow-500 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-current mr-1" />
                                    {product.rating}
                                </div>
                            </div>
                            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                                {product.title}
                            </h1>
                            <p className="mt-4 text-2xl font-semibold text-primary">
                                ₹{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="prose prose-sm text-muted-foreground">
                            <p>{product.description}</p>
                            <ul className="mt-4 space-y-1 list-disc list-inside">
                                <li>Material: {product.material}</li>
                                <li>Hand-embroidered detailing</li>
                                <li>Customizable fit</li>
                            </ul>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-border">
                            {/* Size Selector */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-3">
                                    Select Size
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${selectedSize === size
                                                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2"
                                                : "bg-background border border-border text-foreground hover:border-primary"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center rounded-md border border-border bg-background">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-muted text-foreground"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 hover:bg-muted text-foreground"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Note */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Customization Note (Optional)
                                </label>
                                <textarea
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-foreground"
                                    rows={3}
                                    placeholder="E.g., Change thread color to gold, sleeve length 10 inches..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" className="flex-1 text-lg h-14" onClick={handleAddToCart}>
                                    <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-6">
                                    <Heart className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
