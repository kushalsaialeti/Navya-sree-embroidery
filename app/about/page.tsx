import React from "react";
import Image from "next/image";
import { Award, Users, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="h-full w-full bg-[url('https://placehold.co/1920x1080/047857/FFFFFF?text=Our+Story')] bg-cover bg-center opacity-30 dark:opacity-20" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
                        Weaving Dreams into <span className="text-primary">Reality</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        At Navyasree Embroidery, we blend age-old traditions with contemporary designs to create masterpieces that tell your unique story.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/images/founder.png"
                            alt="Navyasree - Founder"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-serif text-4xl font-bold text-foreground">Our Journey</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Founded in 2024 by <strong font-color="navyblue" >SatyaVaraLakshmi Kokkirala</strong>, a passionate textile artist, our boutique started as a small home studio. Driven by a love for intricate Maggam work and computer embroidery, we have grown into a beloved brand for brides and fashion enthusiasts alike.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Every stitch is placed with precision, and every design is a labor of love. We believe that clothing is not just fabric; it's an expression of art, culture, and personality.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div className="space-y-2">
                                <h3 className="font-serif text-3xl font-bold text-primary">200+</h3>
                                <p className="text-sm text-muted-foreground">Happy Clients</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-serif text-3xl font-bold text-primary">5+</h3>
                                <p className="text-sm text-muted-foreground">Years of Excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-foreground">Why Choose Us</h2>
                        <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Award, title: "Premium Quality", desc: "We use only the finest silk threads, beads, and fabrics." },
                            { icon: Users, title: "Custom Design", desc: "Collaborate with us to create a design that is uniquely yours." },
                            { icon: Clock, title: "On-Time Delivery", desc: "We respect your timeline and ensure timely delivery for your big day." },
                            { icon: Heart, title: "Handcrafted Love", desc: "Each piece is hand-embroidered by skilled artisans with decades of experience." },
                        ].map((item, index) => (
                            <div key={index} className="bg-card p-8 rounded-xl shadow-sm border border-border text-center hover:-translate-y-1 transition-transform duration-300">
                                <div className="h-14 w-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="font-serif text-4xl font-bold text-foreground">Ready to Create Your Dream Outfit?</h2>
                    <p className="text-muted-foreground text-lg">
                        Let's discuss your ideas and bring them to life. Book a consultation with our designers today.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="px-8">Contact Us</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
