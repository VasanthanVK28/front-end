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
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories] = useState(["laptops", "mobiles", "shirts"]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // ✅ Get user name and api key from localStorage
  const apiKey = localStorage.getItem("user_api_key");
  const token = localStorage.getItem("token");
const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, []);
  useEffect(() => {
    const name = localStorage.getItem("user_name") || "Guest";
    setUserName(name);
  }, []);

  // ✅ Fetch brands whenever selectedCategories changes
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

  // ✅ Handle Search (go to brand page)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/brand/${searchTerm.toLowerCase()}`);
      setSearchTerm("");
    }
  };

  // ✅ Handle category selection
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // ✅ Handle brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // ✅ Apply Filter (navigate to CategoryProducts page)
  const applyFilter = () => {
    const categoryParam = selectedCategories.join(",");
    const brandParam = selectedBrands.join(",");
    navigate(`/category-products?category=${categoryParam}&brand=${brandParam}`);
    setIsOpen(false);
  };

  // 🚪 Logout Function
  const handleLogout = async () => {
    Swal.fire({
      title: t("logout_confirm_title"),
      text: t("logout_confirm_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("logout_confirm_yes"),
      cancelButtonText: t("logout_confirm_no"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 🔐 Call backend logout if token exists
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

          // 🧹 Clear localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user_api_key");
          localStorage.removeItem("user_name");

          // ✅ Show success alert
          await Swal.fire({
            icon: "success",
            title: "Logged out successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // 🔁 Redirect to landing page
          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);

          // 🚨 Show error alert
          Swal.fire({
            icon: "error",
            title: "Logout failed",
            text: "Something went wrong. Redirecting...",
            timer: 2000,
            showConfirmButton: false,
          });

          // Still clear session & redirect
          localStorage.clear();
          navigate("/");
        }
      }
    });
  };

  return (
    <>
      {/* 🌐 Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 space-x-6">
            {/* 🍔 Left - Hamburger + Brand */}
            <div className="flex items-center space-x-4">
              <div
                onClick={() => navigate("/home")}
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
                placeholder={t("search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-gray-700"
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <FaSearch />
              </button>
              <FaSearch className="absolute left-3 text-gray-500" />
            </form>
            <select
  onChange={(e) => changeLanguage(e.target.value)}
  defaultValue={i18n.language}
  className="border border-gray-300 px-2 py-1 rounded-lg text-sm font-medium"
>
  <option value="en">English</option>
  <option value="ta">தமிழ்</option>
  <option value="hi">हिंदी</option>
  <option value="te">తెలుగు</option>
  <option value="ml">മലയാളം</option>
</select>

            {/* 👤 Right - MyBag + User Info + Logout */}
            <div className="flex items-center space-x-6 text-gray-700">
              {/* 👜 MyBag Button */}
              
                      <button
        onClick={() => navigate("/my-bag")}
        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 font-semibold 
                  border border-indigo-300 px-3 py-1 rounded-full transition-all"
      >
        <TbShoppingBagHeart className="text-2xl" />
        <span>{t("my_bag")}</span>

      </button>




              {/* 👤 User Info */}
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-2xl text-indigo-600" />
                <span>{userName === "Guest" ? t("guest") : userName}</span>


              </div>

              {/* 🚪 Logout */}
              {userName !== "Guest" && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium"
                >
                  <FaSignOutAlt />
                 <span>{t("logout")}</span>

                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarWithSidebar;
