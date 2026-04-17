import React from 'react';
import { motion } from 'framer-motion';
import NavbarWithSidebar from './NavbarWithSidebar';

const About = () => {
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
                        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                            About <span className="text-[#7C3AED]">PureComfort</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            We are on a mission to redefine period care with products that are kind to your body and the planet.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Founded with the belief that women deserve better, PureComfort focuses on creating premium organic bamboo napkin pads that provide unparalleled protection without the use of harsh chemicals or synthetic materials.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Every product we create is a step towards a more sustainable future, ensuring that your wellness never comes at the cost of the environment.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-purple-50 rounded-[3rem] p-12 aspect-square flex items-center justify-center shadow-inner"
                        >
                            <div className="text-center">
                                <div className="text-7xl mb-4">🌿</div>
                                <h3 className="text-2xl font-black text-[#7C3AED]">100% Organic</h3>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
