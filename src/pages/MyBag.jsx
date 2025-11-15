import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaExternalLinkAlt,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa";

import NavbarWithSidebar from "./NavbarWithSidebar";

const MyBag = () => {
  const [bagItems, setBagItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_unique_id");

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please login to access your bag.",
      });
      return;
    }

    const key = `mybag_${userId}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setBagItems(data);
  }, []);

  // ⭐ REMOVE ITEM
  const removeItem = (index) => {
    Swal.fire({
      title: "Remove Item?",
      text: "Do you want to remove this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem("user_unique_id");
        const key = `mybag_${userId}`;

        const updated = [...bagItems];
        updated.splice(index, 1);

        setBagItems(updated);
        localStorage.setItem(key, JSON.stringify(updated));

        Swal.fire("Removed!", "Product removed successfully.", "success");
      }
    });
  };

  // ⭐ CLEAR ALL
  const clearBag = () => {
    Swal.fire({
      title: "Clear All?",
      text: "This will remove all products!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Clear All",
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem("user_unique_id");
        const key = `mybag_${userId}`;

        localStorage.removeItem(key);
        setBagItems([]);

        Swal.fire("Cleared!", "Your bag is now empty.", "success");
      }
    });
  };

  // ⭐ AMAZON STYLE RATING STARS
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < full; i++) stars.push(<FaStar className="text-yellow-500" />);
    if (half) stars.push(<FaStarHalfAlt className="text-yellow-500" />);
    while (stars.length < 5) stars.push(<FaRegStar className="text-yellow-500" />);

    return stars;
  };

  return (
    <>
      <NavbarWithSidebar />

      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8">
          My Bag
        </h1>

        {bagItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your bag is empty.</p>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={clearBag}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition"
              >
                Clear All
              </button>
            </div>

            {/* ⭐ PRODUCT LIST */}
            <div className="space-y-6">
              {bagItems.map((p, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col md:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 flex items-center justify-center bg-gray-100 rounded-xl p-2">
                    <img
                      src={
                        p.image_url ||
                        p.thumbnail_image ||
                        p.images?.[0] ||
                        p.image ||
                        "/placeholder.jpg"
                      }
                      alt={p.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {p.title}
                    </h2>

                    {p.rating && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex">{renderStars(p.rating)}</div>
                        <span className="text-gray-600 text-sm">{p.rating}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-3">
                      <p className="text-3xl font-bold text-indigo-600">
                        ₹{p.price}
                      </p>

                      {p.original_price && (
                        <p className="text-sm text-gray-500">
                          MRP: <span className="line-through">₹{p.original_price}</span>
                        </p>
                      )}

                      {p.discount && (
                        <p className="text-sm text-green-600 font-medium">
                          {p.discount}% off
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-5">
                      <a
                        href={p.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow flex items-center gap-2 transition"
                      >
                        View <FaExternalLinkAlt />
                      </a>

                      <button
                        onClick={() => removeItem(index)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow flex items-center gap-2 transition"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ⭐ FOOTER ADDED BELOW */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm text-gray-400">
              We bring you the trendiest and most loved products — stylish shirts,
              cozy sofas, toys, and more. Quality and style in one place!
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400">Shop</a></li>
              <li><a href="#" className="hover:text-yellow-400">Trending</a></li>
              <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400">Returns</a></li>
              <li><a href="#" className="hover:text-yellow-400">Shipping Info</a></li>
              <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-sky-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-500"><i className="fab fa-youtube"></i></a>
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

export default MyBag;
