"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Heading, Section, Text } from "../ui-primitives";
import { MasonryGallery } from "./MasonryGallery";
import { Lightbox } from "./Lightbox";
import { WorkAsset } from "./WorkAssetCard";
import { cn } from "@/components/ui-primitives";

// --- Data ---
const ASSETS: WorkAsset[] = [
    // Client Work (Production)
    {
        id: "client-1",
        type: "video",
        src: "/work/creatives/client%20work/WhatsApp%20Video%202026-01-14%20at%2015.24.08.mp4",
        width: 1920,
        height: 1080, // 16:9
        title: "Global Brand Campaign",
        client: "Fashion Label",
        year: 2025,
        tags: ["Social", "Campaign"],
        production: true,
        alt: "High-energy fashion campaign video",
    },
    {
        id: "client-2",
        type: "video",
        src: "/work/creatives/client%20work/IMG_5236.MP4",
        width: 1080,
        height: 1350, // 4:5
        title: "Automotive Reveal",
        client: "Luxury Auto",
        year: 2024,
        tags: ["TVC", "CGI"],
        production: true,
        alt: "Cinematic car reveal sequence",
        fit: "cover"
    },
    {
        id: "client-3",
        type: "video",
        src: "/work/creatives/client%20work/IMG_5233.MP4",
        width: 1080,
        height: 1350, // 4:5
        title: "Tech Product Launch",
        client: "Tech Giant",
        year: 2024,
        tags: ["Product", "3D"],
        production: true,
        alt: "Abstract 3D product motion",
    },
    {
        id: "client-4",
        type: "video",
        src: "/work/creatives/client%20work/IMG_5788.MP4",
        width: 1080,
        height: 1920,
        title: "Event Coverage",
        client: "Tech Summit",
        year: 2025,
        tags: ["Event", "Social"],
        production: true,
        alt: "Tech summit highlights",
    },
    {
        id: "client-5",
        type: "video",
        src: "/work/creatives/client%20work/IMG_5781.MP4",
        width: 1080,
        height: 1920,
        title: "Backstage Access",
        client: "Fashion Week",
        year: 2025,
        tags: ["Fashion", "BTS"],
        production: true,
        alt: "Backstage fashion week footage",
    },
    {
        id: "client-6",
        type: "video",
        src: "/work/creatives/client%20work/IMG_5780.MP4",
        width: 1080,
        height: 1920,
        title: "Product Teaser",
        client: "Beauty Brand",
        year: 2025,
        tags: ["Social", "Product"],
        production: true,
        alt: "Beauty product social teaser",
    },
    {
        id: "client-7",
        type: "video",
        src: "/work/creatives/client%20work/IMG_5779.MP4",
        width: 1080,
        height: 1920,
        title: "Lifestyle Promo",
        client: "Wellness App",
        year: 2025,
        tags: ["Lifestyle", "App"],
        production: true,
        alt: "Wellness app lifestyle promo",
    },
    // Our Work (Lab/Experiments)
    {
        id: "our-1",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-14%20at%2015.47.56.jpeg",
        width: 1200,
        height: 1600, // 3:4
        title: "Generative Series A",
        year: 2025,
        tags: ["Generative", "Art"],
        production: false,
        alt: "Abstract generative art",
    },
    {
        id: "our-video-1",
        type: "video",
        src: "/work/creatives/our%20work/WhatsApp%20Video%202026-01-22%20at%2016.46.37.mp4",
        width: 1080,
        height: 608, // ~16:9
        title: "Motion Experiment",
        year: 2025,
        tags: ["Simulation", "R&D"],
        production: false,
        alt: "Fluid simulation experiment",
    },
    {
        id: "our-2",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-14%20at%2015.47.56%20(1).jpeg",
        width: 1600,
        height: 1200, // 4:3
        title: "Editorial Concept",
        year: 2024,
        tags: ["Layout", "Design"],
        production: false,
        alt: "Fashion editorial layout",
    },
    {
        id: "our-3",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-22%20at%2016.46.33.jpeg",
        width: 1200,
        height: 1200, // 1:1
        title: "Spatial Design",
        year: 2024,
        tags: ["Archviz", "Environment"],
        production: false,
        alt: "3D architectural visualization",
    },
    {
        id: "our-4",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-22%20at%2016.46.38.jpeg",
        width: 1200,
        height: 1600, // 3:4
        title: "Character Study",
        year: 2025,
        tags: ["Character", "Digital"],
        production: false,
        alt: "Digital character portrait",
        fit: "contain" // Example usage if needed for ensuring full visibility
    },
    {
        id: "our-video-2",
        type: "video",
        src: "/work/creatives/our%20work/WhatsApp%20Video%202026-01-22%20at%2016.46.34.mp4",
        width: 1080,
        height: 1080, // 1:1
        title: "Kinetic Type",
        year: 2024,
        tags: ["Typography", "Motion"],
        production: false,
        alt: "Kinetic typography animation",
    },
    {
        id: "our-5",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-22%20at%2016.46.38%20(1).jpeg",
        width: 1920,
        height: 1080, // 16:9
        title: "Surrealist Landscape",
        year: 2025,
        tags: ["Environment", "Concept"],
        production: false,
        alt: "Dreamscape environment",
    },
    {
        id: "our-6",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-14%20at%2015.47.56%20(2).jpeg",
        width: 1200,
        height: 1200, // 1:1
        title: "Texture Lab",
        year: 2024,
        tags: ["Texture", "Material"],
        production: false,
        alt: "Macro texture exploration",
    },
    {
        id: "our-7",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-22%20at%2016.46.34%20(1).jpeg",
        width: 1200,
        height: 1600, // 3:4
        title: "Material Study",
        year: 2025,
        tags: ["Material", "R&D"],
        production: false,
        alt: "Digital material study",
    },
    {
        id: "our-8",
        type: "image",
        src: "/work/creatives/our%20work/WhatsApp%20Image%202026-01-22%20at%2016.46.34.jpeg",
        width: 1600,
        height: 1200, // 4:3
        title: "Optical Illustion",
        year: 2025,
        tags: ["Visual", "Experiment"],
        production: false,
        alt: "Optical illusion graphic",
    },
    // --- NEW ASSETS ---
    {
        id: "our-new-1",
        type: "video",
        src: "/work/creatives/our%20work/From%20KlickPin%20CF%20Pin%20su%20Stock.mp4",
        width: 1080,
        height: 1920, // 9:16
        title: "Stock Motion",
        year: 2025,
        tags: ["Motion", "Social"],
        production: false,
        alt: "Creative fluid motion stock",
    },
    {
        id: "our-new-2",
        type: "video",
        src: "/work/creatives/our%20work/From%20KlickPin%20CF%20Pinterest%20Pin-422281212072245.mp4",
        width: 1080,
        height: 1920, // 9:16
        title: "Pinterest Creative",
        year: 2025,
        tags: ["Social", "Vertical"],
        production: false,
        alt: "Vertical social media creative",
    },
    {
        id: "our-new-3",
        type: "video",
        src: "/work/creatives/our%20work/From_KlickPin_CF_Indian_Fashion_American_Diamond_Jewelry_Bridal.mp4",
        width: 1080,
        height: 1920, // 9:16
        title: "Jewelry Showcase",
        year: 2025,
        tags: ["Fashion", "Luxury"],
        production: false,
        alt: "Luxury jewelry fashion showcase",
    },
    {
        id: "our-new-4",
        type: "video",
        src: "/work/creatives/our%20work/From_KlickPin_CF_Pin_by_Suat_K%C3%B6ksal_on_p%C4%B1rlanta_video_Creative_jewelry.mp4",
        width: 1080,
        height: 1920, // 9:16
        title: "Diamond Sparkle",
        year: 2025,
        tags: ["Jewelry", "Macro"],
        production: false,
        alt: "Macro diamond jewelry videography",
    },
    {
        id: "our-new-5",
        type: "image",
        src: "/work/creatives/our%20work/291f2f7225f43e1a96b025b1ba2d3909.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Abstract Form",
        year: 2025,
        tags: ["Abstract", "3D"],
        production: false,
        alt: "Abstract 3D form render",
    },
    {
        id: "our-new-6",
        type: "image",
        src: "/work/creatives/our%20work/4c7fb5c8bb81949fea2df6e55fb86c11.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Neon Concept",
        year: 2025,
        tags: ["Neon", "Lighting"],
        production: false,
        alt: "Neon lighting concept art",
    },
    {
        id: "our-new-7",
        type: "image",
        src: "/work/creatives/our%20work/701a9abbb87a021731bee406c574099a.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Glass Texture",
        year: 2025,
        tags: ["Texture", "3D"],
        production: false,
        alt: "Glass texture exploration",
    },
    {
        id: "our-new-8",
        type: "image",
        src: "/work/creatives/our%20work/a8674a7484483d574551bdcb4cf574d3.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Surreal Scene",
        year: 2025,
        tags: ["Surreal", "Composition"],
        production: false,
        alt: "Surreal composition render",
    },
    {
        id: "our-new-9",
        type: "image",
        src: "/work/creatives/our%20work/c51e52a0a67ecaa7aadcd7d07a8f5028.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Minimal Study",
        year: 2025,
        tags: ["Minimal", "Design"],
        production: false,
        alt: "Minimalist design study",
    },
    {
        id: "our-new-10",
        type: "image",
        src: "/work/creatives/our%20work/d5846d57b1e589218ae13ca3f4779c9b.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Chromatic Aberration",
        year: 2025,
        tags: ["Color", "Effect"],
        production: false,
        alt: "Chromatic aberration experiment",
    },
    {
        id: "our-new-11",
        type: "image",
        src: "/work/creatives/our%20work/e69c8da838883022ae7f20f7f5d51bc8.jpg",
        width: 1200,
        height: 1600, // 3:4
        title: "Fluid Simulation",
        year: 2025,
        tags: ["Fluid", "Simulation"],
        production: false,
        alt: "Fluid simulation still",
    },
];

