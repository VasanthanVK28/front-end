import React from "react";
import { useLocation } from "react-router-dom";
import NavbarWithSidebar from "../pages/NavbarWithSidebar"; // adjust path if needed
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import StarIcon from "@mui/icons-material/Star";

const PopularProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found 😕</h2>
        <p className="text-gray-500 mt-2">Please go back and select a product again.</p>
      </div>
    );
  }

  // ⭐ Render stars
  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) return <FaStar key={i} className="text-yellow-400" />;
      else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      else return <FaRegStar key={i} className="text-yellow-400" />;
    });
  };

  return (
    <>
      {/* Navbar */}
      <NavbarWithSidebar />

      {/* Product Section */}
      <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-md rounded-2xl mt-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="flex justify-center items-center md:w-1/2 bg-gray-50 rounded-lg p-6">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-gray-600 font-medium">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center">
              {renderStars(product.rating || 4.2)}
             <span className="inline-flex items-center text-sm">
  {/* Rating Badge */}
  <span className="inline-flex items-center bg-lime-300 text-cyan-800 font-semibold px-2 py-1 rounded-md">
    <span className="mr-1">{product.rating.toFixed(1)}</span>
    <StarIcon className="w-4 h-4" />
  </span>
</span>

            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900">₹{product.price}</div>
            {product.discount && (
              <p className="text-green-600 text-sm">{product.discount}% off</p>
            )}
            <p className="text-green-600 text-sm">Free delivery available</p>

            {/* Buy Now Button */}
            <button
              onClick={() => window.open(product.product_url, "_blank")}
              className="inline-block mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
        {/* Gradient Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
  <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
  <p className="text-sm mb-1">TrendyMart Private Limited</p>
  <p className="text-sm mb-1">CIN: U62000KA2025PTC000123</p>
  <p className="text-sm mb-1">
    3rd Floor, Trendy Business Park, MGR Statue,Virudhunagar,Tamilnadu, India, 626001
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
          <p>© {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default PopularProduct;
