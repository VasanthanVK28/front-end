import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaArrowRight, FaTag } from "react-icons/fa";
import { LuSparkle, LuTrendingUp } from "react-icons/lu";
import { MdVerified, MdStorefront } from "react-icons/md";
import api from "../api/axios";
import NavbarWithSidebar from "./NavbarWithSidebar";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import { motion, AnimatePresence } from "framer-motion";

// 🌀 Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const brands = [
    { name: "Apple", logo: "https://logo.svgcdn.com/logos/apple.png" },
    { name: "HP", logo: "https://logos-world.net/wp-content/uploads/2020/11/Hewlett-Packard-Logo-2008-2014.png" },
    { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/640px-Dell_logo_2016.svg.png" },
    { name: "Samsung", logo: "https://logo.svgcdn.com/logos/samsung.png" },
    { name: "OnePlus", logo: "https://oasis.opstatics.com/content/dam/oasis/page/vi/03Image%20A_large.jpg" },
    { name: "Redmi", logo: "https://wallpapercave.com/wp/wp6707768.png" },
  ];

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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <NavbarWithSidebar />

      {/* 🚀 HERO SECTION WITH PARALLAX & GLASSMORPHISM */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-purple-400 blur-[150px] opacity-40 z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-50px] left-[-100px] w-[500px] h-[500px] bg-pink-400 blur-[150px] opacity-40 z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-0">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
          >
            <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm mb-4 border border-white/40">
              <span className="text-purple-600 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                <LuSparkle /> {t("new_arrivals")} 2025
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              Discover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Luxury
              </span>
            </h1>
            <p className="text-lg text-gray-800 font-medium mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t("explore_collections")} Experience the best in class electronics, fashion, and lifestyle products tailored for you.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                {t("shop_now")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-bold shadow-md hover:bg-gray-50 transition-colors"
              >
                {t("view_deals")}
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full h-[400px] lg:h-full flex items-center justify-center lg:justify-end"
          >
            {/* Abstract Glass Cards Composition */}
            <div className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
              <motion.img
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2929&auto=format&fit=crop"
                alt="Hero 1"
                className="absolute top-0 right-0 w-64 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white transform rotate-6 z-10"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                alt="Hero 2"
                className="absolute bottom-10 left-0 w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-white transform -rotate-6 z-20"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-purple-200 rounded-full z-0 animate-spin-slow opacity-30 border-dashed"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✨ LIVE TICKER */}
      <div className="bg-gray-900 py-3 overflow-hidden border-b border-gray-800">
        <motion.div
          className="flex gap-10 whitespace-nowrap text-white font-medium text-sm tracking-wider uppercase"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="flex items-center gap-2"><LuSparkle className="text-yellow-400" /> {t("super_deals")}</span>
          <span className="flex items-center gap-2"><FaTag className="text-pink-400" /> Flash Sale: 50% Off Top Brands</span>
          <span className="flex items-center gap-2"><LuSparkle className="text-yellow-400" /> Free Shipping on orders over ₹499</span>
          <span className="flex items-center gap-2"><FaTag className="text-pink-400" /> Use Code: TRENDY2025</span>
          {/* Repeat content for smooth loop */}
          <span className="flex items-center gap-2"><LuSparkle className="text-yellow-400" /> {t("super_deals")}</span>
          <span className="flex items-center gap-2"><FaTag className="text-pink-400" /> Flash Sale: 50% Off Top Brands</span>
        </motion.div>
      </div>

      {/* 🛍️ CATEGORIES SECTION (GLASS CARDS) */}
      <div id="categories" className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <MdStorefront className="text-purple-600 text-4xl" />
            {t("product_categories")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {[
            { name: t("laptops"), key: "laptop", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" },
            { name: t("mobiles"), key: "mobile", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop" },
            { name: t("sofas"), key: "sofa", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop" },
            { name: t("shirts"), key: "shirt", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop" },
            { name: t("toys"), key: "toys", img: "https://images.unsplash.com/photo-1558877385-81a1c7167d30?q=80&w=2070&auto=format&fit=crop" },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => handleCategoryClick(cat.key)}
              className="relative group cursor-pointer h-64 rounded-3xl overflow-hidden shadow-lg"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                <h3 className="text-white font-bold text-xl tracking-wide">{cat.name}</h3>
                <div className="w-0 group-hover:w-full h-0.5 bg-yellow-400 mx-auto transition-all duration-300 mt-2"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ⭐ POPULAR PRODUCTS (FLOATING CARDS) */}
      <div className="bg-white py-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                <FaRegStar className="text-yellow-500" />
                {t("popular_products")}
              </h2>
              <p className="text-gray-500 mt-2">Handpicked favorites just for you</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition">
              View All <FaArrowRight />
            </button>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="pb-16"
          >
            {products.slice(0, visibleCount).map((item) => (
              <SwiperSlide key={item.asin || item._id}>
                <Link to={`/popular-product/${item.asin || item._id}`} state={{ product: item }}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 h-full flex flex-col group"
                  >
                    <div className="relative w-full h-56 bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaShoppingCart className="text-purple-600" />
                      </div>
                      {item.discount && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">{item.brand}</p>
                      <h3 className="text-gray-900 font-bold text-lg mb-1 leading-tight line-clamp-2 flex-1">{item.title}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm mb-3">
                        <FaStar /> <span className="text-gray-500">({item.rating || 4.5})</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="text-xl font-black text-gray-900">₹{item.price}</span>
                        <span className="text-sm text-gray-500 font-medium line-through">₹{Math.round(parseInt(String(item.price || "0").replace(/,/g, "")) * 1.2).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 🏷️ BRANDS MARQUEE (INFINITE SCROLL) */}
      <div className="py-16 bg-white border-t border-gray-100">
        <h2 className="text-center text-xl font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">{t("trusted_by_brands")}</h2>
        <div className="overflow-hidden relative w-full">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <motion.div
            className="flex gap-16 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img src={brand.logo} alt={brand.name} className="h-12 w-auto object-contain" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 🔥 PROMO BANNER */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 transform skew-y-3 origin-bottom-left -z-10 h-full w-full scale-110"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between text-white gap-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">Big Savings. <br /> Bigger Dreams.</h2>
            <p className="text-gray-700 text-xl mb-8 font-medium">Up to 50% off on premium electronics and fashion. Limited time only.</p>
            <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-black transition-all transform hover:-translate-y-1 hover:shadow-2xl">
              {t("view_deals") || "View Deals"}
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full"></div>
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" alt="Shopping Promo" className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 border-4 border-white/20 relative z-10" />
          </motion.div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <LuTrendingUp />, title: t("easy_exchange"), desc: "Hassle-free returns within 30 days." },
            { icon: <MdVerified />, title: t("handpicked"), desc: "100% authentic products verified by us." },
            { icon: <FaStar />, title: t("assured_quality"), desc: "Top-rated quality you can trust." },
          ].map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
              <p className="text-gray-500">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-0 pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Trendy<span className="text-purple-500">Mart</span></h3>
            <p className="text-gray-400 leading-relaxed">Your one-stop destination for premium products. Experience quality like never before.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition">Electronics</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Fashion</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Home</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Help</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition">Shipping</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Social</h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TrendyMart. Made with <span className="text-red-500">❤</span> for the future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
