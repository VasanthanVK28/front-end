import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CategoriesSection from "../components/CategoriesSection";
import PopularProducts from "../components/PopularProducts";
import Ads from "../components/Ads";
import NavbarWithSidebar from "./NavbarWithSidebar";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import { motion } from "framer-motion";
import FlashSales from "../components/FlashSales";
import TrendingThisWeek from "../components/TrendingThisWeek";
import TrustMarquee from "../components/TrustMarquee";
import Testimonials from "../components/Testimonials";
import ShopBanner from "../components/ShopBanner";

import napkinPad1 from "../assets/pads-1.png";
import napkinPad2 from "../assets/pads-2.png";
import heroBg from "../assets/ban-1.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products?lang=${i18n.language}`);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [i18n.language]);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="bg-[#FAFAF9] font-sans">
      <NavbarWithSidebar />

      <main className="relative">
        {/* HERO SECTION - Normal section, no sticky, no overlap */}
        <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative w-full flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-64 sm:w-80 lg:w-[450px] z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="relative z-10 bg-[#FAFAF9] py-10 sm:py-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <CategoriesSection
              napkinPad1={napkinPad1}
              napkinPad2={napkinPad2}
              handleCategoryClick={handleCategoryClick}
            />
          </motion.div>
        </section>

        {/* POPULAR PRODUCTS */}
        <section className="relative z-10 bg-[#FAFAF9] py-10 sm:py-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <PopularProducts
              napkinPad1={napkinPad1}
              napkinPad2={napkinPad2}
              t={t}
              fadeInUp={fadeInUp}
              products={products}
            />
          </motion.div>
        </section>

        {/* ADS */}
        <section className="relative z-10 bg-[#FAFAF9] py-10 sm:py-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Ads />
          </motion.div>
        </section>

        {/* FLASH SALES - removed negative margin */}
        <section className="relative z-10 bg-[#FAFAF9] py-10 sm:py-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FlashSales
              t={t}
              products={[
                {
                  title: "Premium cotton top sheet ultra thin rash free pads XL+ 21 pads",
                  price: "314",
                  originalPrice: "349",
                  size: "XL+ 290MM",
                  available: "21 Pads",
                  image: napkinPad1,
                },
                {
                  title: "No leak heavy flow soft ultra thin pads XXL+ 21 pads",
                  price: "314",
                  originalPrice: "349",
                  size: "XXL+ 330MM",
                  available: "21 Pads",
                  image: napkinPad2,
                },
                {
                  title: "Extra wide soft comfort full night pads XXL+ 21 pads",
                  price: "378",
                  originalPrice: "420",
                  size: "XXL+ 330MM",
                  available: "21 Pads",
                  image: napkinPad1,
                },
                {
                  title: "Premium fluffy US cotton netted top sheet straight pads",
                  price: "360",
                  originalPrice: "399",
                  size: "XL+ 280mm",
                  available: "48 Pads",
                  image: napkinPad2,
                },
              ]}
            />
          </motion.div>
        </section>

        {/* OTHER SECTIONS */}
        <section className="relative z-10 bg-[#FAFAF9]">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <TrendingThisWeek t={t} />
          </motion.div>
        </section>

        <section className="relative z-10 bg-[#FAFAF9]">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <TrustMarquee />
          </motion.div>
        </section>

        <section className="relative z-10 bg-[#FAFAF9]">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Testimonials />
          </motion.div>
        </section>

        <section className="relative z-10 bg-[#FAFAF9]">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ShopBanner />
          </motion.div>
        </section>

        {/* FOOTER */}
        <motion.footer
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full bg-white text-gray-600 mt-0 pt-16 sm:pt-20 pb-0 border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Pure<span className="text-purple-800">Comfort</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                Premium organic bamboo napkin pads designed for your absolute
                comfort and environmental sustainability.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 font-black mb-6 uppercase tracking-[0.2em] text-xs">
                Products
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition"
                  >
                    Premium Pads
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition"
                  >
                    Bamboo Pads
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition"
                  >
                    Eco Collection
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-black mb-6 uppercase tracking-[0.2em] text-xs">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition"
                  >
                    How to Use
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition"
                  >
                    Size Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-black mb-6 uppercase tracking-[0.2em] text-xs">
                Stay Connected
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: "fa-facebook-f", link: "#" },
                  { icon: "fa-twitter", link: "#" },
                  { icon: "fa-instagram", link: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-100 transition-all duration-300"
                  >
                    <i className={`fab ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full py-6 mt-12 sm:mt-16 bg-[linear-gradient(135deg,#0f0524_0%,#2a0a4a_20%,#5b21b6_45%,#9333ea_70%,#e879f9_100%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xs sm:text-sm font-bold text-white">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-purple-200 font-extrabold">
                  PureComfort
                </span>
                . Delivering kindness to your body & the planet.
              </p>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Home;