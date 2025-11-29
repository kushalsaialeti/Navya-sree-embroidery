"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube, } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        alert("Thank you for contacting us! We will get back to you shortly.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Get in Touch</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a question or want to book a consultation? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-8">
                            <div>
                                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Visit Us</p>
                                            <p className="text-sm text-muted-foreground mt-1">{CONTACT_INFO.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Call Us</p>
                                            <p className="text-sm text-muted-foreground mt-1">{CONTACT_INFO.phone}</p>
                                            <p className="text-xs text-muted-foreground">Mon-Sat: 9am - 8pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Email Us</p>
                                            <p className="text-sm text-muted-foreground mt-1">{CONTACT_INFO.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border">
                                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    <a href={SOCIAL_LINKS.instagram} className="h-10 w-10 bg-secondary/20 text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                    <a href={SOCIAL_LINKS.facebook} className="h-10 w-10 bg-secondary/20 text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                    <a href={SOCIAL_LINKS.youtube} className="h-10 w-10 bg-secondary/20 text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                                        <Youtube className="h-5 w-5" />
                                    </a>
                                    {/* <a href={SOCIAL_LINKS.whatsapp} className="h-10 w-10 bg-secondary/20 text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                                        <Whatsapp className="h-5 w-5" />
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border border-border">
                            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Your Name</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Email Address</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Phone Number</label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 9618631117"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Subject</label>
                                        <Input
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Inquiry about Bridal Blouse"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-foreground"
                                        placeholder="Tell us about your requirements..."
                                        required
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full md:w-auto">
                                    <Send className="mr-2 h-4 w-4" /> Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
