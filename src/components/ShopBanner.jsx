import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/im-2.jpg";

const ShopBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Shop Background"
                    className="w-full h-full object-cover"
                />
                {/* Visual Overlay for Readability */}
                
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h2 className="text-4xl sm:text-6xl font-black text-purple-800 mb-8 tracking-tighter drop-shadow-2xl">
                        READY TO EXPERIENCE <br />
                        <span className="text-purple-800 italic">BETTER CARE?</span>
                    </h2>

                    <button
                        onClick={() => navigate("/products/all")}
                        className="group relative inline-flex items-center justify-center px-12 py-5 font-black text-white uppercase tracking-[0.2em] text-sm bg-[#7C3AED] rounded-full overflow-hidden shadow-[0_20px_50px_rgba(124,58,237,0.3)] hover:shadow-[0_30px_60px_rgba(124,58,237,0.4)] transition-all duration-300 active:scale-95"
                    >
                        {/* Animated Background of Button */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />

                        <span className="relative flex items-center gap-3">
                            SHOP NOW
                            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>

                    <p className="mt-8 text-white/70 font-bold uppercase tracking-[0.3em] text-[10px]">
                        Free Shipping on Orders over ₹499
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopBanner;
