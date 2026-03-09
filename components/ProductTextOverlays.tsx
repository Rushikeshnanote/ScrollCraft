"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
    product: Product;
    scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: ProductTextOverlaysProps) {
    // Define opacity maps for the 4 sections
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]); // Stays at the end

    // Define Y translates for a smooth slide-up effect
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [50, 0, -50]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7], [50, 0, -50]);
    const y4 = useTransform(scrollYProgress, [0.75, 0.85], [50, 0]);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute flex flex-col items-center justify-center w-full max-w-4xl"
            >
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                    {product.section1.title}
                </h1>
                <p className="text-2xl md:text-4xl font-medium text-white/90 mt-4 drop-shadow-lg">
                    {product.section1.subtitle}
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute flex flex-col items-center justify-center w-full max-w-4xl"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                    {product.section2.title}
                </h2>
                <p className="text-xl md:text-3xl font-medium text-white/80 mt-4 max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
                    {product.section2.subtitle}
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute flex flex-col items-center justify-center w-full max-w-4xl"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                    {product.section3.title}
                </h2>
                <p className="text-xl md:text-3xl font-medium text-white/80 mt-4 max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
                    {product.section3.subtitle}
                </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
                style={{ opacity: opacity4, y: y4 }}
                className="absolute flex flex-col items-center justify-center w-full max-w-4xl"
            >
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                    {product.section4.title}
                </h2>
                {/* Render subtitle only if it exists */}
                {product.section4.subtitle && (
                    <p className="text-2xl md:text-4xl font-medium text-white/90 mt-4 drop-shadow-lg">
                        {product.section4.subtitle}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
