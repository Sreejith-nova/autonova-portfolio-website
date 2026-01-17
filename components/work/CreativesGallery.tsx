"use client";

import { useState, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container, Heading, Section, Text } from "../ui-primitives";
import { X, ImageIcon, Play, Maximize2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

// --- Types ---

type BaseCreative = {
    id: string;
    alt: string;
    title?: string; // For lightbox/overlay
};

type ImageCreative = BaseCreative & {
    type: "image";
    src: string;
    aspectRatio?: "square" | "portrait" | "landscape"; // For grid sizing hints
};

type VideoCreative = BaseCreative & {
    type: "video";
    src: string;
    poster?: string;
};

type Creative = ImageCreative | VideoCreative;

// --- Data ---

const imageCreatives: ImageCreative[] = [
    {
        id: "img-1",
        type: "image",
        src: "/work/creatives/WhatsApp Image 2026-01-14 at 15.47.56.jpeg",
        alt: "Creative Campaign Visual 1",
        title: "Brand System",
        aspectRatio: "portrait",
    },
    {
        id: "img-2",
        type: "image",
        src: "/work/creatives/WhatsApp Image 2026-01-14 at 15.47.56 (1).jpeg",
        alt: "Creative Campaign Visual 2",
        title: "Editorial Layout",
        aspectRatio: "landscape",
    },
    {
        id: "img-3",
        type: "image",
        src: "/work/creatives/WhatsApp Image 2026-01-14 at 15.47.56 (2).jpeg",
        alt: "Creative Campaign Visual 3",
        title: "Visual Identity",
        aspectRatio: "square",
    },
];

const videoCreatives: VideoCreative[] = [
    {
        id: "vid-1",
        type: "video",
        src: "/work/creatives/WhatsApp Video 2026-01-14 at 15.24.08.mp4",
        alt: "Campaign Motion Video",
        title: "Motion Identity",
    },
    {
        id: "vid-2",
        type: "video",
        src: "/work/creatives/IMG_5236.MP4",
        alt: "Social Media Reel",
        title: "Social Experience",
    },
    {
        id: "vid-3",
        type: "video",
        src: "/work/creatives/IMG_5233.MP4",
        alt: "Brand Mood Film",
        title: "Atmosphere",
    },
];

// --- Components ---

export const CreativesGallery = memo(function CreativesGallery() {
    const [lightboxItem, setLightboxItem] = useState<Creative | null>(null);
    const { setIsModalOpen } = useModal();

    const openLightbox = (item: Creative) => {
        setLightboxItem(item);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = useCallback(() => {
        setLightboxItem(null);
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    }, [setIsModalOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeLightbox]);

    return (
        <Section className="bg-background relative z-10">
            <Container>
                {/* Header */}
                <div className="mb-20 md:mb-32 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <h3 className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-subtle mb-6">
                            AI Creatives
                        </h3>
                        <Heading as="h2" className="text-4xl md:text-5xl lg:text-6xl mb-6">
                            Selected visual systems and campaigns
                        </Heading>
                        <Text className="max-w-lg text-lg text-subtle/80">
                            A curation of generated imagery and motion design, demonstrating high-fidelity outputs for modern brands.
                        </Text>
                    </motion.div>
                </div>

                {/* Subsection 1: Image Gallery */}
                <div className="mb-32 md:mb-48">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {imageCreatives.map((item, index) => (
                            <ImageCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={() => openLightbox(item)}
                            />
                        ))}
                    </div>
                </div>

                {/* Subsection 2: Video Gallery */}
                <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ willChange: 'opacity' }}
                        className="mb-12"
                    >
                        <h4 className="text-sm font-medium text-subtle tracking-widest uppercase">Motion & Video</h4>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                        {videoCreatives.map((item, index) => (
                            <VideoCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={() => openLightbox(item)}
                            />
                        ))}
                    </div>
                </div>
            </Container>

            <Lightbox
                item={lightboxItem}
                onClose={closeLightbox}
            />
        </Section>
    );
});

// --- Subcomponents ---

const ImageCard = memo(function ImageCard({ item, index, onClick }: { item: ImageCreative; index: number; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            style={{ willChange: 'opacity, transform' }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative w-full overflow-hidden bg-subtle/5 rounded-sm aspect-[4/5] md:aspect-[3/4]">
                {/* 
                    Using aspect-ratio utility to enforce a consistent shape, 
                    but letting object-cover handle the fitting.
                    For a true masonry, we would need to know exact dimensions or use column-count CSS.
                    Grid is safer for responsiveness.
                 */}
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Minimal Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full text-white/90">
                        <Maximize2 size={24} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                <span className="text-xs uppercase tracking-wider text-subtle">{item.title}</span>
            </div>
        </motion.div>
    );
});

const VideoCard = memo(function VideoCard({ item, index, onClick }: { item: VideoCreative; index: number; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            style={{ willChange: 'opacity, transform' }}
        >
            <button
                onClick={onClick}
                className="group relative w-full aspect-video bg-subtle/5 rounded-sm overflow-hidden block focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={`Play ${item.title}`}
            >
                {/* Video Preview (muted, looping could be added if desired, but request said simple poster) */}
                <video
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    preload="metadata"
                    muted
                    playsInline
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                        <Play size={32} className="text-white fill-white ml-1" />
                    </div>
                </div>
            </button>
            <div className="mt-4 flex justify-between items-start">
                <h5 className="text-sm font-medium text-foreground">{item.title}</h5>
                <span className="text-xs text-subtle uppercase tracking-wider">Video</span>
            </div>
        </motion.div>
    );
});

const Lightbox = memo(function Lightbox({ item, onClose }: { item: Creative | null; onClose: () => void }) {
    // Ensure close button always works by using a handler that prevents all event bubbling
    const handleCloseClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    }, [onClose]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        // Only close if clicking the backdrop itself, not its children
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[5000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Media Lightbox"
                >
                    {/* Close Button - Positioned absolutely at top right */}
                    <button
                        onClick={handleCloseClick}
                        className="fixed top-6 right-6 z-[5010] p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                        aria-label="Close lightbox"
                        type="button"
                    >
                        <X size={32} strokeWidth={2} />
                    </button>

                    <div
                        className="relative w-full max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {item.type === "image" ? (
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl selection:bg-transparent"
                            />
                        ) : (
                            <div className="relative flex items-center justify-center w-full h-full">
                                <video
                                    src={item.src}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                                    preload="auto"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        {/* Caption */}
                        {(item.title || item.alt) && (
                            <div className="mt-4 text-center pointer-events-none">
                                {item.title && <p className="text-white/90 text-lg font-medium">{item.title}</p>}
                                <p className="text-white/50 text-sm mt-1">{item.alt}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
