import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    avatar?: string;
    addresses: {
        id: string;
        type: string;
        address: string;
        isDefault: boolean;
    }[];
    wishlist: string[]; // Product IDs
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false }, // Optional for OAuth later
        phone: { type: String },
        avatar: { type: String, default: "https://placehold.co/200x200/047857/FFFFFF?text=User" },
        addresses: [
            {
                id: { type: String },
                type: { type: String },
                address: { type: String },
                isDefault: { type: Boolean, default: false },
            },
        ],
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
