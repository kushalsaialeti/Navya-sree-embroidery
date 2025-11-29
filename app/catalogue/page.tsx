"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import DesignCard from "@/components/features/DesignCard";
import { products, categories } from "@/lib/mockData";

function CatalogueContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "all";
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const filteredProducts = activeCategory === "all" || activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-background pb-16">
            {/* Header */}
            <div className="bg-secondary/30 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">Our Collection</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our wide range of hand-embroidered designs, from traditional classics to modern masterpieces.
                    </p>
                </div>
            </div>

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
                                Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> results
                            </p>
                            {/* Sort dropdown could go here */}
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <DesignCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/50 rounded-xl">
                                <p className="text-muted-foreground text-lg">No products found in this category.</p>
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
        </div>
    );
}

export default function CataloguePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CatalogueContent />
        </Suspense>
    );
}
