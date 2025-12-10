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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <NavbarWithSidebar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
      >
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* 📸 IMAGE LEFT */}
            <div className="md:w-1/2 p-8 md:p-12 bg-gray-100/50 flex items-center justify-center relative">
              <div className="absolute top-6 left-6 z-10">
                {product.discount && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">-{product.discount}% Sale</span>}
              </div>
              <Zoom>
                <img
                  src={product.image_url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                  alt={product.title}
                  className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"; }}
                />
              </Zoom>
            </div>

            {/* 📝 INFO RIGHT */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

              <div className="mb-2">
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{product.brand || t("Unknown")}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{product.title}</h1>

              {/* Ratings */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-lg">
                  <span className="font-bold text-gray-900">{product.rating?.toFixed(1) || "4.5"}</span>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
                    {hasHalfStar && <FaStarHalfAlt />}
                    {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
                  </div>
                </div>
                <span className="text-sm text-gray-400 font-medium">({product.reviews || 0} Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
                {product.original_price && <span className="text-xl text-gray-400 line-through font-medium">₹{product.original_price}</span>}
              </div>

              {/* Delivery Info */}
              <div className="text-sm text-gray-600 mb-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="flex items-center gap-2 mb-1">
                  <FaTruck className="text-blue-500" />
                  <span>Free Delivery by <span className="font-bold text-gray-900">Tomorrow, 9 PM</span></span>
                </p>
                {product.discount && <p className="text-xs text-blue-500 font-medium">Order within 4 hrs 30 mins</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => window.open(product.product_url, '_blank')}
                  className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all"
                >
                  {t("buy_now")}
                </button>

                <button
                  onClick={() => addToBag(product)}
                  className="flex-1 bg-white border-2 border-black text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                >
                  <FaShoppingCart /> {t("my_bag")}
                </button>

                <button
                  onClick={() => shareProduct(product)}
                  className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all"
                >
                  <FaShareAlt size={20} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><FaShieldAlt /></div>
                  <span className="text-[10px] font-bold uppercase text-gray-500">1 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600"><FaUndo /></div>
                  <span className="text-[10px] font-bold uppercase text-gray-500">7 Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><FaTruck /></div>
                  <span className="text-[10px] font-bold uppercase text-gray-500">Fast Delivery</span>
                </div>
              </div>

            </div>
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
