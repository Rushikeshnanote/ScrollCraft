"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-black/40 backdrop-blur-xl border-b border-white/10 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-3 cursor-pointer">
                </div>

                {/* Action */}
                <button className="relative group px-10 py-3 rounded-full overflow-hidden bg-white text-black font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Order Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                </button>
            </div>
        </motion.nav>
    );
}
