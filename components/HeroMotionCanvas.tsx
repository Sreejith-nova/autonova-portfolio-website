"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Container, Heading, Text } from "./ui-primitives";
import { cn } from "./ui-primitives";

const FRAME_COUNT = 240;
const IMAGES_DIR = "/section-two";
const PRELOAD_WINDOW = 20; // Preload frames ahead/behind current frame
const INITIAL_PRELOAD = 30; // Load first 30 frames initially for smooth start

export function HeroMotionCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const [isLoaded, setIsLoaded] = useState(false);
    const currentFrameRef = useRef(1);
    const loadingFramesRef = useRef<Set<number>>(new Set());

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

    // Lazy load image on demand
    const loadImage = useCallback((index: number): Promise<HTMLImageElement | null> => {
        if (imagesRef.current.has(index)) {
            return Promise.resolve(imagesRef.current.get(index)!);
        }

        if (loadingFramesRef.current.has(index)) {
            return Promise.resolve(null);
        }

        loadingFramesRef.current.add(index);

        return new Promise((resolve) => {
            const img = new Image();
            const paddedIndex = index.toString().padStart(4, "0");
            img.src = `${IMAGES_DIR}/frame_${paddedIndex}.webp`;
            img.onload = () => {
                imagesRef.current.set(index, img);
                loadingFramesRef.current.delete(index);
                resolve(img);
            };
            img.onerror = () => {
                loadingFramesRef.current.delete(index);
                resolve(null);
            };
        });
    }, []);

    // Preload images in window around current frame
    const preloadFramesAround = useCallback((currentFrame: number) => {
        const start = Math.max(1, currentFrame - PRELOAD_WINDOW);
        const end = Math.min(FRAME_COUNT, currentFrame + PRELOAD_WINDOW);

        // Load frames in window
        for (let i = start; i <= end; i++) {
            loadImage(i);
        }

        // Cleanup frames outside window to free memory
        const framesToDelete: number[] = [];
        imagesRef.current.forEach((_, frameNum) => {
            if (frameNum < start - PRELOAD_WINDOW || frameNum > end + PRELOAD_WINDOW) {
                framesToDelete.push(frameNum);
            }
        });
        framesToDelete.forEach(frameNum => imagesRef.current.delete(frameNum));
    }, [loadImage]);

    // Initial load - load first frames for immediate display
    useEffect(() => {
        const loadInitialFrames = async () => {
            const promises = [];
            for (let i = 1; i <= INITIAL_PRELOAD; i++) {
                promises.push(loadImage(i));
            }
            await Promise.all(promises);
            setIsLoaded(true);
        };

        loadInitialFrames();
    }, [loadImage]);

    // Draw to canvas with optimizations
    useEffect(() => {
        if (!isLoaded) return;

        let rafId: number | null = null;

        const render = (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d", { alpha: false }); // Disable alpha for better performance
            if (!ctx) return;

            const imageIndex = Math.min(
                FRAME_COUNT,
                Math.max(1, Math.floor(index))
            );

            // Update current frame and preload around it
            if (currentFrameRef.current !== imageIndex) {
                currentFrameRef.current = imageIndex;
                preloadFramesAround(imageIndex);
            }

            const img = imagesRef.current.get(imageIndex);

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
            // Use RAF to batch canvas updates
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => {
                render(latest);
                rafId = null;
            });
        });

        // Initial render
        render(1);

        return () => {
            unsubscribe();
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [isLoaded, frameIndex, preloadFramesAround]);

    // Handle Resize with throttling - constrain canvas to viewport on mobile/tablet
    useEffect(() => {
        let resizeTimeout: number | null = null;

        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                // Use container bounds to prevent overflow on mobile/tablet
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                
                canvasRef.current.width = Math.min(window.innerWidth, containerWidth);
                canvasRef.current.height = Math.min(window.innerHeight, containerHeight);

                // Re-render current frame after resize
                const currentFrame = currentFrameRef.current;
                if (imagesRef.current.has(currentFrame)) {
                    requestAnimationFrame(() => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        const ctx = canvas.getContext("2d", { alpha: false });
                        if (!ctx) return;
                        const img = imagesRef.current.get(currentFrame);
                        if (img) {
                            const canvasRatio = canvas.width / canvas.height;
                            const imgRatio = img.width / img.height;
                            const isMobile = window.innerWidth < 1024;
                            
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

                            if (isMobile) {
                                const maxScale = 1.0;
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
                    });
                }
            }
        };

        const throttledResize = () => {
            if (resizeTimeout !== null) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = window.setTimeout(handleResize, 150);
        };

        window.addEventListener("resize", throttledResize);
        handleResize(); // Initial setup

        return () => {
            window.removeEventListener("resize", throttledResize);
            if (resizeTimeout !== null) {
                clearTimeout(resizeTimeout);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-background">
            {/* Mobile/tablet overflow fix: ensure sticky container constrains content */}
            <div className="sticky top-0 h-screen w-full overflow-hidden max-w-full">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover max-w-full"
                    style={{ willChange: 'contents' }}
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center bg-black/30">
                    <Container className="relative">
                        <motion.div
                            style={{ 
                                opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]),
                                willChange: 'opacity'
                            }}
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
                    style={{ 
                        opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
                        willChange: 'opacity'
                    }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm"
                >
                    Scroll to explore
                </motion.div>
            </div>
        </div>
    );
}
