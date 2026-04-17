import React from "react";
import { motion } from "framer-motion";

// animations
const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.0, ease: "easeOut", type: "spring", damping: 20 },
    },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -200, scale: 0.8, rotate: -15 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: { duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 },
    },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 200, scale: 0.8, rotate: 15 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: { duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.5,
            delayChildren: 0.2,
        },
    },
};

const CategoriesSection = ({
    handleCategoryClick,
    activeCategory = "premium-pads",
    t = (text) => text,
}) => {
    const napkinPad1 = "/images/pads-1.png";
    const napkinPad2 = "/images/pads-2.png";

    const tabBg = "/images/napkin-pads.png";

    const categories = [
        {
            name: "Premium Pads",
            key: "premium-pads",
            img: napkinPad1,
        },
        {
            name: "Bamboo Pads",
            key: "bamboo-pads",
            img: napkinPad2,
        },
    ];

    return (
        <section
            id="categories"
            className="
                relative z-10
                -mt-8 sm:-mt-10 lg:-mt-12
                py-12 lg:py-16
                overflow-hidden
            "
        >
            {/* Dark Purple Gradient — matched from uploaded image */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(135deg, #6e0fbdef 0%, #370460ff 20%, #751fbbff 45%, #4A1570 68%, #9542d1ff 100%)",
                }}
            />

            {/* Subtle radial glow for depth */}
            <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(120, 40, 200, 0.18) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-12"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 60, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: "easeOut", type: "spring", damping: 25 }}
                        className="text-3xl lg:text-4xl mt-6 font-semibold text-white mb-4 font-[Playfair_Display]"
                    >
                        Explore Our Products
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="text-sm sm:text-base lg:text-lg mt-2 font-medium"
                        style={{ color: "#C9A8E8" }}
                    >
                        Thoughtfully designed napkin pads for comfort, care, and confidence.
                    </motion.p>

                    {/* Divider */}
                    <div
                        className="w-20 h-1 mx-auto mt-6 rounded-full"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(212, 119, 249, 0.3), rgba(202, 93, 216, 0.55), rgba(255,255,255,0.25))",
                        }}
                    />
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-start max-w-5xl mx-auto"
                >
                    {categories.map((cat, idx) => {
                        const isActive = activeCategory === cat.key;
                        const animationVariant = idx === 0 ? fadeInLeft : fadeInRight;

                        return (
                            <motion.div
                                key={idx}
                                variants={animationVariant}
                                onClick={() => handleCategoryClick(cat.key)}
                                className="group cursor-pointer flex flex-col items-center text-center"
                            >
                                {/* Product Image */}
                                <div className="w-full flex justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-3">
                                    <motion.img
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        src={cat.img}
                                        alt={cat.name}
                                        className="max-w-[360px] w-full h-auto object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                                    />
                                </div>

                                {/* Tab Label */}
                                <div
                                    className={`relative w-[250px] sm:w-[270px] lg:w-[290px] transition-all duration-300 ${
                                        isActive
                                            ? "scale-95 opacity-100 hover:scale-105"
                                            : "scale-95 opacity-95 hover:scale-105"
                                    }`}
                                >
                                    <img
                                        src={tabBg}
                                        alt={cat.name}
                                        className="w-full h-auto object-contain"
                                    />

                                    <span
                                        className="
                                            absolute left-1/2 top-[55%]
                                            -translate-x-1/2 -translate-y-1/2
                                            w-[88%]
                                            text-center
                                            text-white
                                            font-[Quicksand] font-medium tracking-wider uppercase
                                            text-[18px] sm:text-[20px] lg:text-[22px]
                                            leading-none
                                            whitespace-nowrap
                                            pointer-events-none
                                        "
                                    >
                                        {cat.name}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CategoriesSection;