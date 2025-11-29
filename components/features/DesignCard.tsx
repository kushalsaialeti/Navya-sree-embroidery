import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Product } from "@/lib/mockData";

interface DesignCardProps {
    product: Product;
}

const DesignCard = ({ product }: DesignCardProps) => {
    return (
        <Link href={`/design/${product.id}`} className="group block h-full">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 z-10">
                        <button className="rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-red-500">
                            <Heart className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="absolute top-3 left-3 z-10">
                        <Badge variant="secondary" className="backdrop-blur-md bg-background/90 text-foreground">
                            {product.category}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                    </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                        ₹{product.price.toLocaleString()}
                    </span>
                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default DesignCard;
