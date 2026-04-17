import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
  FaTruck,
  FaShieldAlt,
  FaUndo
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TbShoppingBagHeart } from "react-icons/tb";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import NavbarWithSidebar from "./NavbarWithSidebar";
import StarIcon from "@mui/icons-material/Star";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProductDetail = () => {
  const { asin } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/external/products/${asin}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [asin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  // ⭐ Rating display
  const fullStars = Math.floor(product.rating || 0);
  const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // ⭐ Add to My Bag
  const addToBag = (product) => {
    const userId = localStorage.getItem("user_unique_id");

    if (!userId) {
      Swal.fire({
        icon: "info",
        title: "Please Login",
        text: "You must log in to add items to your bag.",
        confirmButtonColor: "#000",
        confirmButtonText: "Okay"
      });
      return;
    }

    const key = `mybag_${userId}`;
    let bag = JSON.parse(localStorage.getItem(key)) || [];

    if (bag.find((item) => item.asin === product.asin)) {
      Swal.fire({
        icon: "warning",
        title: "Already in Bag",
        text: "This item is already available in your cart.",
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    bag.push(product);
    localStorage.setItem(key, JSON.stringify(bag));

    Swal.fire({
      icon: "success",
      title: "Added to Bag",
      text: product.title,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      background: '#fff',
      color: '#000',
      iconColor: '#10b981'
    });
  };

  // ⭐ Share Product
  const shareProduct = async (product) => {
    const shareData = {
      title: product.title,
      text: "Check out this product!",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      Swal.fire({
        icon: "success",
        title: "Link Copied!",
        toast: true,
        position: 'bottom-end',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Placeholder data for premium pads (can be replaced by API fields)
  const padFeatures = {
    benefits: [
      { id: 1, title: "100% Organic Cotton", desc: "Chemical-free top sheet for a rash-free experience.", icon: "🌿" },
      { id: 2, title: "Ultra Breathable", desc: "Advanced airflow technology to keep you fresh.", icon: "💨" },
      { id: 3, title: "Super Absorbent Core", desc: "Locked-in protection for heavy flow days.", icon: "💧" },
      { id: 4, title: "Biodegradable", desc: "Eco-friendly material that's kind to the planet.", icon: "🌎" }
    ],
    sizes: ["Regular", "Large", "Overnight"],
    usage: [
      "Unwrap the pad from its packaging.",
      "Remove the paper backing from the adhesive strip.",
      "Press the adhesive side firmly onto your underwear.",
      "Wrap the wings around the sides for extra security.",
      "Dispose of responsibly in a bin (do not flush)."
    ]
  };

  const [selectedSize, setSelectedSize] = useState("Regular");
  const [activeTab, setActiveTab] = useState("benefits");

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <NavbarWithSidebar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
      >
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-purple-100 border border-gray-100 overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">

            {/* 📸 IMAGE SECTION (Left) */}
            <div className="lg:w-1/2 p-12 bg-[#F9F7FF] flex flex-col items-center">
              <div className="w-full relative mb-8">
                {product.discount && (
                  <span className="absolute top-0 left-0 bg-[#7C3AED] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {product.discount}% OFF
                  </span>
                )}
                <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-purple-50">
                  <Zoom>
                    <img
                      src={product.image_url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                      alt={product.title}
                      className="w-full h-auto max-h-[450px] object-contain transition-transform duration-700"
                    />
                  </Zoom>
                </div>
              </div>
              {/* Product Views Thumbnails */}
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 rounded-2xl bg-white border border-purple-100 p-2 cursor-pointer hover:border-[#7C3AED] transition-all hover:scale-105 shadow-sm">
                    <img src={product.image_url} alt="view" className="w-full h-full object-contain opacity-60 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            {/* 📝 INFO SECTION (Right) */}
            <div className="lg:w-1/2 p-12 flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-50 text-[#7C3AED] text-[10px] font-black uppercase tracking-[0.2em] rounded-md border border-purple-100">
                  {product.brand || "Premium Care"}
                </span>
              </div>

              <h1 className="text-4xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                {product.title}
              </h1>

              {/* Absorbency Level Indicator */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Absorbency:</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2.5 w-8 rounded-full ${level <= 4 ? 'bg-[#7C3AED]' : 'bg-gray-200'}`}
                      title={level <= 4 ? "High Absorbency" : ""}
                    />
                  ))}
                </div>
                <span className="text-xs font-black text-[#7C3AED] uppercase ml-2 select-none">High Flow</span>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-8 border-y border-gray-50 py-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
                  {product.original_price && <span className="text-lg text-gray-400 line-through">₹{product.original_price}</span>}
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => <FaStar key={i} size={14} className={i < Math.floor(product.rating || 4.5) ? "fill-current" : "text-gray-200"} />)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{product.reviews || 0} Reviews</span>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {padFeatures.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${selectedSize === size
                        ? "bg-black border-black text-white shadow-xl scale-105"
                        : "bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => addToBag(product)}
                  className="flex-[2] bg-[#7C3AED] text-white h-16 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-purple-100 hover:bg-[#6D28D9] hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <FaShoppingCart size={18} /> Add to Bag
                </button>
                <button
                  onClick={() => window.open(product.product_url, '_blank')}
                  className="flex-1 bg-black text-white h-16 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-gray-800 transition-all"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => shareProduct(product)}
                  className="w-16 h-16 bg-white border border-gray-100 rounded-[1.25rem] flex items-center justify-center text-gray-400 hover:text-[#7C3AED] hover:border-purple-200 transition-all"
                >
                  <FaShareAlt size={18} />
                </button>
              </div>

              {/* Simple Benefits List */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <MdVerified className="text-green-600" size={20} />
                  <span className="text-[11px] font-bold text-gray-700 uppercase">Dermatologically Tested</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <FaShieldAlt className="text-purple-600" size={18} />
                  <span className="text-[11px] font-bold text-gray-700 uppercase">100% Leak Protection</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 📘 PRODUCT DETAILS TABS */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-8 mb-12">
            {["benefits", "usage"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-black uppercase tracking-[0.3em] pb-2 transition-all relative ${activeTab === tab ? "text-black" : "text-gray-300 hover:text-gray-400"
                  }`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#7C3AED] rounded-full" />}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50 min-h-[300px]">
            {activeTab === "benefits" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {padFeatures.benefits.map((benefit) => (
                  <div key={benefit.id} className="flex gap-5 group">
                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {padFeatures.usage.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-black flex-shrink-0 group-hover:bg-[#7C3AED] transition-colors">
                      {idx + 1}
                    </div>
                    <p className="text-gray-600 font-bold text-base leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 🦶 Consistent Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("contact_us")}</h3>
            <p className="text-sm mb-1">{t("company_name")}</p>
            <p className="text-sm mb-1">{t("company_cin")}</p>
            <p className="text-sm mb-1">{t("company_address")}</p>
            <p className="text-sm mb-1">
              {t("company_email_label")} <a href="mailto:query@trendymart.com" className="text-yellow-400 hover:underline">query@trendymart.com</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("shop_non_stop")}</h3>
            <p className="text-sm text-gray-400 mb-1">{t("trusted_by_indians")}</p>
            <p className="text-sm text-gray-400">{t("delivery_info")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("customer_service")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">{t("help_center")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("returns")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("shipping_info")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("follow_us")}</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-red-500 transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-800 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
