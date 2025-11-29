import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Upload } from "lucide-react";

export default function UploadPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="font-serif text-3xl font-bold text-gray-900">Upload New Design</h1>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Product Title</label>
                        <Input placeholder="e.g. Royal Blue Maggam Blouse" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price (₹)</label>
                            <Input type="number" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                <option>Blouses</option>
                                <option>Sarees</option>
                                <option>Bridal</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="Describe the product..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Product Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="mx-auto h-12 w-12 text-gray-400">
                                <Upload className="h-full w-full" />
                            </div>
                            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">Publish Product</Button>
                </CardContent>
            </Card>
        </div>
    );
}
