import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShareAlt } from "react-icons/fa";
import NavbarWithSidebar from "../pages/NavbarWithSidebar";
import api from "../api/axios";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

// ✨ Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BrandProducts = () => {
  const { brandName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12; // Grid view supports more items comfortably
  const { t } = useTranslation();
  const translatedBrand = t(brandName.toLowerCase()) || brandName;

  const fetchBrandProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/external/products/filter?brand=${brandName}&page=${page}&per_page=${perPage}`
      );

      setProducts(response.data.data || []);
      setCurrentPage(response.data.current_page || 1);
      setTotalPages(Math.ceil((response.data.total || 0) / perPage));
    } catch (error) {
      console.error(`Error fetching ${brandName} products:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandProducts(1);
  }, [brandName]);

  // Track impressions
  useEffect(() => {
    if (products.length > 0) {
      products.forEach((product) => {
        api
          .post("/analytics/track-impression", {
            product_id: product._id?.$oid || product._id || product.asin,
            page_url: window.location.href,
          })
          .catch((err) => console.error("Impression error:", err));
      });
    }
  }, [products]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchBrandProducts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToBag = (product) => {
    const userId = localStorage.getItem("user_unique_id");
    if (!userId) {
      return Swal.fire({
        title: 'Please Login',
        text: 'You need to login to add items to your bag.',
        icon: 'info',
        confirmButtonColor: '#000'
      });
    }

    const key = `mybag_${userId}`;
    let bag = JSON.parse(localStorage.getItem(key)) || [];
    if (bag.find(i => i.asin === product.asin)) {
      return Swal.fire({
        title: 'Already in Bag',
        text: 'This item is already available in your cart.',
        icon: 'warning',
        confirmButtonColor: '#000',
        toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000
      });
    }

    bag.push(product);
    localStorage.setItem(key, JSON.stringify(bag));

    Swal.fire({
      icon: 'success', title: 'Added to Bag', text: product.title,
      toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000,
      background: '#fff', color: '#000', iconColor: '#10b981'
    });
  };

  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <NavbarWithSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* 🏷️ Header */}
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-3 block"
          >
            Official Store
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 capitalize tracking-tight mb-4"
          >
            {translatedBrand} Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-lg mx-auto text-lg font-light leading-relaxed"
          >
            {t("discover_deals", { brand: translatedBrand })}
          </motion.p>
        </div>

        {/* 📦 Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} className="aspect-[4/5] bg-gray-200 rounded-xl animate-pulse"></div>)}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
          >
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  layout
                  variants={fadeInUp}
                  key={product._id || product.asin}
                  className="group relative"
                >
                  {/* Image Wrapper */}
                  <div className="relative overflow-hidden bg-white rounded-xl mb-3 aspect-[4/5] p-6 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                    <Link to={`/product/${product.asin}`} className="block w-full h-full">
                      <img
                        src={product.image_url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"; }}
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.discount && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">-{product.discount}%</span>}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={() => addToBag(product)}
                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                        title="Add to Bag"
                      >
                        <FaShoppingCart size={14} />
                      </button>
                      <button
                        className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform hover:text-red-500"
                      >
                        <FaHeart size={14} />
                      </button>
                      <button
                        onClick={() => navigator.share({ title: product.title, url: window.location.href })}
                        className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform hover:text-blue-500"
                      >
                        <FaShareAlt size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <Link to={`/product/${product.asin}`}>
                      <h3 className="text-sm font-medium text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-base font-bold text-gray-900">₹{product.price}</span>
                      {product.oldPrice && <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400 text-[10px]">
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className="text-xs text-gray-400 font-medium">({product.reviews || 0})</span>
                    </div>

                    {/* Delivery Badge */}
                    <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                      <span className="text-green-600 font-bold">FREE Delivery</span>
                      <span>Tomorrow</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-900">No products found for {translatedBrand}.</h3>
            <p className="text-gray-500">Check back later for updates!</p>
          </div>
        )}

        {/* Pagination */}{totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 pb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-sm"
            >
              {t("prev")}
            </button>
            <span className="px-4 py-2 font-medium text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-sm"
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>

      {/* 🦶 Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-auto border-t border-gray-800">
        {/* Gradient Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm mb-1">TrendyMart Private Limited</p>
            <p className="text-sm mb-1">CIN: U62000KA2025PTC000123</p>
            <p className="text-sm mb-1">
              3rd Floor, Trendy Business Park, MGR Statue, Virudhunagar, Tamilnadu, India, 626001
            </p>
            <p className="text-sm mb-1">
              E-mail address: <a href="mailto:query@trendymart.com" className="text-yellow-400 hover:underline">query@trendymart.com</a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Shop</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Trending</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-sky-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-500 transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-700 py-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default BrandProducts;
