"use client";

import { Container } from "./ui-primitives";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { cn } from "./ui-primitives";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);

    // Aceternity-style scroll detection using motion hooks
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest;
        
        // Update background blur effect when scrolled
        setScrolled(currentScrollY > 50);
        
        // Aceternity-style scroll direction detection
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY <= 50) {
            setHidden(false);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Scrolling down - hide navbar
            setHidden(true);
        } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up - show navbar
            setHidden(false);
        }
        
        lastScrollY.current = currentScrollY;
    });

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    return (
        <>
            {/* Aceternity-style animated navbar with motion.nav wrapper */}
            <motion.nav
                ref={navRef}
                initial={{ y: 0 }}
                animate={{
                    y: hidden ? -100 : 0,
                    backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                }}
                className={cn(
                    "fixed top-0 z-50 w-full",
                    scrolled ? "bg-background/80 border-b border-border py-4" : "bg-transparent py-6"
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
            </motion.nav>

            {/* Aceternity-style animated mobile menu with AnimatePresence */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-background md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-6 right-4 p-2 text-foreground hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
                            onClick={closeMobileMenu}
                            aria-label="Close navigation menu"
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Mobile Menu Content with stagger animation */}
                        <motion.div 
                            className="flex flex-col items-center justify-center h-full gap-8"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.08,
                                        delayChildren: 0.1,
                                    }
                                }
                            }}
                        >
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <Link
                                    href="/"
                                    className="text-3xl font-display font-bold text-foreground hover:text-white transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Home
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <Link
                                    href="/work"
                                    className="text-3xl font-display font-bold text-foreground hover:text-white transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Work
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <Link
                                    href="#thinking"
                                    className="text-3xl font-display font-bold text-foreground hover:text-white transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Philosophy
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <a
                                    href="https://cal.com/autonova-mfsbch/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 px-8 py-4 text-lg font-medium rounded-full border border-border bg-foreground text-background hover:bg-white/90 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Book a conversation
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
