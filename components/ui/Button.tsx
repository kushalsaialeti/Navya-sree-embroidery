import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

// Simple utility for class merging if not already present, otherwise I'd assume a lib/utils exists or create it.
// For now, I'll implement a basic version inside the component if lib/utils is missing, but standard practice suggests a utility.
// I will assume standard shadcn-like structure or just use template literals for MVP simplicity if utils is not there.
// Checking file structure earlier didn't show lib/utils.ts, so I will create a simple one or just inline it.
// I'll inline the logic for now to be self-contained or create lib/utils.ts next.
// Let's create lib/utils.ts first in the next step to be clean. For now, I'll assume it exists or I'll create it.
// Actually, I'll create the utils file in this batch to be safe.

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-primary text-white hover:bg-primary/90 shadow-md",
            secondary: "bg-secondary text-accent hover:bg-secondary/80",
            outline: "border border-primary text-primary hover:bg-primary/10",
            ghost: "hover:bg-accent/10 text-accent",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-10 px-4 py-2 text-sm",
            lg: "h-12 px-8 text-base",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
