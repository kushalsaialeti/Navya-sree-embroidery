"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User, Package, Heart, MapPin, LogOut, Settings, Camera, Save, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const AVATARS = [
    "https://placehold.co/200x200/047857/FFFFFF?text=SR",
    "https://placehold.co/200x200/db2777/FFFFFF?text=SR",
    "https://placehold.co/200x200/2563eb/FFFFFF?text=SR",
    "https://placehold.co/200x200/d97706/FFFFFF?text=SR",
    "https://placehold.co/200x200/7c3aed/FFFFFF?text=SR",
    "https://placehold.co/200x200/dc2626/FFFFFF?text=SR",
];

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Satya vara lakshmi",
        email: "satyavaralakshmikokkirala@gmail.com",
        phone: "+91 9618631117",
        avatar: "https://placehold.co/200x200/047857/FFFFFF?text=SR",
        joined: "Member since Jan 2025",
    });

    // Load from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("navyasree_user_profile");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("navyasree_user_profile", JSON.stringify(user));
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reload from local storage to reset changes
        const savedUser = localStorage.getItem("navyasree_user_profile");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsEditing(false);
    };

    // Demo Data for non-editable sections
    const addresses = [
        {
            id: 1,
            type: "Home",
            address: "Flat 402, Emerald Heights, Jubilee Hills, Hyderabad, 500033",
            isDefault: true,
        },
    ];

    const orders = [
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
    ];

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="font-serif text-3xl font-bold text-foreground">My Profile</h1>
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                            <Settings className="h-4 w-4" /> Edit Profile
                        </Button>
                    )}
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-border">
                            <CardContent className="p-6 text-center space-y-4">
                                <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/10 group">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Camera className="h-6 w-6 text-white" />
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        {AVATARS.map((avatar, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setUser({ ...user, avatar })}
                                                className={`relative h-8 w-8 rounded-full overflow-hidden ring-2 ${user.avatar === avatar ? 'ring-primary' : 'ring-transparent'}`}
                                            >
                                                <Image src={avatar} alt={`Avatar ${index + 1}`} fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <h2 className="font-serif text-xl font-semibold text-foreground">{user.name}</h2>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <Badge variant="secondary" className="mt-2">Gold Member</Badge>
                            </CardContent>
                        </Card>

                        <nav className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/10 bg-secondary/10">
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
                            <div className="pt-4 border-t border-border mt-4">
                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <LogOut className="mr-3 h-5 w-5" /> Logout
                                </Button>
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Personal Details */}
                        <Card className="border-border">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl font-serif text-foreground">Personal Details</CardTitle>
                                {isEditing && (
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" onClick={handleCancel} className="text-muted-foreground">
                                            <X className="h-4 w-4 mr-1" /> Cancel
                                        </Button>
                                        <Button size="sm" onClick={handleSave}>
                                            <Save className="h-4 w-4 mr-1" /> Save Changes
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                        {isEditing ? (
                                            <Input
                                                value={user.name}
                                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            />
                                        ) : (
                                            <p className="text-foreground font-medium">{user.name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                        {isEditing ? (
                                            <Input
                                                value={user.email}
                                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            />
                                        ) : (
                                            <p className="text-foreground font-medium">{user.email}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                                        {isEditing ? (
                                            <Input
                                                value={user.phone}
                                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                            />
                                        ) : (
                                            <p className="text-foreground font-medium">{user.phone}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Joined Date</label>
                                        <p className="text-foreground font-medium">{user.joined}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle className="text-xl font-serif text-foreground">Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orders.map((order) => (
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
                                    {addresses.map((addr) => (
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
