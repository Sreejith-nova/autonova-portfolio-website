"use client";

import { Container } from "./ui-primitives";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { cn } from "./ui-primitives";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileMenuOpen(false);
        };
        if (mobileMenuOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [mobileMenuOpen]);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    return (
        <>
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-subtle">
                        <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
                        <Link href="#thinking" className="hover:text-foreground transition-colors">Philosophy</Link>
                        <a
                            href="https://cal.com/autonova-mfsbch/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 rounded-full border border-border bg-foreground text-background hover:bg-white/90 transition-colors"
                        >
                            Book a conversation
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <Menu size={24} />
                    </button>
                </Container>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[100] bg-background transition-opacity duration-300 md:hidden",
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
            >
                {/* Close Button */}
                <button
                    className="absolute top-6 right-4 p-2 text-foreground hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
                    onClick={closeMobileMenu}
                    aria-label="Close navigation menu"
                >
                    <X size={24} />
                </button>

                {/* Mobile Menu Content */}
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    <Link
                        href="/"
                        className="text-3xl font-display font-bold text-foreground hover:text-white transition-colors"
                        onClick={closeMobileMenu}
                    >
                        Home
                    </Link>
                    <Link
                        href="/work"
                        className="text-3xl font-display font-bold text-foreground hover:text-white transition-colors"
                        onClick={closeMobileMenu}
                    >
                        Work
                    </Link>
                    <Link
                        href="#thinking"
                        className="text-3xl font-display font-bold text-foreground hover:text-white transition-colors"
                        onClick={closeMobileMenu}
                    >
                        Philosophy
                    </Link>
                    <a
                        href="https://cal.com/autonova-mfsbch/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 px-8 py-4 text-lg font-medium rounded-full border border-border bg-foreground text-background hover:bg-white/90 transition-colors"
                        onClick={closeMobileMenu}
                    >
                        Book a conversation
                    </a>
                </div>
            </div>
        </>
    );
}
