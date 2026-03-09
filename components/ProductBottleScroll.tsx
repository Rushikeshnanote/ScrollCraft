"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";

interface ProductBottleScrollProps {
    product: Product;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const frameCount = product.frameCount;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Preload images
    useEffect(() => {
        let isMounted = true;

        // Reset state for new product
        setImages([]);
        setLoadProgress(0);
        setIsLoading(true);

        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = new Array(frameCount);
            let loadedCount = 0;

            const loadFrame = (i: number, retryCount = 0): Promise<HTMLImageElement | null> => {
                return new Promise((resolve) => {
                    const paddedIndex = String(i).padStart(3, '0');
                    const img = new Image();
                    img.src = `${product.folderPath}/ezgif-frame-${paddedIndex}.jpg`;

                    img.onload = () => {
                        if (isMounted) {
                            loadedImages[i - 1] = img;
                            loadedCount++;
                            setLoadProgress(Math.round((loadedCount / frameCount) * 100));

                            // Draw the first frame immediately so background isn't empty
                            if (i === 1 && canvasRef.current) {
                                drawFrame(img);
                            }

                            // Update images periodically so the animation starts working even before 100%
                            if (loadedCount % 10 === 0 || loadedCount === frameCount) {
                                setImages([...loadedImages]);
                            }

                            if (loadedCount === frameCount) {
                                console.log(`Finished loading ${product.id}: ${loadedCount}/${frameCount} frames`);
                                setIsLoading(false);
                            }
                        }
                        resolve(img);
                    };

                    img.onerror = () => {
                        if (retryCount < 2) {
                            setTimeout(() => resolve(loadFrame(i, retryCount + 1)), 300);
                        } else {
                            console.error(`Double failure on frame ${paddedIndex}`);
                            if (isMounted) {
                                loadedCount++;
                                setLoadProgress(Math.round((loadedCount / frameCount) * 100));

                                // Even on error, we might need to update state to finish loading
                                if (loadedCount === frameCount) {
                                    setImages([...loadedImages]);
                                    setIsLoading(false);
                                }
                            }
                            resolve(null);
                        }
                    };
                });
            };

            // Load frames in concurrent batches - smaller size to prevent congestion
            const batchSize = 20;
            for (let i = 1; i <= frameCount; i += batchSize) {
                if (!isMounted) return;
                const batch = [];
                for (let j = i; j < i + batchSize && j <= frameCount; j++) {
                    batch.push(loadFrame(j));
                }
                await Promise.all(batch);
            }
        };

        preloadImages();

        return () => {
            isMounted = false;
        };
    }, [product.id, product.folderPath, frameCount]);

    // Map progress to frame
    const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const unsubscribe = currentFrameIndex.on("change", (latestVal) => {
            const idx = Math.floor(latestVal);
            if (images && images.length > 0) {
                // Find the closest available frame
                let targetIdx = idx;

                // If the exact frame isn't there, find nearest valid one
                if (!images[targetIdx]) {
                    // Search backwards first
                    for (let i = idx; i >= 0; i--) {
                        if (images[i]) {
                            targetIdx = i;
                            break;
                        }
                    }
                    // If still not found, search forwards
                    if (!images[targetIdx]) {
                        for (let i = idx; i < frameCount; i++) {
                            if (images[i]) {
                                targetIdx = i;
                                break;
                            }
                        }
                    }
                }

                if (images[targetIdx]) {
                    // console.log(`Drawing frame ${targetIdx} for ${product.id}`);
                    drawFrame(images[targetIdx]);
                }
            }
        });
        return () => unsubscribe();
    }, [images, currentFrameIndex, frameCount]);

    const drawFrame = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas || !img) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Use standard width/height for calculations but scale for DPR
        const logicalWidth = rect.width;
        const logicalHeight = rect.height;

        if (logicalWidth === 0 || logicalHeight === 0) return;

        if (canvas.width !== logicalWidth * dpr || canvas.height !== logicalHeight * dpr) {
            canvas.width = logicalWidth * dpr;
            canvas.height = logicalHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Clear canvas
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        // Calculate dimensions to "cover" the canvas (fill the screen)
        const imgAspect = img.width / img.height;
        const canvasAspect = logicalWidth / logicalHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > canvasAspect) {
            // Image is wider than canvas (e.g. landscape image on portrait screen)
            drawHeight = logicalHeight;
            drawWidth = logicalHeight * imgAspect;
            offsetX = (logicalWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Image is taller than canvas (e.g. portrait image on landscape screen)
            drawWidth = logicalWidth;
            drawHeight = logicalWidth / imgAspect;
            offsetX = 0;
            offsetY = (logicalHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Ensure resize draws properly
    useEffect(() => {
        const handleResize = () => {
            const idx = Math.floor(currentFrameIndex.get());
            if (images && images[idx]) {
                drawFrame(images[idx]);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images, currentFrameIndex]);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-transparent w-full">
            <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden z-10">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full absolute inset-0 z-10 pointer-events-none"
                />
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
                </div>


            </div>
        </div>
    );
}
