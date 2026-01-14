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
                // "Cover" fit
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;
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

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Trigger re-render of current frame if needed
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
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