export const CreativesGallery = memo(function CreativesGallery() {
    const [lightboxAsset, setLightboxAsset] = useState<WorkAsset | null>(null);

    const clientAssets = ASSETS.filter(a => a.production);
    const ourAssets = ASSETS.filter(a => !a.production);

    return (
        <Section className="bg-background relative z-10 min-h-screen">
            <Container>

                {/* Scroll Anchor Handling */}
                {/* Note: In a real app we might use IntersectionObserver to update URL hash on scroll, 
                    but requirement implies simple anchors are enough. */}

                {/* SECTION: Client Work */}
                <div id="client" className="mb-32 md:mb-48 scroll-mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-emerald-500 mb-3 block">
                                Production
                            </span>
                            <Heading as="h2" className="text-3xl md:text-5xl font-light tracking-tight">
                                Client Work
                            </Heading>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="max-w-md"
                        >
                            <Text className="text-base text-subtle/80">
                                Selected commercial campaign deliverables and high-fidelity production assets.
                            </Text>
                        </motion.div>
                    </div>

                    <MasonryGallery
                        items={clientAssets}
                        onAssetClick={setLightboxAsset}
                    />
                </div>

                {/* Divider (Negative Space) */}
                <div className="border-t border-white/5 mb-32 md:mb-48" />

                {/* SECTION: Our Work */}
                <div id="ours" className="mb-20 scroll-mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 mb-3 block">
                                Lab & R&D
                            </span>
                            <Heading as="h2" className="text-3xl md:text-5xl font-light tracking-tight">
                                Our Work
                            </Heading>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="max-w-md"
                        >
                            <Text className="text-base text-subtle/80">
                                Experimental studies, internal tools, and creative exploration.
                            </Text>
                        </motion.div>
                    </div>

                    <MasonryGallery
                        items={ourAssets}
                        onAssetClick={setLightboxAsset}
                    />
                </div>

            </Container>

            {/* Lightbox */}
            <Lightbox asset={lightboxAsset} onClose={() => setLightboxAsset(null)} />
        </Section>
    );
});
