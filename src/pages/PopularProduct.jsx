import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarWithSidebar from "./NavbarWithSidebar";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaShareAlt
} from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PopularProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-6xl mb-4">🛍️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">It seems you haven't selected a product yet.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const addToBag = () => {
    const userId = localStorage.getItem("user_unique_id");
    if (!userId) {
      return Swal.fire({
        title: 'Please Login',
        text: 'You need to login to add items to your bag.',
        icon: 'info',
        confirmButtonColor: '#000',
        confirmButtonText: 'Okay'
      });
    }

    const key = `mybag_${userId}`;
    let bag = JSON.parse(localStorage.getItem(key)) || [];

    // Check if already exists (optional: update qty instead)
    if (bag.find(i => (i.asin === product.asin) || (i.id === product.id))) {
      return Swal.fire({
        title: 'Already in Bag',
        text: 'This item is already in your cart.',
        icon: 'warning',
        confirmButtonColor: '#000',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
    }

    bag.push({ ...product, qty });
    localStorage.setItem(key, JSON.stringify(bag));

    Swal.fire({
      icon: 'success',
      title: 'Added to Bag',
      text: `${qty} x ${product.title}`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      background: '#fff',
      color: '#000',
      iconColor: '#10b981'
    });
  };

  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) return <FaStar key={i} className="text-yellow-400" />;
      else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      else return <FaRegStar key={i} className="text-gray-300" />;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <NavbarWithSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">

            {/* 📸 IMAGE SECTION */}
            <div className="md:w-1/2 p-6 md:p-12 bg-gray-100/50 flex items-center justify-center relative">
              <div className="absolute top-6 left-6 z-10">
                {product.discount && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">-{product.discount}% Sale</span>}
              </div>
              <Zoom>
                <img
                  src={product.image || product.image_url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                  alt={product.title}
                  className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"; }}
                />
              </Zoom>
            </div>

            {/* 📝 DETAILS SECTION */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

              <div className="mb-2">
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{product.brand || "Brand"}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{product.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-lg">
                  <span className="font-bold text-gray-900">{product.rating?.toFixed(1) || "4.5"}</span>
                  <div className="flex text-yellow-400 text-xs">
                    {renderStars(product.rating || 4.5)}
                  </div>
                </div>
                <span className="text-sm text-gray-400 font-medium">{product.reviews || 120} Reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
                {product.original_price && <span className="text-xl text-gray-400 line-through font-medium">₹{product.original_price}</span>}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                Experience premium quality with this authentic product from {product.brand || "our collection"}.
                Designed for modern lifestyles, it combines durability with style.
                Order now and enjoy fast shipping!
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={addToBag}
                  className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all"
                >
                  <FaShoppingCart /> Add to Bag
                </button>
                <button
                  onClick={() => window.open(product.product_url, '_blank')}
                  className="flex-1 border-2 border-black text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all"
                >
                  Buy Now
                </button>
                <button className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                  <FaHeart size={20} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FaTruck className="text-indigo-500 text-xl" />
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase">Free Delivery</p>
                    <p className="text-[10px] text-gray-500">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FaShieldAlt className="text-green-500 text-xl" />
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase">1 Year Warranty</p>
                    <p className="text-[10px] text-gray-500">Brand authorized</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FaUndo className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase">Easy Returns</p>
                    <p className="text-[10px] text-gray-500">7 Days replacement</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FaShareAlt className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase">Share</p>
                    <p className="text-[10px] text-gray-500">Spread the word</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default PopularProduct;
