import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DesignCard from "@/components/features/DesignCard";
import { products } from "@/lib/mockData";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-secondary/20">
        <div className="absolute inset-0 z-0">
          {/* Placeholder for Hero Image - using a gradient/pattern for now if no image */}
          <div className="h-full w-full bg-[url('https://placehold.co/1920x1080/EADCF2/6B4570?text=Exquisite+Ethnic+Wear')] bg-cover bg-center opacity-50 dark:opacity-20" />
        </div>

        <div className="relative z-10 container mx-auto flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <h1 className="font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
              Exquisite <span className="text-primary">Ethnic Wear</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Handcrafted embroidery that tells a story. Discover our exclusive collection of Maggam work blouses, bridal sarees, and custom designs.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/catalogue">
                <Button size="lg" className="rounded-full px-8">
                  Explore Collections
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-sm">
                  Custom Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Shop by Category</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Blouses", image: "https://placehold.co/400x400/C8A2C8/FFFFFF?text=Blouses" },
            { name: "Sarees", image: "https://placehold.co/400x400/EADCF2/6B4570?text=Sarees" },
            { name: "Maggam Work", image: "https://placehold.co/400x400/FDF7FF/6B4570?text=Maggam" },
          ].map((category) => (
            <Link key={category.name} href={`/catalogue?category=${category.name}`} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-background shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/30">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Featured Designs</h2>
              <div className="mt-2 h-1 w-20 bg-primary rounded-full" />
            </div>
            <Link href="/catalogue" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <DesignCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/catalogue">
              <Button variant="outline" className="w-full">View All Designs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-accent text-white shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[url('https://placehold.co/1200x400/000000/FFFFFF?text=Pattern')] bg-cover bg-center" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">New Service</Badge>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                Customized Portrait Embroidery
              </h2>
              <p className="text-white/90 text-lg">
                Turn your cherished memories into wearable art. We specialize in intricate portrait embroidery on blouses, perfect for weddings and special occasions.
              </p>
              <ul className="space-y-2">
                {["High precision detailing", "Premium silk threads", "Personalized consultation"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-black text-accent hover:bg-black/90 mt-4">
                Book Consultation
              </Button>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://placehold.co/800x600/C8A2C8/FFFFFF?text=Portrait+Embroidery+Example"
                alt="Portrait Embroidery"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
