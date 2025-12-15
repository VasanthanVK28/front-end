import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaSearch, FaMicrophone, FaImage } from "react-icons/fa";
import { HiOutlineUser, HiOutlineLogout, HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi";
import { FormControl, Select, MenuItem, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const NavbarWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
  const [userName, setUserName] = useState("Guest");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGoogleLens, setShowGoogleLens] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const apiKey = localStorage.getItem("user_api_key");
  const token = localStorage.getItem("token");

  // Chat bot states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to TrendyMart. How can I assist you?" }
  ]);
  const [userInput, setUserInput] = useState("");

  // Voice Search
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

  // Language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    const name = localStorage.getItem("user_name") || "Guest";
    setUserName(name);
  }, []);

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      Swal.fire({ icon: 'error', title: 'Not Supported', text: 'Voice search is not supported in your browser.', confirmButtonColor: '#4f46e5' });
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

  // Chatbot Logic
  const sendMessage = () => {
    if (!userInput.trim()) return;
    const newMessage = { sender: "user", text: userInput };
    const botReply = { sender: "bot", text: "Thanks for reaching out! A support agent will be with you shortly." };
    setMessages([...messages, newMessage, botReply]);
    setUserInput("");
  };

  // Search Logic with Debounce
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
      axios.get(`http://127.0.0.1:8000/api/search/suggestions?q=${searchTerm}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-api-key": apiKey,
        }
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
  }, [searchTerm]);


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
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
              headers: { Authorization: `Bearer ${token}`, "x-api-key": apiKey, Accept: "application/json" }
            });
          } catch (e) { console.error(e); }
        }
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  // Google Lens Image Upload Handler
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

  // Handle image search
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
      // You can integrate with a real image recognition API here
      // For now, redirect to home with a message
      navigate("/home");
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* SPACER FOR FIXED NAVBAR */}
      <div className="w-full h-[88px] md:h-[105px]"></div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-2 border-b border-white/20 support-[backdrop-filter]:bg-white/60"
          : "bg-white py-4 border-b border-gray-100"
          }`}
      >
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* LEFT: Logo + Mobile Toggle */}
            <div className="flex items-center gap-5">
              <button className="lg:hidden text-gray-600 hover:text-indigo-600 transition-colors p-1 rounded-md active:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>

              <Link to="/home" className="flex items-center gap-2.5 group select-none">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                  T
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 group-hover:to-purple-600 transition-all duration-500">
                    Trendy<span className="text-indigo-600">Mart</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl px-8 relative">
              <form
                onSubmit={handleSearch}
                className={`w-full relative flex items-center transition-all duration-300 group ${showSuggestions ? "rounded-t-2xl bg-white shadow-xl ring-2 ring-indigo-50 border-transparent" : "rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 focus-within:bg-white focus-within:shadow-lg"}`}
              >
                <div className="pl-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300">
                  <FaSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder={t("search_placeholder") || "Search for products, brands & categories..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 text-sm text-gray-800 focus:ring-0 placeholder-gray-400 font-medium"
                />
                <div className="pr-2 flex items-center gap-2">
                  <Tooltip title="Google Lens - Search by Image">
                    <button
                      type="button"
                      onClick={() => setShowGoogleLens(!showGoogleLens)}
                      className="p-2.5 rounded-full hover:bg-blue-50 transition-all duration-200 text-gray-400 hover:text-blue-600"
                    >
                      <FaImage size={16} />
                    </button>
                  </Tooltip>
                  <Tooltip title="Voice Search">
                    <button
                      type="button"
                      onClick={startVoiceSearch}
                      className={`p-2.5 rounded-full hover:bg-indigo-50 transition-all duration-200 ${listening ? "text-red-500 animate-pulse bg-red-50" : "text-gray-400 hover:text-indigo-600"}`}
                    >
                      <FaMicrophone size={16} />
                    </button>
                  </Tooltip>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-2 rounded-full text-xs font-bold hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    SEARCH
                  </button>
                </div>
              </form>

              {/* Dropdown Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-8 right-8 bg-white shadow-2xl border-x border-b border-gray-100 rounded-b-2xl overflow-hidden z-20 -mt-[2px]"
                  >
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">Suggested Products</div>
                      {suggestions.map((item) => (
                        <div
                          key={item.asin}
                          onClick={() => {
                            navigate(`/product/${item.asin}`);
                            setShowSuggestions(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-4 p-3 hover:bg-indigo-50/50 cursor-pointer border-b border-gray-50 last:border-none transition-colors group"
                        >
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 p-1 flex items-center justify-center group-hover:border-indigo-200 transition-colors">
                            <img src={item.image_url} alt={item.title} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{item.brand || "Generic"}</span>
                            </div>
                          </div>
                          <div className="text-gray-300 group-hover:text-indigo-400 pr-2">
                            <FaSearch size={14} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Google Lens Modal */}
              <AnimatePresence>
                {showGoogleLens && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-8 right-8 bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden z-20 -mt-[2px]"
                  >
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <FaImage className="text-blue-600" />
                        Google Lens Search
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Upload an image to find similar products</p>
                    </div>

                    <div className="p-6 space-y-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      {!uploadedImage ? (
                        <div
                          onClick={triggerFileInput}
                          className="border-2 border-dashed border-blue-400 rounded-xl p-8 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-all group"
                        >
                          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                            📸
                          </div>
                          <p className="font-semibold text-gray-800 mb-1">Drag and drop an image</p>
                          <p className="text-xs text-gray-500">or click to browse from your device</p>
                          <p className="text-xs text-gray-400 mt-3">Supported formats: JPG, PNG, WebP</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                            <img
                              src={uploadedImage}
                              alt="Uploaded"
                              className="w-full h-48 object-cover"
                            />
                            <button
                              onClick={() => {
                                setUploadedImage(null);
                                setImageName("");
                              }}
                              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                            >
                              <FaTimes size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">📄 {imageName}</p>
                          <button
                            onClick={handleImageSearch}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                          >
                            <FaSearch size={16} />
                            Search Similar Products
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 border-t border-blue-100 text-xs text-gray-600">
                      💡 Tip: Use clear, well-lit photos for better results
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-3 sm:gap-6">

              {/* Language */}
              <div className="hidden sm:block">
                <FormControl size="small" variant="standard" sx={{ m: 1, minWidth: 40 }}>
                  <Select
                    value={i18n.language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    disableUnderline
                    displayEmpty
                    renderValue={(selected) => (
                      <div className="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-lg">
                        {selected === "en" ? "🇺🇸" : selected === "ta" ? "🇮🇳" : "🇮🇳"}
                      </div>
                    )}
                    MenuProps={{
                      PaperProps: {
                        sx: { borderRadius: "16px", marginTop: "10px", boxShadow: "0px 10px 30px rgba(0,0,0,0.12)", border: "1px solid #f3f4f6" }
                      }
                    }}
                  >
                    {[
                      { code: "en", label: "English", emoji: "🇺🇸" },
                      { code: "ta", label: "தமிழ்", emoji: "🇮🇳" },
                      { code: "hi", label: "हिंदी", emoji: "🇮🇳" }
                    ].map((lang) => (
                      <MenuItem key={lang.code} value={lang.code} className="text-sm font-medium hover:bg-indigo-50 text-gray-700">
                        <div className="flex items-center gap-3 py-1">
                          <span className="text-lg">{lang.emoji}</span>
                          {lang.label}
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Icons (Desktop) */}
              <div className="flex items-center gap-2">
                {/* Wishlist Removed */}

                <Tooltip title={t("my_bag") || "My Bag"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/my-bag")}
                    className="relative p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300 hidden md:block"
                  >
                    <HiOutlineShoppingBag size={26} />
                    {/* Bag Badge */}
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                  </motion.button>
                </Tooltip>

                {userName !== "Guest" ? (
                  <>
                    <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200 ml-2 group">
                      <div className="text-right hidden xl:block">
                        <p className="text-xs font-bold text-gray-900 leading-none transition-colors">{userName}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-1 font-medium tracking-wide">MEMBER</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white transition-all">
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
                  <Link to="/login" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 bg-gray-900 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 ml-2">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-11 py-3 rounded-2xl border-none bg-gray-100/80 backdrop-blur-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner placeholder-gray-500"
            />
            <FaSearch className="absolute left-4 text-gray-400" size={16} />
            <button type="button" onClick={startVoiceSearch} className={`absolute right-4 ${listening ? "text-red-500 animate-pulse" : "text-gray-400"}`}>
              <FaMicrophone size={16} />
            </button>
          </form>
        </div>
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
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
                    T
                  </div>
                  <span className="text-xl font-black text-gray-900">Menu</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-500"><FaTimes size={20} /></button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Home", path: "/home", icon: "🏠" },
                    { name: "Shop New Arrivals", path: "/shop", icon: "✨" },
                    { name: "Browse Categories", path: "/categories", icon: "📂" },
                    { name: "My Wishlist", path: "/wishlist", icon: "❤️" },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95"
                    >
                      <span className="text-xl">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button onClick={() => { navigate("/my-bag"); setIsOpen(false); }} className="flex items-center justify-center gap-3 w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-black transition-transform active:scale-95">
                  <HiOutlineShoppingBag size={22} /> View Bag
                </button>
                {userName !== "Guest" ? (
                  <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 text-red-500 font-semibold mt-4 hover:bg-red-50 rounded-xl transition-colors">
                    <HiOutlineLogout size={20} /> Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full py-3 text-indigo-600 font-bold mt-4 hover:bg-indigo-50 rounded-xl transition-colors">
                    Login or Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FLOATING CHATBOT */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-300 z-50 hover:shadow-2xl transition-all"
      >
        {isChatOpen ? <FaTimes size={24} /> : <span className="text-3xl">💬</span>}
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">Trendy Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium text-indigo-100">Always online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-sm transition-colors"><FaTimes /></button>
            </div>

            {/* Chat Messages */}
            <div className="p-5 h-80 overflow-y-auto bg-gray-50/50 flex flex-col gap-4 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${msg.sender === "user"
                    ? "bg-slate-800 text-white self-end rounded-tr-none"
                    : "bg-white border border-gray-100 text-gray-800 self-start rounded-tl-none"
                    }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-gray-100 border-transparent rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!userInput.trim()}
                className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </motion.div>
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
              <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-2xl relative z-10">
                <FaMicrophone size={40} className="animate-bounce" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-3 tracking-tight">Listening...</h2>
            <p className="text-gray-400 font-medium">Try saying "Laptops" or "Nike Shoes"</p>
            <button onClick={() => setListening(false)} className="mt-12 px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors font-bold tracking-wide">CANCEL</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarWithSidebar;
