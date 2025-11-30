import { getOrders } from "@/backend/controllers/orderController";
import { Badge } from "@/components/ui/Badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const orders = await getOrders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold text-foreground">
                    Orders Dashboard
                </h1>
                <Badge variant="outline" className="text-lg px-4 py-1">
                    Total Orders: {orders.length}
                </Badge>
            </div>

            <div className="rounded-md border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order: any) => (
                                <TableRow key={order._id}>
                                    <TableCell className="font-mono text-xs">
                                        {order._id.toString().slice(-6)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {order.customerName}
                                    </TableCell>
                                    <TableCell>{order.contactNumber}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="text-sm">
                                                    {item.quantity}x {item.title} ({item.size})
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
