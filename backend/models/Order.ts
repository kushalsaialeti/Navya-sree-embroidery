import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
    productId: string;
    title: string;
    quantity: number;
    price: number;
    size?: string;
}

export interface IOrder extends Document {
    customerName: string;
    contactNumber: string;
    status: "New" | "Processing" | "Completed" | "Cancelled";
    items: IOrderItem[];
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        customerName: { type: String, required: true },
        contactNumber: { type: String, required: true },
        status: {
            type: String,
            enum: ["New", "Processing", "Completed", "Cancelled"],
            default: "New",
        },
        items: [
            {
                productId: { type: String, required: true },
                title: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true },
                size: { type: String },
            },
        ],
        totalAmount: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
