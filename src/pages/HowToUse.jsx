import React from 'react';
import { motion } from 'framer-motion';
import NavbarWithSidebar from './NavbarWithSidebar';

const HowToUse = () => {
    const steps = [
        { title: "Unwrap", desc: "Remove the pad from its individual eco-friendly wrapper.", icon: "🎁" },
        { title: "Position", desc: "Place the pad on the center of your underwear.", icon: "📍" },
        { title: "Secure", desc: "Wrap the wings around the sides to hold the pad in place.", icon: "🛡️" },
        { title: "Dispose", desc: "Fold the used pad and dispose of it in a bin. Do not flush.", icon: "🗑️" }
    ];

    return (
        <div className="bg-white min-h-screen">
            <NavbarWithSidebar />
            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                            Using Your <span className="text-[#7C3AED]">Pads</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            Simple steps for maximum comfort and protection during your cycle.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 p-8 rounded-[2.5rem] text-center border border-gray-100 hover:border-[#7C3AED]/30 transition-all hover:bg-white hover:shadow-xl group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
