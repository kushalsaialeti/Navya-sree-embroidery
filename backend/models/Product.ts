import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: { type: [String], required: true },
        inStock: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
