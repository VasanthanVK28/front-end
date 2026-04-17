import React from 'react';
import { motion } from 'framer-motion';
import NavbarWithSidebar from './NavbarWithSidebar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
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
                            Get in <span className="text-[#7C3AED]">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            Have questions or feedback? We'd love to hear from you.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-[#7C3AED] text-white rounded-xl flex items-center justify-center shadow-lg">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                                    <p className="text-lg font-bold text-gray-900">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-[#7C3AED] text-white rounded-xl flex items-center justify-center shadow-lg">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Email</p>
                                    <p className="text-lg font-bold text-gray-900">support@purecomfort.care</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-[#7C3AED] text-white rounded-xl flex items-center justify-center shadow-lg">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Location</p>
                                    <p className="text-lg font-bold text-gray-900">New Delhi, India</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl shadow-purple-100 border border-gray-100"
                        >
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all font-medium" placeholder="Jane Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all font-medium" placeholder="jane@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Message</label>
                                    <textarea rows="4" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all font-medium" placeholder="How can we help?"></textarea>
                                </div>
                                <button className="w-full py-5 bg-[#7C3AED] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-200 hover:shadow-2xl hover:bg-[#6D28D9] transition-all active:scale-[0.98]">
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
