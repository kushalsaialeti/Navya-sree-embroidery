import React from "react";
import Link from "next/link";
import { LayoutDashboard, Upload, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6">
                    <h2 className="font-serif text-2xl font-bold text-primary">Admin Panel</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-secondary/20 hover:text-primary rounded-md transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/uploads"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-secondary/20 hover:text-primary rounded-md transition-colors"
                    >
                        <Upload className="h-5 w-5" />
                        Upload Design
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-secondary/20 hover:text-primary rounded-md transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-md transition-colors mt-8">
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
