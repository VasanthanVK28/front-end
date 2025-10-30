import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import NavbarWithSidebar from "./NavbarWithSidebar";
import { Link } from "react-router-dom";


const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [view, setView] = useState("list");
 const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    const fetchCategoryProducts = async (page = 1) => {
      setLoading(true);
      try {
        const res = await api.get(
          `/external/products/filter?category=${category}&page=${page}`
        );
        const { data, current_page, per_page, total } = res.data;
       


        setProducts(data || []);
        setCurrentPage(current_page || 1);
        setLastPage(Math.ceil(total / per_page));
        setTotalProducts(total || 0);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts(currentPage);
  }, [category, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithSidebar />
      <div className="p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-gradient">
  Result Search: {category.charAt(0).toUpperCase() + category.slice(1)}
</h2>

{/* 🧭 Controls: Sort | View | Top Pagination */}
<div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 mt-4 mb-6">

  {/* 🔢 Total Products */}
  <p className="text-gray-600 text-sm whitespace-nowrap">
    Showing{" "}
    <span className="font-semibold">{products.length}</span>{" "}
    of <span className="font-semibold">{totalProducts}</span> products
  </p>

  {/* 🔽 Sort Dropdown */}
  <div className="flex items-center gap-2 whitespace-nowrap">
    <label className="text-sm font-medium text-gray-700">Sort by:</label>
    <select
      onChange={(e) => setSortOrder(e.target.value)}
      value={sortOrder}
      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="asc">Asc Order</option>
      <option value="desc">Des Order</option>
    </select>
  </div>

  {/* 🗂 View Toggle */}
  <div className="flex items-center gap-2 whitespace-nowrap">
    <button
      onClick={() => setView("grid")}
      className={`p-2 rounded-md border text-sm transition-all duration-200 ${
        view === "grid"
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      Grid View
    </button>
    <button
      onClick={() => setView("list")}
      className={`p-2 rounded-md border text-sm transition-all duration-200 ${
        view === "list"
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      List View
    </button>
  </div>

  {/* 🔝 Pagination */}
  <div className="flex items-center gap-2 whitespace-nowrap">
    {/* Prev */}
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      ← Prev
    </button>

    {currentPage > 3 && (
      <>
        <button
          onClick={() => setCurrentPage(1)}
          className="px-3 py-2 rounded-md text-sm font-semibold bg-white text-gray-700 border hover:bg-indigo-50"
        >
          1
        </button>
        <span className="text-gray-500">...</span>
      </>
    )}

    {Array.from({ length: lastPage }, (_, i) => i + 1)
      .slice(
        Math.max(0, currentPage - 2),
        Math.min(lastPage, currentPage + 1)
      )
      .map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
            page === currentPage
              ? "bg-indigo-600 text-white shadow-md scale-105"
              : "bg-white text-gray-700 border hover:bg-indigo-50"
          }`}
        >
          {page}
        </button>
      ))}

    {currentPage < lastPage - 2 && (
      <>
        <span className="text-gray-500">...</span>
        <button
          onClick={() => setCurrentPage(lastPage)}
          className="px-3 py-2 rounded-md text-sm font-semibold bg-white text-gray-700 border hover:bg-indigo-50"
        >
          {lastPage}
        </button>
      </>
    )}

    {/* Next */}
    <button
      onClick={handleNextPage}
      disabled={currentPage === lastPage}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        currentPage === lastPage
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Next →
    </button>
  </div>
</div>


        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
          <>
            {/* 🛍 Product List (Amazon Style) */}
            <div
  className={
    view === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      : "space-y-6"
  }
>
  {products
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    )
    .map((p) => {
      const fullStars = Math.floor(p.rating);
      const hasHalfStar = p.rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      return (
        <Link
          to={`/product/${p.asin}`}
          key={p.asin}
          className={`block hover:shadow-lg transition-all duration-300 ${
            view === "grid"
              ? "bg-white rounded-xl shadow-sm hover:shadow-md p-4 border border-gray-200"
              : ""
          }`}
        >
          {/* 🖼 Product Card */}
          <div
            className={
              view === "grid"
                ? "flex flex-col items-center text-center"
                : "flex flex-col sm:flex-row bg-white rounded-xl shadow-sm hover:shadow-md p-4 border border-gray-200"
            }
          >
            {/* Left: Product Image */}
            <div
              className={
                view === "grid"
                  ? "w-full flex justify-center items-center mb-4"
                  : "sm:w-1/3 flex justify-center items-center"
              }
            >
              <img
                src={p.image_url}
                alt={p.title}
                className={`object-contain rounded-md ${
                  view === "grid" ? "w-48 h-48" : "w-64 h-64"
                }`}
              />
            </div>

            {/* Right: Product Info */}
            <div
              className={
                view === "grid"
                  ? "flex flex-col items-center"
                  : "sm:w-2/3 mt-4 sm:mt-0 sm:pl-6 flex flex-col justify-between"
              }
            >
              {/* Title */}
              <h3
                className={`font-semibold text-gray-800 hover:text-indigo-600 ${
                  view === "grid" ? "text-base line-clamp-2" : "text-lg line-clamp-2"
                }`}
              >
                {p.title}
              </h3>

              {/* Brand */}
              <p className="text-gray-500 text-sm mt-1">
                {p.brand || "Unknown Brand"}
              </p>

              {/* Rating */}
              <div
                className={`flex items-center mt-2 ${
                  view === "grid" ? "justify-center" : ""
                }`}
              >
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} />
                  ))}
                  {hasHalfStar && <FaStarHalfAlt key="half" />}
                  {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {p.rating.toFixed(1)} ({p.reviews})
                </span>
              </div>

              {/* Price Section */}
              <div className={`mt-3 ${view === "grid" ? "text-center" : ""}`}>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{p.price}
                </p>
                {p.original_price && (
                  <p className="text-sm text-gray-500 line-through">
                    ₹{p.original_price}
                  </p>
                )}
                {p.discount && (
                  <p className="text-green-600 font-medium">{p.discount}% off</p>
                )}
                <a
                  href={p.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Buy Now
                </a>
              </div>

              {/* Delivery Info */}
              {view === "list" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700">
                    FREE delivery{" "}
                    <span className="font-medium text-gray-900">
                      Tomorrow, 31 Oct
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Or fastest delivery Today
                  </p>
                </div>
              )}
            </div>
          </div>
        </Link>
      );
    })}
</div>

            {/* 📄 Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">
              {/* Prev */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                ← Prev
              </button>

              {/* Page Numbers with Ellipsis */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-2 rounded-md text-sm font-semibold bg-white text-gray-700 border hover:bg-indigo-50"
                  >
                    1
                  </button>
                  <span className="text-gray-500">...</span>
                </>
              )}

              {Array.from({ length: lastPage }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 2),
                  Math.min(lastPage, currentPage + 1)
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      page === currentPage
                        ? "bg-indigo-600 text-white shadow-md scale-105"
                        : "bg-white text-gray-700 border hover:bg-indigo-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              {currentPage < lastPage - 2 && (
                <>
                  <span className="text-gray-500">...</span>
                  <button
                    onClick={() => setCurrentPage(lastPage)}
                    className="px-3 py-2 rounded-md text-sm font-semibold bg-white text-gray-700 border hover:bg-indigo-50"
                  >
                    {lastPage}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === lastPage}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === lastPage
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Next →
              </button>
            </div>

          </>
        )}
      </div>

      {/* Animated gradient keyframes */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 4s ease infinite;
          }
        `}
        
      </style>
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
  {/* 🌈 Gradient Top Border */}
  <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

  {/* 🔹 Main Footer Grid */}
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    {/* 🏪 About Section */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
      <p className="text-sm leading-relaxed text-gray-400">
        We bring you the trendiest and most loved products — from stylish shirts to cozy sofas and exciting toys. 
        Quality and style, all in one place!
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

    </div>
    
  );
};

export default CategoryProducts;
