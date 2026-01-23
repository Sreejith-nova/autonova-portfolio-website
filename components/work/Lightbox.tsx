"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Play, Pause, ExternalLink } from "lucide-react";
import Image from "next/image";
import { WorkAsset } from "./WorkAssetCard";
import { cn } from "@/components/ui-primitives";

interface LightboxProps {
    asset: WorkAsset | null;
    onClose: () => void;
}

export function Lightbox({ asset, onClose }: LightboxProps) {
    const [isMuted, setIsMuted] = useState(false); // Video starts with sound in lightbox usually? Or muted? User request: "For videos: play/pause, volume...". Let's default to sound ON for lightbox if user interaction opened it.
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Lock body scroll
    useEffect(() => {
        if (asset) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [asset]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Video controls
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
    };

    if (!asset) return null;

    return (
        <AnimatePresence>
            {asset && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Content Container */}
                    <div
                        className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent close on content click
                    >
                        {/* Media Area */}
                        <div className="relative flex-1 w-full h-full max-h-[85vh] flex items-center justify-center">
                            {asset.type === "image" ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={asset.src}
                                        alt={asset.alt}
                                        fill
                                        className="object-contain"
                                        priority
                                        sizes="90vw"
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center bg-black group/video">
                                    <video
                                        ref={videoRef}
                                        src={asset.src}
                                        poster={asset.poster}
                                        className="max-w-full max-h-full w-auto h-auto"
                                        autoPlay
                                        playsInline
                                        loop
                                        // Default not muted in lightbox if possible, but browsers might block. 
                                        // Since interaction (click) opened this, it should allow audio.
                                        onClick={togglePlay}
                                    />

                                    {/* Play/Pause Overlay */}
                                    {!isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                                                <Play size={32} className="fill-white text-white ml-2" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Controls overlay - show on hover */}
                                    <div className="absolute bottom-6 right-6 flex items-center gap-3 opacity-0 group-hover/video:opacity-100 transition-opacity">
                                        <button onClick={toggleMute} className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                        <button onClick={togglePlay} className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Info Sidebar (Desktop) / Bottom Sheet (Mobile) - simplified for "Minimal" */}
                        <div className="w-full md:w-[320px] shrink-0 text-left md:h-auto overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-medium text-white mb-2">{asset.title}</h2>
                                    {asset.client && (
                                        <p className="text-lg text-neutral-400">{asset.client}</p>
                                    )}
                                </div>

                                <div className="space-y-4 text-sm text-neutral-500">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Year</span>
                                        <span className="text-neutral-300">{asset.year}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Type</span>
                                        <span className="text-neutral-300 capitalize">{asset.type}</span>
                                    </div>
                                    {asset.tags && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {asset.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 rounded bg-white/5 text-xs text-neutral-400 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {asset.production && (
                                    <div className="pt-4">
                                        <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium tracking-wide uppercase">
                                            View Case Study <ExternalLink size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
