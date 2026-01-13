"use client";

import Image from "next/image";
import { Container } from "./ui-primitives";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "./ui-primitives";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-500",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="text-xl md:text-2xl font-display font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
                    AUTONOVA
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-subtle">
                    <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
                    <Link href="#thinking" className="hover:text-foreground transition-colors">Philosophy</Link>
                    <a
                        href="https://cal.com/autonova-mfsbch/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full border border-border bg-foreground text-background hover:bg-white/90 transition-colors"
                    >
                        Book a conservation
                    </a>
                </div>
            </Container>
        </nav>
    );
}
