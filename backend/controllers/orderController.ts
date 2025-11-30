import connectDB from "../config/db";
import Order, { IOrder } from "../models/Order";

export const createOrder = async (data: Partial<IOrder>) => {
    await connectDB();
    const order = await Order.create(data);
    return order;
};

export const getOrders = async () => {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return orders;
};
