import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import NavbarWithSidebar from "./NavbarWithSidebar"; // ✅ Import your navbar

const ProductDetail = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return (
      <div>
        <NavbarWithSidebar />
        <div className="flex flex-col justify-center items-center h-96 mt-20">
          {/* ✅ Spinner */}
          <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div>
        <NavbarWithSidebar />
        <p className="text-center mt-20 text-lg text-gray-600">
          Product not found
        </p>
      </div>
    );

  // ⭐ Rating display
  const fullStars = Math.floor(product.rating || 0);
  const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {/* 🧭 Navbar on top */}
      <NavbarWithSidebar />

      {/* 🏷 Product Details */}
      <div className="max-w-6xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT: Product Image */}
          <div className="md:w-1/2 flex flex-col items-center">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-96 h-96 object-contain mb-4 rounded-lg shadow-sm"
            />
          </div>

          {/* RIGHT: Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800 leading-snug mb-2">
              {product.title}
            </h1>
            <p className="text-indigo-600 text-sm mb-2">
              {product.brand || "Brand"}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(fullStars)].map((_, i) => (
                  <FaStar key={`full-${i}`} />
                ))}
                {hasHalfStar && <FaStarHalfAlt />}
                {[...Array(emptyStars)].map((_, i) => (
                  <FaRegStar key={`empty-${i}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating?.toFixed(1)} ({product.reviews || 0} ratings)
              </span>
            </div>

            {/* Price */}
            <div className="my-4">
              {product.discount && (
                <p className="text-red-600 text-xl font-semibold mb-1">
                  -{product.discount}%{" "}
                  <span className="text-gray-800">₹{product.price}</span>
                </p>
              )}
              {product.original_price && (
                <p className="text-sm text-gray-500 line-through">
                  M.R.P: ₹{product.original_price}
                </p>
              )}
            </div>

            {/* Delivery */}
            <div className="text-sm text-gray-700 mb-5">
              <p>
                FREE delivery{" "}
                <span className="font-semibold text-gray-900">
                  Tomorrow, 31 Oct
                </span>
              </p>
              <p>Or fastest delivery Today</p>
            </div>

            {/* Buy Button */}
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* 🦶 Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
        {/* 🌈 Gradient Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

        {/* 🔹 Main Footer Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* 🏪 About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              We bring you the trendiest and most loved products — from stylish shirts to cozy sofas and exciting toys. Quality and style, all in one place!
            </p>
          </div>

          {/* 🔗 Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Shop</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Trending</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* 🤝 Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 📱 Social Links */}
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

        {/* ⚫ Bottom Bar */}
        <div className="w-full border-t border-gray-700 py-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default ProductDetail;
