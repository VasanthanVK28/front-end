import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';


const TrendingThisWeek = ({ t }) => {
    const napkinPad1 = "/images/pads-1.png";
    const napkinPad2 = "/images/pads-2.png";

    const trendingProducts = [
        {
            id: 1,
            title: "Premium cotton top sheet ultra thin rash free pads XL...",
            brand: "NAPKIN PRODUCTS",
            price: "314",
            originalPrice: "349",
            image: napkinPad1
        },
        {
            id: 2,
            title: "Overnight wider back rash free heavy flow pads XXL+...",
            brand: "NAPKIN PRODUCTS",
            price: "324",
            originalPrice: "360",
            image: napkinPad2
        },
        {
            id: 3,
            title: "No leak heavy flow soft ultra thin pads XXL+ 21 pads",
            brand: "NAPKIN PRODUCTS",
            price: "314",
            originalPrice: "349",
            image: napkinPad1
        },
        {
            id: 4,
            title: "Super absorbent heavy flow leakage protection pads...",
            brand: "NAPKIN PRODUCTS",
            price: "251",
            originalPrice: "279",
            image: napkinPad2
        },
        {
            id: 5,
            title: "Premium fluffy US cotton netted top sheet straight...",
            brand: "NAPKIN PRODUCTS",
            price: "360",
            originalPrice: "399",
            image: napkinPad1
        },
        {
            id: 6,
            title: "Premium cotton heavy flow netted pads - 6 pads × 8...",
            brand: "NAPKIN PRODUCTS",
            price: "320",
            originalPrice: "350",
            image: napkinPad2
        }
    ];

    return (
        <section className="relative py-16 sm:py-24 z-10 overflow-hidden">
   <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(135deg, #6e0fbdef 0%, #370460ff 20%, #751fbbff 45%, #4A1570 68%, #9542d1ff 100%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 relative z-10">

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative flex flex-col sm:flex-row items-center justify-center mb-2 gap-4"
                >
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight text-center font-[Playfair_Display]"
                    >
                        Trending This Week
                    </motion.h2>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="sm:absolute sm:right-0 flex items-center gap-2 text-white/90 font-semibold hover:text-white transition-colors group"
                    >
                        Shop All
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="w-20 h-1.5 bg-white/30 mx-auto mb-12 rounded-full origin-center"
                />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {trendingProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/90 backdrop-blur-md rounded-[2rem] p-5 flex items-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300 relative group"
                        >

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                                className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl flex items-center justify-center p-3 shrink-0 shadow-sm border border-gray-100/50"
                            >
                                <motion.img
                                    initial={{ opacity: 0, rotate: -15 }}
                                    whileInView={{ opacity: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-grow min-w-0 pr-10">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    {product.brand}
                                </p>

                                <h3 className="text-gray-900 font-bold text-sm sm:text-[15px] leading-snug mb-2 line-clamp-2">
                                    {product.title}
                                </h3>

                                <div className="flex items-center gap-2">
                                    <span className="text-black font-black text-lg">
                                        ₹{product.price}
                                    </span>

                                    <span className="text-gray-400 text-xs line-through font-medium">
                                        ₹{product.originalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* Arrow Button */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                                className="absolute right-5 top-1/2 -translate-y-1/2"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 45 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm"
                                >
                                    <FaArrowRight size={14} />
                                </motion.button>
                            </motion.div>

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default TrendingThisWeek;