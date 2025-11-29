"use client";

import React from "react";
import Image from "next/image";
import { User, Package, Heart, MapPin, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ProfilePage() {
    // Demo User Data
    const user = {
        name: "Sushma Reddy",
        email: "sushma.reddy@example.com",
        phone: "+91 98765 43210",
        avatar: "https://placehold.co/200x200/047857/FFFFFF?text=SR",
        joined: "Member since Jan 2024",
        addresses: [
            {
                id: 1,
                type: "Home",
                address: "Flat 402, Emerald Heights, Jubilee Hills, Hyderabad, 500033",
                isDefault: true,
            },
        ],
        orders: [
            {
                id: "ORD-2024-001",
                date: "25 Nov 2024",
                status: "Processing",
                total: 8500,
                items: ["Royal Lavender Maggam Work Blouse"],
            },
            {
                id: "ORD-2023-089",
                date: "10 Oct 2023",
                status: "Delivered",
                total: 15000,
                items: ["Floral Pastel Pink Lehanga"],
            },
        ],
    };

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif text-3xl font-bold text-foreground mb-8">My Profile</h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-border">
                            <CardContent className="p-6 text-center space-y-4">
                                <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/10">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-serif text-xl font-semibold text-foreground">{user.name}</h2>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <Badge variant="secondary" className="mt-2">Gold Member</Badge>
                            </CardContent>
                        </Card>

                        <nav className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/10">
                                <User className="mr-3 h-5 w-5" /> Personal Details
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/10">
                                <Package className="mr-3 h-5 w-5" /> My Orders
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/10">
                                <Heart className="mr-3 h-5 w-5" /> Wishlist
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/10">
                                <MapPin className="mr-3 h-5 w-5" /> Addresses
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/10">
                                <Settings className="mr-3 h-5 w-5" /> Settings
                            </Button>
                            <div className="pt-4 border-t border-border mt-4">
                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <LogOut className="mr-3 h-5 w-5" /> Logout
                                </Button>
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Recent Orders */}
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle className="text-xl font-serif text-foreground">Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {user.orders.map((order) => (
                                        <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-muted/30 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-foreground">{order.id}</span>
                                                    <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                                                <p className="text-sm text-foreground font-medium">{order.items.join(", ")}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-primary">₹{order.total.toLocaleString()}</p>
                                                <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Saved Addresses */}
                        <Card className="border-border">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl font-serif text-foreground">Saved Addresses</CardTitle>
                                <Button size="sm" variant="outline">Add New</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {user.addresses.map((addr) => (
                                        <div key={addr.id} className="p-4 rounded-lg border border-border bg-muted/30 relative group">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="outline" className="bg-background">{addr.type}</Badge>
                                                {addr.isDefault && <span className="text-xs text-primary font-medium">Default</span>}
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {addr.address}
                                            </p>
                                            <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">Edit</Button>
                                                <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500">Delete</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
