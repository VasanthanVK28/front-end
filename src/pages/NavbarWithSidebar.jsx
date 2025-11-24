import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { TbShoppingBagHeart } from "react-icons/tb";

const NavbarWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
  const [userName, setUserName] = useState("Guest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const apiKey = localStorage.getItem("user_api_key");
  const token = localStorage.getItem("token");

  // Language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, []);

  // User
  useEffect(() => {
    const name = localStorage.getItem("user_name") || "Guest";
    setUserName(name);
  }, []);

  // Fetch brands (optional)
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setBrands([]);
      return;
    }

    const fetchBrands = async () => {
      try {
        const categoryParam = selectedCategories.join(",");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/external/products/brands?category=${categoryParam}`,
          {
            headers: {
              "x-api-key": apiKey,
              Accept: "application/json",
            },
          }
        );
        setBrands(res.data.brands || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };

    fetchBrands();
  }, [selectedCategories]);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/brand/${searchTerm.toLowerCase()}`);
      setSearchTerm("");
    }
  };

  // Logout
  const handleLogout = async () => {
    Swal.fire({
      title: t("logout_confirm_title") || "Are you sure?",
      text: t("logout_confirm_text") || "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("logout_confirm_yes") || "Yes",
      cancelButtonText: t("logout_confirm_no") || "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (token) {
            await axios.post(
              "http://127.0.0.1:8000/api/logout",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "x-api-key": apiKey,
                  Accept: "application/json",
                },
              }
            );
          }
          localStorage.clear();

          await Swal.fire({
            icon: "success",
            title: "Logged out successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            icon: "error",
            title: "Logout failed",
            text: "Something went wrong. Redirecting...",
            timer: 2000,
            showConfirmButton: false,
          });
          localStorage.clear();
          navigate("/");
        }
      }
    });
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LEFT: Logo + Hamburger */}
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-2xl text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>

              <div
                onClick={() => navigate("/home")}
                className="text-2xl font-extrabold cursor-pointer text-indigo-600 hover:text-pink-500 transition duration-300"
              >
                Trendy<span className="text-yellow-500">Mart</span>
              </div>
            </div>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-lg relative items-center"
            >
              <input
                type="text"
                placeholder={t("search_placeholder") || "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <FaSearch className="absolute left-3 text-gray-500" />
              <button type="submit" className="absolute right-3 text-gray-600 hover:text-indigo-600">
                <FaSearch />
              </button>
            </form>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">
              {/* Language */}
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                className="hidden sm:block border px-2 py-1 rounded-lg text-sm"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
                <option value="ml">മലയാളം</option>
              </select>

              {/* My Bag */}
              <button
                onClick={() => navigate("/my-bag")}
                className="hidden md:flex items-center space-x-1 text-indigo-600 border border-indigo-300 px-3 py-1 rounded-full hover:text-indigo-700"
              >
                <TbShoppingBagHeart className="text-xl" />
                <span>{t("my_bag") || "My Bag"}</span>
              </button>

              {/* User */}
              <div className="hidden sm:flex items-center space-x-2">
                <FaUserCircle className="text-2xl text-indigo-600" />
                <span>{userName === "Guest" ? t("guest") || "Guest" : userName}</span>
              </div>

              {/* Logout */}
              {userName !== "Guest" && (
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <FaSignOutAlt />
                  <span>{t("logout") || "Logout"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH & MENU */}
        {isOpen && (
          <div className="lg:hidden px-4 pt-4 pb-6 space-y-4 bg-white shadow-md">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex relative items-center">
              <input
                type="text"
                placeholder={t("search_placeholder") || "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <FaSearch className="absolute left-3 text-gray-500" />
              <button type="submit" className="absolute right-3 text-gray-600 hover:text-indigo-600">
                <FaSearch />
              </button>
            </form>

            {/* Mobile menu buttons */}
            <div className="flex flex-col space-y-3 mt-4">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                className="border px-2 py-1 rounded-lg text-sm w-full"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
                <option value="ml">മലയാളം</option>
              </select>

              <button
                onClick={() => navigate("/my-bag")}
                className="flex items-center space-x-2 text-indigo-600 border border-indigo-300 px-3 py-2 rounded-full hover:text-indigo-700 w-full justify-center"
              >
                <TbShoppingBagHeart className="text-xl" />
                <span>{t("my_bag") || "My Bag"}</span>
              </button>

              {userName !== "Guest" && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 border border-red-300 px-3 py-2 rounded-full hover:text-red-700 w-full justify-center"
                >
                  <FaSignOutAlt />
                  <span>{t("logout") || "Logout"}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavbarWithSidebar;
