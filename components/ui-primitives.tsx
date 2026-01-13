import { ComponentProps, ElementType } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Typography Components
interface TextProps extends ComponentProps<"p"> {
    as?: ElementType;
}

export function Heading({ className, as: Component = "h2", ...props }: TextProps) {
    return (
        <Component
            className={cn(
                "font-sans font-medium tracking-tight text-foreground",
                {
                    "text-5xl md:text-7xl lg:text-8xl leading-[0.9]": Component === "h1",
                    "text-4xl md:text-5xl lg:text-6xl leading-[1.0]": Component === "h2",
                    "text-3xl md:text-4xl": Component === "h3",
                    "text-xl md:text-2xl": Component === "h4",
                },
                className
            )}
            {...props}
        />
    );
}

export function Text({ className, as: Component = "p", ...props }: TextProps) {
    return (
        <Component
            className={cn("text-base md:text-lg text-subtle leading-relaxed", className)}
            {...props}
        />
    );
}

// Layout Components
export function Container({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            className={cn("mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8", className)}
            {...props}
        />
    );
}

export function Section({ className, ...props }: ComponentProps<"section">) {
    return (
        <section
            className={cn("py-20 md:py-32", className)}
            {...props}
        />
    );
}
