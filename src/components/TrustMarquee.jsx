import React from 'react';
import { motion } from 'framer-motion';
const napkinPad1 = "/images/test-1.jpg";
const napkinPad2 = "/images/test-2.jpg";
const napkinPad3 = "/images/test-3.jpg";
const napkinPad4 = "/images/test-4.jpg";
const napkinPad5 = "/images/test-5.jpg";

const TrustMarquee = () => {
    const trustItems = [
        { img: napkinPad1, text: "Dermatologically tested" },
        { img: napkinPad2, text: "Non-irritant" },
        { img: napkinPad3, text: "Vegan" },
        { img: napkinPad4, text: "Cruelty Free" },
        { img: napkinPad5, text: "Eco-Friendly" },
    ];

    // Duplicate items for seamless loop
    const loopItems = [...trustItems, ...trustItems, ...trustItems, ...trustItems];

    return (
        <section className="relative z-[70] bg-white py-16 overflow-hidden border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 mb-10"
            >
                <motion.h2 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-purple-800 text-2xl sm:text-3xl font-extrabold text-center"
                >
                    Tested. Trusted. Safe.
                </motion.h2>
            </motion.div>

            <div className="relative flex gap-12 sm:gap-24 items-center">
                {/* Modern Infinite Marquee using CSS Animation */}
                <div className="flex gap-12 sm:gap-24 animate-marquee whitespace-nowrap">
                    {loopItems.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex flex-col items-center gap-4 min-w-[150px] sm:min-w-[200px]"
                        >
                            <motion.div 
                                initial={{ opacity: 0, rotate: -180 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                                className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center"
                            >
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.1, ease: "easeOut", whileHover: { type: "spring", stiffness: 200 } }}
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    src={item.img}
                                    alt={item.text}
                                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </motion.div>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.7 + idx * 0.1, ease: "easeOut" }}
                                className="text-[#7C3AED] font-medium text-xs sm:text-sm text-center"
                            >
                                {item.text}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default TrustMarquee;
