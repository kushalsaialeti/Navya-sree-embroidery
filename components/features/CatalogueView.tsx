"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import DesignCard from "@/components/features/DesignCard";

// Define the Product interface based on your Mongoose model but for frontend
interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    inStock: boolean;
}

interface CatalogueViewProps {
    initialProducts: Product[];
}

const categories = [
    { name: "All", value: "all" },
    { name: "Blouses", value: "Blouses" },
    { name: "Sarees", value: "Sarees" },
    { name: "Traditional", value: "Traditional" },
    { name: "Modern", value: "Modern" },
];

export default function CatalogueView({ initialProducts }: CatalogueViewProps) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "all";
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    // Map backend product structure to frontend DesignCard props if needed
    // But DesignCard expects: id, title, category, price, image, description
    // The backend returns: _id, title, category, price, images[], description
    // So we need to map it on the fly or pre-map it.

    const mappedProducts = initialProducts.map(p => ({
        id: p._id.toString(),
        title: p.title,
        category: p.category,
        price: p.price,
        image: p.images[0] || "https://placehold.co/600x800",
        description: p.description,
        material: "Premium Silk", // Default or add to model
        rating: 4.8, // Default
    }));

    const filteredProducts =
        activeCategory === "all" || activeCategory === "All"
            ? mappedProducts
            : mappedProducts.filter((p) => p.category === activeCategory);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <aside className="hidden lg:block w-64 shrink-0 space-y-8">
                    <div>
                        <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                            <Filter className="h-5 w-5" /> Filters
                        </h3>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeCategory === cat.value
                                            ? "bg-primary text-primary-foreground font-medium"
                                            : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Mobile Filters */}
                <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <Button
                            key={cat.name}
                            variant={activeCategory === cat.value ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setActiveCategory(cat.value)}
                            className="whitespace-nowrap"
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredProducts.length}
                            </span>{" "}
                            results
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <DesignCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/50 rounded-xl">
                            <p className="text-muted-foreground text-lg">
                                No products found in this category.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => setActiveCategory("all")}
                            >
                                View All Products
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
