import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="font-serif text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Total Revenue", value: "₹45,231", icon: DollarSign, color: "text-green-600" },
                    { title: "Orders", value: "+573", icon: ShoppingBag, color: "text-blue-600" },
                    { title: "Active Users", value: "2,345", icon: Users, color: "text-purple-600" },
                    { title: "Active Now", value: "+12", icon: Activity, color: "text-orange-600" },
                ].map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 font-sans">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-gray-500 mt-1">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gray-100" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Order #{1000 + i}</p>
                                            <p className="text-xs text-gray-500">2 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">₹{Math.floor(Math.random() * 10000)}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
