import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";

dotenv.config({ path: ".env.local" });

const products = [
    {
        id: "1",
        title: "Royal Lavender Maggam Work Blouse",
        category: "Blouses",
        price: 8500,
        image: "https://placehold.co/600x800/C8A2C8/FFFFFF?text=Royal+Lavender",
        description:
            "Intricate maggam work on royal lavender silk, featuring zardosi and bead work.",
        material: "Pure Silk",
        rating: 4.8,
    },
    {
        id: "2",
        title: "Emerald Green Bridal Saree",
        category: "Sarees",
        price: 25000,
        image: "https://placehold.co/600x800/2E8B57/FFFFFF?text=Emerald+Green",
        description:
            "Hand-embroidered bridal saree with heavy border and pallu work.",
        material: "Kanjeevaram Silk",
        rating: 5.0,
    },
    {
        id: "3",
        title: "Floral Pastel Pink Lehanga",
        category: "Traditional",
        price: 15000,
        image: "https://placehold.co/600x800/FFB6C1/FFFFFF?text=Pastel+Pink",
        description:
            "Delicate floral embroidery on pastel pink net fabric, perfect for receptions.",
        material: "Net & Silk",
        rating: 4.7,
    },
    {
        id: "4",
        title: "Silver Thread Work Blouse",
        category: "Blouses",
        price: 6500,
        image: "https://placehold.co/600x800/C0C0C0/000000?text=Silver+Thread",
        description:
            "Elegant silver thread work on black velvet, suitable for evening wear.",
        material: "Velvet",
        rating: 4.6,
    },
    {
        id: "5",
        title: "Custom Portrait Embroidery",
        category: "Modern",
        price: 12000,
        image: "https://placehold.co/600x800/6B4570/FFFFFF?text=Portrait+Work",
        description:
            "Customized portrait embroidery on back of the blouse, a unique statement piece.",
        material: "Raw Silk",
        rating: 4.9,
    },
];

const seedData = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env.local");
        }

        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Transform mock data to match schema
        const productsToInsert = products.map((p) => ({
            title: p.title,
            slug: p.id, // Using ID as slug for simplicity based on mock data
            description: p.description,
            price: p.price,
            category: p.category,
            images: [p.image], // Mock data has single image, schema expects array
            inStock: true,
        }));

        await Product.insertMany(productsToInsert);
        console.log("Seeded products successfully");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
