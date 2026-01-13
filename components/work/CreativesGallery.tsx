"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container, Heading, Section, Text } from "../ui-primitives";
import { X } from "lucide-react";

interface Creative {
    id: string;
    type: "image" | "video";
    src: string;
    thumbnail?: string;
    alt: string;
}

// Placeholder creatives - replace with actual assets
const creatives: Creative[] = [
    { id: "1", type: "image", src: "/work/creatives/creative-1.jpg", alt: "AI-generated social creative" },
    { id: "2", type: "image", src: "/work/creatives/creative-2.jpg", alt: "Brand campaign visual" },
    { id: "3", type: "video", src: "/work/creatives/demo-video.mp4", thumbnail: "/work/creatives/video-thumb.jpg", alt: "Product demo video" },
    { id: "4", type: "image", src: "/work/creatives/creative-3.jpg", alt: "Marketing collateral" },
    { id: "5", type: "image", src: "/work/creatives/creative-4.jpg", alt: "Social media asset" },
    { id: "6", type: "image", src: "/work/creatives/creative-5.jpg", alt: "Digital advertisement" },
];

export function CreativesGallery() {
    const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);

    const openLightbox = (creative: Creative) => {
        setSelectedCreative(creative);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = useCallback(() => {
        setSelectedCreative(null);
        document.body.style.overflow = "auto";
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeLightbox]);

    return (
        <Section className="bg-background relative z-10 border-b border-border/10">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-16">
                        <h3 className="text-sm font-medium uppercase tracking-widest text-subtle mb-4">
                            AI Creatives
                        </h3>
                        <Heading as="h2" className="text-3xl md:text-4xl">
                            Visual execution
                        </Heading>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {creatives.map((creative, index) => (
                            <motion.button
                                key={creative.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                onClick={() => openLightbox(creative)}
                                className="relative aspect-square bg-border/10 rounded-sm overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                                aria-label={`View ${creative.alt}`}
                            >
                                <div className="absolute inset-0 bg-subtle/20 flex items-center justify-center">
                                    <span className="text-subtle/50 text-sm">
                                        {creative.type === "video" ? "▶ Video" : "Image"}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </Container>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedCreative && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Media lightbox"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
                            aria-label="Close lightbox"
                        >
                            <X size={28} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-4xl max-h-[80vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedCreative.type === "video" ? (
                                <video
                                    src={selectedCreative.src}
                                    controls
                                    autoPlay
                                    className="w-full h-auto max-h-[80vh] rounded-sm"
                                    aria-label={selectedCreative.alt}
                                />
                            ) : (
                                <div className="relative w-full aspect-square md:aspect-video bg-subtle/10 rounded-sm flex items-center justify-center">
                                    <span className="text-subtle">
                                        {selectedCreative.alt}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
}
