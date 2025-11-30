import connectDB from "../config/db";
import Product, { IProduct } from "../models/Product";

export const getAllProducts = async () => {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return products;
};

export const createProduct = async (data: Partial<IProduct>) => {
    await connectDB();
    const slug = data.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const product = await Product.create({ ...data, slug });
    return product;
};

export const getProductById = async (id: string) => {
    await connectDB();
    const product = await Product.findById(id);
    return product;
};
