"use client";

import { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { cn } from "@/components/ui-primitives";

export type WorkAsset = {
    id: string;
    type: "image" | "video";
    src: string;
    poster?: string; // For videos
    previewSrc?: string; // Small video loop for grid
    width: number;
    height: number;
    title: string;
    client?: string;
    year: number;
    tags?: string[];
    production?: boolean; // True = Client Work, False = Experiment
    alt: string;
    fit?: "cover" | "contain"; // Control cropping behavior
};

interface WorkAssetCardProps {
    asset: WorkAsset;
    priority?: boolean;
    onClick: (asset: WorkAsset) => void;
}

export const WorkAssetCard = memo(function WorkAssetCard({ asset, priority = false, onClick }: WorkAssetCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { margin: "20% 0px 20% 0px", once: true }); // Trigger reveal once
    const isPlaybackInView = useInView(containerRef, { margin: "0px", amount: 0.5 }); // Trigger playback when 50% visible

    // Animation variants for reveal
    const variants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.9, 0.3, 1] as const } },
    };

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            className="group relative w-full mb-6 cursor-pointer"
            onClick={() => onClick(asset)}
        >
            {/* Visual Container: No card background, just rounded radius 8px */}
            <div className="relative w-full overflow-hidden rounded-[8px] transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">

                {/* Media Aspect Ratio Wrapper */}
                <div
                    className={cn(
                        "relative w-full",
                        // If contain, use subtle background. If cover, background matters less but keep dark for load.
                        asset.fit === "contain" ? "bg-neutral-900/50" : "bg-neutral-900"
                    )}
                    style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
                >
                    {asset.type === "image" ? (
                        <Image
                            src={asset.src}
                            alt={asset.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={cn(
                                "transition-transform duration-700 ease-out group-hover:scale-105",
                                asset.fit === "contain" ? "object-contain" : "object-cover"
                            )}
                            priority={priority}
                        />
                    ) : (
                        <GridVideoPlayer
                            asset={asset}
                            isPlaying={isPlaybackInView}
                        />
                    )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                        {/* Type Icon / Badge */}
                        <div className="flex items-center justify-between mb-1">
                            {asset.client && (
                                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-medium">
                                    Client
                                </span>
                            )}
                            {!asset.client && (
                                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                                    Lab
                                </span>
                            )}

                            {asset.type === "video" && <Play className="w-3 h-3 text-white fill-white" />}
                        </div>

                        <h3 className="text-sm font-medium text-white leading-tight">
                            {asset.title}
                        </h3>
                        {asset.client && (
                            <p className="text-xs text-neutral-400 mt-0.5">{asset.client}</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

// Separate component for Video to manage refs and play state efficiently
const GridVideoPlayer = memo(function GridVideoPlayer({ asset, isPlaying }: { asset: WorkAsset; isPlaying: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.play().catch(() => { /* Silent fail for autoplay restrictions */ });
        } else {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <video
            ref={videoRef}
            src={asset.previewSrc || asset.src} // Use preview if available
            poster={asset.poster}
            className={cn(
                "absolute inset-0 w-full h-full",
                asset.fit === "contain" ? "object-contain" : "object-cover"
            )}
            playsInline
            muted
            loop
        />
    );
});
