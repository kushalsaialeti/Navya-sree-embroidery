export interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    description: string;
    material: string;
    rating: number;
}

export const products: Product[] = [
    {
        id: "1",
        title: "Royal Lavender Maggam Work Blouse",
        category: "Blouses",
        price: 8500,
        image: "https://placehold.co/600x800/C8A2C8/FFFFFF?text=Royal+Lavender",
        description: "Intricate maggam work on royal lavender silk, featuring zardosi and bead work.",
        material: "Pure Silk",
        rating: 4.8,
    },
    {
        id: "2",
        title: "Emerald Green Bridal Saree",
        category: "Sarees",
        price: 25000,
        image: "https://placehold.co/600x800/2E8B57/FFFFFF?text=Emerald+Green",
        description: "Hand-embroidered bridal saree with heavy border and pallu work.",
        material: "Kanjeevaram Silk",
        rating: 5.0,
    },
    {
        id: "3",
        title: "Floral Pastel Pink Lehanga",
        category: "Traditional",
        price: 15000,
        image: "https://placehold.co/600x800/FFB6C1/FFFFFF?text=Pastel+Pink",
        description: "Delicate floral embroidery on pastel pink net fabric, perfect for receptions.",
        material: "Net & Silk",
        rating: 4.7,
    },
    {
        id: "4",
        title: "Silver Thread Work Blouse",
        category: "Blouses",
        price: 6500,
        image: "https://placehold.co/600x800/C0C0C0/000000?text=Silver+Thread",
        description: "Elegant silver thread work on black velvet, suitable for evening wear.",
        material: "Velvet",
        rating: 4.6,
    },
    {
        id: "5",
        title: "Custom Portrait Embroidery",
        category: "Modern",
        price: 12000,
        image: "https://placehold.co/600x800/6B4570/FFFFFF?text=Portrait+Work",
        description: "Customized portrait embroidery on back of the blouse, a unique statement piece.",
        material: "Raw Silk",
        rating: 4.9,
    },
];

export const categories = [
    { name: "All", value: "all" },
    { name: "Blouses", value: "Blouses" },
    { name: "Sarees", value: "Sarees" },
    { name: "Bridal", value: "Bridal" },
    { name: "Traditional", value: "Traditional" },
    { name: "Modern", value: "Modern" },
];
