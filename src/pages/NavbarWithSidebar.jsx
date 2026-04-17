import React, { useState, useEffect, useRef } from "react";
import {FaBars,FaTimes,FaSearch,FaMicrophone,FaChevronDown} from "react-icons/fa";
import {HiOutlineLogout,HiOutlineShoppingBag} from "react-icons/hi";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const NavbarWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to TrendyMart. How can I assist you?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGoogleLens, setShowGoogleLens] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const apiKey = localStorage.getItem("user_api_key");
  const token = localStorage.getItem("token");

  const [listening, setListening] = useState(false);
  let recognition;
  let stopTimer = null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    const name = localStorage.getItem("user_name") || "Guest";
    setUserName(name);
  }, [i18n]);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      Swal.fire({
        icon: "error",
        title: "Not Supported",
        text: "Voice search is not supported in your browser.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.start();
    setListening(true);

    stopTimer = setTimeout(() => {
      if (recognition) {
        recognition.stop();
        setListening(false);
      }
    }, 5000);

    recognition.onresult = (event) => {
      clearTimeout(stopTimer);
      let voiceText = event.results[0][0].transcript.replace(/[.,!?]$/, "");
      setSearchTerm(voiceText);
      setListening(false);
      navigate(`/brand/${voiceText.toLowerCase()}`);
    };

    recognition.onerror = () => {
      clearTimeout(stopTimer);
      setListening(false);
    };

    recognition.onend = () => {
      clearTimeout(stopTimer);
      setListening(false);
    };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/brand/${searchTerm.toLowerCase()}`);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`http://127.0.0.1:8000/api/search/suggestions?q=${searchTerm}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": apiKey,
          },
        })
        .then((res) => {
          setSuggestions(res.data);
          setShowSuggestions(true);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
          setShowSuggestions(false);
        });
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, token, apiKey]);

  const handleLogout = async () => {
    Swal.fire({
      title: t("logout_confirm_title") || "Sign Out?",
      text: t("logout_confirm_text") || "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token) {
          try {
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
          } catch (e) {
            console.error(e);
          }
        }
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSearch = () => {
    if (uploadedImage) {
      Swal.fire({
        icon: "info",
        title: "Image Search",
        text: "Searching for similar products...",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowGoogleLens(false);
      setUploadedImage(null);
      setImageName("");
      navigate("/");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out bg-white ${
          isOpen ? "max-lg:hidden" : ""
        } ${
          isScrolled
            ? "shadow-md py-2"
            : "shadow-sm py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">

            {/* LEFT: Logo */}
            <div className="flex items-center gap-5">
              <Link to="/" className="flex items-center gap-2.5 group select-none">
                <div className="flex flex-col">
                  <img
                    src="/images/logo-black.png"
                    alt="Logo"
                    className="h-20 md:h-28 w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* MIDDLE: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center z-40">
              <AnimatePresence mode="wait">
                {!isSearchOpen ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="flex items-center gap-8"
                  >
                    <Link
                      to="/"
                      className="text-gray-900 font-bold text-lg hover:text-[#7C3AED] transition-colors font-[DM Sans]"
                    >
                      Home
                    </Link>

                    <Link
                      to="/about"
                      className="text-gray-900 font-bold text-lg hover:text-[#7C3AED] transition-colors font-[DM Sans]"
                    >
                      About
                    </Link>

                    <div className="relative group">
                      <button className="flex items-center gap-1 text-black font-bold text-lg hover:text-[#7C3AED] transition-colors py-4 font-[DM Sans]">
                        Shop By Category
                        <FaChevronDown
                          size={12}
                          className="group-hover:rotate-180 transition-transform duration-300"
                        />
                      </button>

                      <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-purple-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="py-2 flex flex-col">
                          <Link
                            to="/products/premium-pads"
                            className="px-4 py-2.5 hover:bg-[#F3E8FF] font-bold hover:text-[#7C3AED] text-gray-600 transition-colors text-sm font-[DM Sans]"
                          >
                            Premium Pads
                          </Link>
                          <Link
                            to="/products/bamboo-pads"
                            className="px-4 py-2.5 hover:bg-[#F3E8FF] font-bold hover:text-[#7C3AED] text-gray-600 transition-colors text-sm font-[DM Sans]"
                          >
                            Bamboo Pads
                          </Link>
                          <Link
                            to="/products/all"
                            className="px-4 py-2.5 hover:bg-[#F3E8FF] font-bold hover:text-[#7C3AED] text-gray-600 transition-colors text-sm font-[DM Sans]"
                          >
                            All
                          </Link>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/how-to-use"
                      className="text-gray-900 font-bold text-lg hover:text-[#7C3AED] transition-colors font-[DM Sans]"
                    >
                      How to Use
                    </Link>

                    <Link
                      to="/contact"
                      className="text-gray-900 font-bold text-lg hover:text-[#7C3AED] transition-colors font-[DM Sans]"
                    >
                      Contact Us
                    </Link>

                    {/* Search Icon Button */}
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="text-gray-600 hover:text-[#7C3AED] transition-colors"
                    >
                      <FaSearch size={18} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSearch}
                    className="relative w-full max-w-2xl mx-auto flex items-center"
                  >
                    <input
                      autoFocus
                      type="text"
                      className="w-full pl-10 pr-12 py-3 rounded-full border border-purple-100 bg-[#F3E8FF] focus:bg-white focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all outline-none text-black placeholder-purple-300"
                      placeholder="Search for products, categories, or brands..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <FaSearch className="absolute left-4 text-gray-400" size={16} />

                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3 p-1.5 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                    >
                      <FaTimes size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={startVoiceSearch}
                      className={`absolute right-10 p-1.5 hover:bg-gray-200 rounded-full transition-colors ${
                        listening ? "text-red-500 animate-pulse" : "text-gray-400"
                      }`}
                    >
                      <FaMicrophone size={16} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Mobile Hamburger Menu */}
              <button
                className="lg:hidden text-gray-600 hover:text-[#7C3AED] transition-colors p-1 rounded-md active:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>

              <div className="hidden lg:flex items-center gap-3">
                {userName !== "Guest" ? (
                  <>
                    <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200 ml-2 group">
                      <div className="text-right hidden xl:block">
                        <p className="text-xs font-bold text-gray-900 leading-none transition-colors">
                          {userName}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-none mt-1 font-medium tracking-wide">
                          MEMBER
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white transition-all">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    <Tooltip title="Logout">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 hidden md:block ml-1"
                      >
                        <HiOutlineLogout size={24} />
                      </motion.button>
                    </Tooltip>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="hidden md:inline-flex relative items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ml-2 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800"
                  >
                    <span className="relative z-10">Sign In</span>
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100" />
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gray-900/60 z-40 lg:hidden backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-full bg-white z-[110] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo-black.png"
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-500"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-black font-semibold hover:bg-[#F3E8FF] hover:text-[#7C3AED] transition-all active:scale-95"
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-black font-semibold hover:bg-[#F3E8FF] hover:text-[#7C3AED] transition-all active:scale-95"
                  >
                    About
                  </Link>

                  <div className="px-4 py-3.5 rounded-xl text-black font-semibold bg-[#FAF5FF]">
                    <button
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center gap-4 w-full justify-between"
                    >
                      <span>Shop By Category</span>
                      <FaChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isCategoryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 ml-9 flex flex-col gap-2 overflow-hidden"
                        >
                          <Link
                            to="/products/premium-pads"
                            onClick={() => { setIsOpen(false); setIsCategoryOpen(false); }}
                            className="text-sm font-medium text-gray-700 hover:text-[#7C3AED] transition-colors"
                          >
                            Premium Pads
                          </Link>

                          <Link
                            to="/products/bamboo-pads"
                            onClick={() => { setIsOpen(false); setIsCategoryOpen(false); }}
                            className="text-sm font-medium text-gray-700 hover:text-[#7C3AED] transition-colors"
                          >
                            Bamboo Pads
                          </Link>

                          <Link
                            to="/products/all"
                            onClick={() => { setIsOpen(false); setIsCategoryOpen(false); }}
                            className="text-sm font-medium text-gray-700 hover:text-[#7C3AED] transition-colors"
                          >
                            All
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/how-to-use"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-black font-semibold hover:bg-[#F3E8FF] hover:text-[#7C3AED] transition-all active:scale-95"
                  >
                    How to Use
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-black font-semibold hover:bg-[#F3E8FF] hover:text-[#7C3AED] transition-all active:scale-95"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => { navigate("/my-bag"); setIsOpen(false); }}
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-black transition-transform active:scale-95"
                >
                  <HiOutlineShoppingBag size={22} /> View Bag
                </button>

                {userName !== "Guest" ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-3 text-red-500 font-semibold mt-4 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <HiOutlineLogout size={20} /> Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full py-3 text-[#7C3AED] font-bold mt-4 hover:bg-[#F3E8FF] rounded-xl transition-colors"
                  >
                    Login or Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LISTENING OVERLAY */}
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/90 backdrop-blur-lg z-[100] flex flex-col items-center justify-center text-white"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#7C3AED] rounded-full animate-ping opacity-20"></div>
              <div className="w-24 h-24 bg-[#7C3AED] rounded-full flex items-center justify-center mb-8 shadow-2xl relative z-10">
                <FaMicrophone size={40} className="animate-bounce" />
              </div>
            </div>

            <h2 className="text-3xl font-black mb-3 tracking-tight">
              Listening...
            </h2>
            <p className="text-gray-400 font-medium">
              Try saying "Napkin Pads" or "Bamboo Pads"
            </p>

            <button
              onClick={() => setListening(false)}
              className="mt-12 px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors font-bold tracking-wide"
            >
              CANCEL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarWithSidebar;