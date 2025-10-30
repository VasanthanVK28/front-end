import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";

const NavbarWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search input
  const navigate = useNavigate(); // ✅ Router navigation

  useEffect(() => {
    const name = localStorage.getItem("user_name") || "Guest";
    setUserName(name);
  }, []);

  // 🧭 Handle Search Submit go to brand page..............
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/brand/${searchTerm.toLowerCase()}`); // ✅ Go to brand page
      setSearchTerm(""); // Clear input after navigation
    }
  };

  return (
    <>
      {/* 🌐 Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 space-x-6">
            
            {/* 🍔 Left - Hamburger + Brand */}
            <div className="flex items-center space-x-4">
              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <FaBars />
              </button>

              {/* Brand Name */}
              <div
                onClick={() => navigate("/")}
                className="text-2xl font-extrabold tracking-wide cursor-pointer text-indigo-600 hover:text-pink-500 transition-colors duration-300"
              >
                Trendy<span className="text-yellow-500">Mart</span>
              </div>
            </div>

            {/* 🔍 Center - Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-lg relative flex items-center"
            >
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-gray-700"
              />
              {/* 🔎 Search Icon Button */}
              <button
                type="submit"
                className="absolute right-3 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <FaSearch />
              </button>
              <FaSearch className="absolute left-3 text-gray-500" />
            </form>

            {/* 👤 Right - User Info */}
            <div className="flex items-center space-x-2 text-gray-700">
              <FaUserCircle className="text-2xl text-indigo-600" />
              <span className="font-medium">{userName}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 🧱 Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 🧩 Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Filter Options</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl text-gray-700 hover:text-black"
          >
            <FaTimes />
          </button>
        </div>

        {/* 🧠 Sidebar Content */}
        <div className="p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Category</h3>
            <ul className="space-y-1 text-gray-700">
              <li><input type="checkbox" /> Laptops</li>
              <li><input type="checkbox" /> Mobiles</li>
              <li><input type="checkbox" /> Shirts</li>
            </ul>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default NavbarWithSidebar;
