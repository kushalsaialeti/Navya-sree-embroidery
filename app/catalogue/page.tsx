import React, { Suspense } from "react";
import { getAllProducts } from "@/backend/controllers/productController";
import CatalogueView from "@/components/features/CatalogueView";

export const dynamic = "force-dynamic";

async function CatalogueContent() {
    const products = await getAllProducts();
    // Serialize the data to pass to client component (convert _id to string if needed, or let Next.js handle it if it's simple JSON)
    // Mongoose documents need to be converted to plain objects usually
    const plainProducts = JSON.parse(JSON.stringify(products));

    return <CatalogueView initialProducts={plainProducts} />;
}

export default function CataloguePage() {
    return (
        <div className="min-h-screen bg-background pb-16">
            {/* Header */}
            <div className="bg-secondary/30 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                        Our Collection
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our wide range of hand-embroidered designs, from traditional
                        classics to modern masterpieces.
                    </p>
                </div>
            </div>

            <Suspense
                fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        Loading...
                    </div>
                }
            >
                <CatalogueContent />
            </Suspense>
        </div>
    );
}
