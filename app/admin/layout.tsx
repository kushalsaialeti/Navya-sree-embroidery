"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, LogOut, Package, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Orders",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Add Product",
            href: "/admin/products/new",
            icon: PlusCircle,
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-muted/20">
            {/* Mobile Header */}
            <div className="md:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-20">
                <h1 className="text-lg font-serif font-bold flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Navyasree Admin
                </h1>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-10 bg-background/95 backdrop-blur-sm pt-20 px-6">
                    <nav className="space-y-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div
                                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted text-foreground"
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-border mt-4">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                onClick={() => {
                                    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                    window.location.href = "/admin/login";
                                }}
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col shrink-0 h-screen sticky top-0">
                <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-serif font-bold flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary" />
                        Navyasree Admin
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-foreground"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => {
                            // Clear cookie and reload to trigger middleware redirect
                            document.cookie =
                                "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                            window.location.href = "/admin/login";
                        }}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-[calc(100vh-65px)] md:h-screen">
                <div className="p-4 md:p-8">{children}</div>
            </main>
        </div>
    );
}
