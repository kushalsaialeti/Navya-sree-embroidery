import { NextResponse } from "next/server";
import { createOrder, getOrders } from "@/backend/controllers/orderController";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const order = await createOrder(data);
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const orders = await getOrders();
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
