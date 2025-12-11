import { FaSearch, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLaptop, FaMobileAlt, FaCouch, FaTshirt, FaGamepad } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavbarBanner = () => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  const bannerImages = [
    "https://img.freepik.com/premium-psd/banner-laptop-computer-sale-electronic-agency-social-media-web-banner-post-template-psd_610210-390.jpg?w=2000",
    "https://i.pinimg.com/originals/06/ba/27/06ba2728b2ff329fa448072ba7676b01.jpg",
    "https://img.freepik.com/premium-psd/new-arrival-t-shirt-banner-template_361928-1654.jpg?w=740",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    window.open(amazonUrl, "_blank");
  };

  // Helper to get environment variables safely
  const getEnv = (key) => import.meta.env[key] || "#";

  // Data Collections
  const collections = [
    {
      title: "Laptop Collections",
      icon: <FaLaptop />,
      gradient: "from-blue-500 via-cyan-400 to-indigo-500",
      items: [
        { title: "HP 15, 13th Gen", img: "https://m.media-amazon.com/images/I/71FXHAM+jWL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_1") },
        { title: "Acer Aspire Lite", img: "https://m.media-amazon.com/images/I/513p8BwV-RL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_2") },
        { title: "Ultimus APEX Pro", img: "https://m.media-amazon.com/images/I/61rutN1uR6L._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_3") },
        { title: "JioBook 11", img: "https://m.media-amazon.com/images/I/61IDcxw27+L._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_4") },
        { title: "HP 15, 13th Gen", img: "https://m.media-amazon.com/images/I/71Z4mSII9BL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_5") },
        { title: "Acer Aspire 3", img: "https://m.media-amazon.com/images/I/61qlqvTsocL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_6") },
        { title: "ASUS Vivobook 15", img: "https://m.media-amazon.com/images/I/71zMooVIVAL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_7") },
        { title: "HP Victus", img: "https://m.media-amazon.com/images/I/71wT57gW0hL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_8") },
        { title: "Lenovo V15 G4", img: "https://m.media-amazon.com/images/I/71aup0IO2ZL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_9") },
        { title: "ULTIMUS APEX", img: "https://m.media-amazon.com/images/I/713QmwFZbsL._AC_UY218_.jpg", url: getEnv("VITE_LAPTOP_10") },
      ]
    },
    {
      title: "Mobile Collections",
      icon: <FaMobileAlt />,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      items: [
        { title: "realme NARZO 80", img: "https://m.media-amazon.com/images/I/81oxfhHd5XL._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_1") },
        { title: "realme NARZO 80 Lite", img: "https://m.media-amazon.com/images/I/71Vjn1DfArL._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_2") },
        { title: "Samsung Galaxy M35", img: "https://m.media-amazon.com/images/I/81nt-RGKpyL._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_3") },
        { title: "Redmi 13 5G", img: "https://m.media-amazon.com/images/I/81CQZB2t52L._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_4") },
        { title: "Samsung Galaxy M06", img: "https://m.media-amazon.com/images/I/71iMTdPA34L._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_5") },
        { title: "iQOO Neo 10", img: "https://m.media-amazon.com/images/I/61gGRaXQoGL._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_6") },
        { title: "Redmi A4 5G", img: "https://m.media-amazon.com/images/I/718HzJbvY1L._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_7") },
        { title: "Samsung Galaxy S24", img: "https://m.media-amazon.com/images/I/71eUNTW+nJL._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_8") },
        { title: "POCO M6 Plus", img: "https://m.media-amazon.com/images/I/71tsuJCkV+L._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_9") },
        { title: "OnePlus 13s", img: "https://m.media-amazon.com/images/I/61BTIyv+XdL._AC_UY218_.jpg", url: getEnv("VITE_MOBILE_10") },
      ]
    },
    {
      title: "Sofa Collections",
      icon: <FaCouch />,
      gradient: "from-emerald-500 via-teal-400 to-green-500",
      items: [
        { title: "Holstein Housewares", img: "https://m.media-amazon.com/images/I/71BkBl2ehAL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_1") },
        { title: "SleepyHug FoldPRO", img: "https://m.media-amazon.com/images/I/81CKGLYc35L._AC_UL320_.jpg", url: getEnv("VITE_SOFA_2") },
        { title: "Adorn India Premium", img: "https://m.media-amazon.com/images/I/81IF8CFdFEL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_3") },
        { title: "AMATA Eagle Wood", img: "https://m.media-amazon.com/images/I/51OZfS1WkgL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_4") },
        { title: "WESTERN WOOD ART", img: "https://m.media-amazon.com/images/I/71bku3+80jL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_5") },
        { title: "STRATA FURNITURE", img: "https://m.media-amazon.com/images/I/5100dr0PkVL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_6") },
        { title: "Sleepyhead Kiki", img: "https://m.media-amazon.com/images/I/71FsK1GXYuL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_7") },
        { title: "Sofa Cum Bed", img: "https://m.media-amazon.com/images/I/61jCawANhpL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_8") },
        { title: "AMATA Solid Wood", img: "https://m.media-amazon.com/images/I/51yZzx-mq0L._AC_UL320_.jpg", url: getEnv("VITE_SOFA_9") },
        { title: "Wakefit Polyester", img: "https://m.media-amazon.com/images/I/616udVTZUEL._AC_UL320_.jpg", url: getEnv("VITE_SOFA_10") },
      ]
    },
    {
      title: "Shirt Collections",
      icon: <FaTshirt />,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      items: [
        { title: "SOLY CLOTHING", img: "https://m.media-amazon.com/images/I/61rJgcPO1GL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_1") },
        { title: "CB-COLEBROOK", img: "https://m.media-amazon.com/images/I/71DU0wuXOSL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_2") },
        { title: "U TURN", img: "https://m.media-amazon.com/images/I/71Jli-Yjv2L._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_3") },
        { title: "FINIVO FASHION", img: "https://m.media-amazon.com/images/I/51yn92oL9fL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_4") },
        { title: "Indian Garage Co", img: "https://m.media-amazon.com/images/I/61rG+UIslgL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_5") },
        { title: "Majestic Man", img: "https://m.media-amazon.com/images/I/71ck9U5rmkL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_6") },
        { title: "Allen Solly", img: "https://m.media-amazon.com/images/I/61idJrfaIRL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_7") },
        { title: "Lymio", img: "https://m.media-amazon.com/images/I/71V5gEc8YVL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_8") },
        { title: "TAGDO", img: "https://m.media-amazon.com/images/I/71LnycrT7qL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_9") },
        { title: "INKAST", img: "https://m.media-amazon.com/images/I/714veNGWosL._AC_UL320_.jpg", url: getEnv("VITE_SHIRT_10") },
      ]
    },
    {
      title: "Toys Collections",
      icon: <FaGamepad />,
      gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      items: [
        { title: "GRAPHENE 4WD", img: "https://m.media-amazon.com/images/I/81iA9xlbqjL._AC_UL320_.jpg", url: getEnv("VITE_TOY_1") },
        { title: "Storio Inflatable", img: "https://m.media-amazon.com/images/I/61mHUJFQhoL._AC_UL320_.jpg", url: getEnv("VITE_TOY_2") },
        { title: "Plush Teddy Bear", img: "https://m.media-amazon.com/images/I/51C5TrSt-GL._AC_UL320_.jpg", url: getEnv("VITE_TOY_3") },
        { title: "Galaxy Mini Metal", img: "https://m.media-amazon.com/images/I/71XiWPwcVoL._AC_UL320_.jpg", url: getEnv("VITE_TOY_4") },
        { title: "Mirana Vande Bharat", img: "https://m.media-amazon.com/images/I/61jA-v+qZ6L._AC_UL320_.jpg", url: getEnv("VITE_TOY_5") },
        { title: "Bedtime Kids Slide", img: "https://m.media-amazon.com/images/I/7110Uyo6lXL._AC_UL320_.jpg", url: getEnv("VITE_TOY_6") },
        { title: "Gooyo GY3716", img: "https://m.media-amazon.com/images/I/51tJJaipJlL._AC_UL320_.jpg", url: getEnv("VITE_TOY_7") },
        { title: "VGRASSP Radish", img: "https://m.media-amazon.com/images/I/61hVaHSCx2L._AC_UL320_.jpg", url: getEnv("VITE_TOY_8") },
        { title: "Blix Queaky- STEM", img: "https://m.media-amazon.com/images/I/41KNN7e0KEL._AC_UL320_.jpg", url: getEnv("VITE_TOY_9") },
        { title: "ToyTastic Suction", img: "https://m.media-amazon.com/images/I/61THM73i4KL._AC_UL320_.jpg", url: getEnv("VITE_TOY_10") },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ✅ NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-2" : "bg-white py-4 shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">T</div>
            <div className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              Trendy<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Mart</span>
            </div>
          </div>

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-xl mx-8 relative"
          >
            <input
              type="text"
              placeholder="Find your favorite products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none shadow-inner"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-1.5 rounded-full hover:bg-indigo-700 transition-colors">
              <FaSearch size={12} />
            </button>
          </motion.form>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-full font-bold text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all">
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-lg hover:shadow-indigo-200 transition-all">
                Register
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ✅ BANNER */}
      <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white"
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            spaceBetween={0}
            effect="fade"
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ clickable: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="h-[300px] sm:h-[400px] md:h-[500px]"
          >
            {bannerImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img src={img} alt="Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* ✅ COLLECTIONS */}
      <div className="space-y-20 pb-20">
        {collections.map((cat, idx) => (
          <section key={idx} className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className={`p-3 rounded-2xl text-white bg-gradient-to-r ${cat.gradient} shadow-lg`}>
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                {cat.title}
              </h2>
              <div className="h-1 flex-1 bg-gray-100 rounded-full ml-4">
                <div className={`h-full w-20 rounded-full bg-gradient-to-r ${cat.gradient}`}></div>
              </div>
            </motion.div>

            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              loop={true}
              navigation
              autoplay={{ delay: 3000 + (idx * 500), disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="p-4 -m-4"
            >
              {cat.items.map((item, itemIdx) => (
                <SwiperSlide key={itemIdx} className="pt-2 pb-10 pl-2 pr-2">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 group"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                        <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-500 shadow-sm">
                          New
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-800 line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">In Stock</span>
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            ➔
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        ))}
      </div>

      {/* ✅ FOOTER */}
      <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="h-full w-full" preserveAspectRatio="none"><defs><pattern id="footer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="2" height="2" fill="currentColor"></rect></pattern></defs><rect width="100%" height="100%" fill="url(#footer-pattern)"></rect></svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
              <span className="text-2xl font-bold text-white">TrendyMart</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for the latest electronics, fashion, and lifestyle products. We bring the trend to your doorstep.
            </p>
            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Shop", "Trending", "New Arrivals", "Deals"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white hover:translate-x-2 inline-block transition-transform duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Customer Support</h3>
            <ul className="space-y-3">
              {["Help Center", "Order Tracking", "Returns & Refunds", "Shipping Info", "Privacy Policy"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white hover:translate-x-2 inline-block transition-transform duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <p>TrendyMart Private Limited</p>
              <p>CIN: U62000KA2025PTC000123</p>
              <p className="opacity-70">
                3rd Floor, Trendy Business Park,<br />
                MGR Statue, Virudhunagar,<br />
                Tamilnadu, India, 626001
              </p>
              <a href="mailto:query@trendymart.com" className="block text-indigo-400 hover:text-white transition-colors">query@trendymart.com</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TrendyMart. All rights reserved. Designed with ❤️ for shoppers.</p>
        </div>
      </footer>
    </div>
  );
};

export default NavbarBanner;
