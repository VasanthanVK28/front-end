import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import NavbarWithSidebar from "../pages/NavbarWithSidebar";
import api from "../api/axios";

const BrandProducts = () => {
  const { brandName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

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

  // Fetch products when brandName changes
  useEffect(() => {
    fetchBrandProducts(1);
  }, [brandName]);

  // Track impressions whenever products change
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
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <>
      <NavbarWithSidebar />

      <div className="bg-gray-50 min-h-screen p-4 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {brandName} 
          </h1>
          <p className="text-gray-500 mt-2">
            Discover top deals from <span className="font-semibold">{brandName}</span>
          </p>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product._id || product.asin}
                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-start sm:space-x-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-40 h-40 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 mt-4 sm:mt-0">
                  <a
                    href={product.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-gray-800 hover:text-indigo-600 line-clamp-2"
                    onClick={() => {
                      api
                        .post("/analytics/track-click", {
                          product_id: product._id?.$oid || product._id || product.asin,
                          page_url: window.location.href,
                        })
                        .catch((err) => console.error("Click error:", err));
                    }}
                  >
                    {product.title}
                  </a>

                  <div className="flex items-center space-x-2 mt-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600 font-medium">
                      {product.rating ? product.rating.toFixed(1) : "4.0"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    400+ bought in past month
                  </p>

                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-sm text-green-600 font-semibold">
                        ({product.discount}% off)
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    FREE delivery <span className="font-semibold">Tomorrow</span>
                  </p>

                  <button
                    onClick={() => window.open(product.product_url, "_blank")}
                    className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <FaShoppingCart className="text-lg" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No products found for <strong>{brandName}</strong>.
          </div>
        )}

        {/* Pagination Bottom */}
        <div className="flex justify-center mt-8 space-x-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
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
    </>
  );
};

export default BrandProducts;
