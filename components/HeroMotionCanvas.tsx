"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Container, Heading, Text } from "./ui-primitives";
import { cn } from "./ui-primitives";

const FRAME_COUNT = 200;
const IMAGES_DIR = "/motion-assets-autonova";

export function HeroMotionCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress for the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth the scroll progress for smoother playback
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    // Map scroll progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `${IMAGES_DIR}/ezgif-frame-${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        // Handle missing frames gracefully - create placeholder
                        console.warn(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Draw to canvas
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const render = (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const imageIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(index) - 1)
            );
            const img = images[imageIndex];

            if (img) {
                // "Cover" fit with mobile/tablet constraints to prevent overflow
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;
                const isMobile = window.innerWidth < 1024; // Target phones and tablets
                
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                // Mobile/tablet: ensure content fits within canvas bounds
                if (isMobile) {
                    const maxScale = 1.0; // Prevent overflow by capping scale at 100%
                    if (drawWidth > canvas.width) {
                        const scale = (canvas.width / drawWidth) * maxScale;
                        drawWidth *= scale;
                        drawHeight *= scale;
                        offsetX = (canvas.width - drawWidth) / 2;
                        offsetY = (canvas.height - drawHeight) / 2;
                    }
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const unsubscribe = frameIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render
        render(1);

        return () => unsubscribe();
    }, [isLoaded, images, frameIndex]);

    // Handle Resize - constrain canvas to viewport on mobile/tablet
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                // Use container bounds to prevent overflow on mobile/tablet
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                
                canvasRef.current.width = Math.min(window.innerWidth, containerWidth);
                canvasRef.current.height = Math.min(window.innerHeight, containerHeight);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-background">
            {/* Mobile/tablet overflow fix: ensure sticky container constrains content */}
            <div className="sticky top-0 h-screen w-full overflow-hidden max-w-full">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover max-w-full"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center bg-black/30">
                    <Container className="relative">
                        <motion.div
                            style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
                        >
                            <Heading as="h1" className="mb-6 text-white font-display font-bold tracking-tighter mix-blend-overlay opacity-90">
                                AUTONOVA
                            </Heading>
                            <Text className="max-w-xl text-white/80 text-lg md:text-xl font-light">
                                System Intelligence. <span className="text-white">Real outcomes.</span>
                                <br />
                                Designed for the automated future.
                            </Text>
                        </motion.div>
                    </Container>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm"
                >
                    Scroll to explore
                </motion.div>
            </div>
        </div>
    );
}
