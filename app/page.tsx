"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentProduct = products[currentIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
        // Update global CSS variable for background gradient
        document.documentElement.style.setProperty(
            "--product-gradient",
            currentProduct.gradient
        );
    }, [currentIndex, currentProduct]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const handleJump = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <>
            <Navbar />

            {/* Main Orchestrator */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={currentProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative w-full text-white"
                >
                    {/* 1. Scrollytelling Experience */}
                    <ProductBottleScroll product={currentProduct} />

                    {/* 2. Content Sections - Revealed on Scroll */}
                    <div className="relative z-20 pb-32">

                        {/* Visual Details Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-6xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row items-center gap-16"
                        >
                            <div className="flex-1 space-y-6">
                                <span className="text-sm font-black tracking-widest uppercase text-white/50">
                                    {currentProduct.features[0]}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                    {currentProduct.detailsSection.title}
                                </h3>
                                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                                    {currentProduct.detailsSection.description}
                                </p>
                                <div className="pt-8 flex flex-wrap gap-4">
                                    {currentProduct.stats.map((stat, i) => (
                                        <div key={i} className="flex-1 min-w-[120px] bg-white/5 rounded-2xl p-6 border border-white/10">
                                            <p className="text-3xl font-bold">{stat.val}</p>
                                            <p className="text-sm text-white/50 mt-1 uppercase tracking-wider">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 aspect-square relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                                <img
                                    src={currentProduct.detailsSection.detailImageUrl}
                                    alt={currentProduct.detailsSection.imageAlt}
                                    className="w-full h-full object-cover relative z-0"
                                />
                            </div>
                        </motion.section>

                        {/* Freshness/Process Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="mt-12 max-w-5xl mx-auto px-6 text-center"
                        >
                            <h3 className="text-4xl md:text-6xl font-black opacity-20 uppercase tracking-widest">
                                {currentProduct.freshnessSection.title}
                            </h3>
                            <p className="text-xl md:text-2xl mt-8 max-w-3xl mx-auto text-white/80 font-light leading-relaxed">
                                {currentProduct.freshnessSection.description}
                            </p>
                        </motion.section>

                        {/* Commerce / Buy Now Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto px-6 mt-32 bg-gray-950/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-4xl font-bold">Try {currentProduct.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black">{currentProduct.buyNowSection.price}</span>
                                        <span className="text-white/50">{currentProduct.buyNowSection.unit}</span>
                                    </div>

                                    <ul className="space-y-3 pt-6">
                                        {currentProduct.buyNowSection.processingParams.map((param, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                <span className="text-white/80">{param}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-sm text-white/50 italic pt-6">
                                        {currentProduct.buyNowSection.returnPolicy}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-center space-y-6">
                                    <button className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                        Add to Cart - {currentProduct.buyNowSection.price}
                                    </button>
                                    <p className="text-xs text-center text-white/40 leading-relaxed">
                                        {currentProduct.buyNowSection.deliveryPromise}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Next Flavor Slanted Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mt-32 max-w-4xl mx-auto px-6"
                        >
                            <button
                                onClick={handleNext}
                                className="w-full relative group overflow-hidden bg-white/10 hover:bg-white/20 transition-all duration-500 rounded-3xl p-10 border border-white/20 text-left flex justify-between items-center"
                            >
                                <div className="relative z-10">
                                    <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Continue the journey</p>
                                    <h4 className="text-4xl md:text-5xl font-black text-white">
                                        Next Flavor
                                    </h4>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform group-hover:translate-x-4 transition-transform duration-500">
                                    <ArrowRight size={24} />
                                </div>
                            </button>
                        </motion.div>

                    </div>
                </motion.main>
            </AnimatePresence>

            <Footer />

            {/* Navigation Overlays */}

            {/* Side Arrows */}
            <div className="fixed top-1/2 left-4 md:left-8 -translate-y-1/2 z-50">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:-translate-x-1"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            <div className="fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-50">
                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:translate-x-1"
                >
                    <ArrowRight size={20} />
                </button>
            </div>

            {/* Bottom Center Pill Menu */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="flex bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-2 gap-2 shadow-2xl">
                    {products.map((p, idx) => (
                        <button
                            key={p.id}
                            onClick={() => handleJump(idx)}
                            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${currentIndex === idx
                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                : "text-white/50 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {p.name.split(" ")[0]}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
