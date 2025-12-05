import React, { useState, useEffect } from "react";
import {FaBars,FaTimes,FaSearch,FaUserCircle,FaSignOutAlt,} from "react-icons/fa";
import { FormControl, InputLabel, Select, MenuItem ,Menu,IconButton} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

//Chat bot 
const [isChatOpen, setIsChatOpen] = useState(false);
const [messages, setMessages] = useState([
  { sender: "bot", text: "Hello! How can I help you today?" }
]);
const [userInput, setUserInput] = useState("");

const sendMessage = () => {
  if (!userInput.trim()) return;

  const newMessage = { sender: "user", text: userInput };
  const botReply = {
    sender: "bot",
    text: "Thank you! Our support team will respond shortly."
  };

  setMessages([...messages, newMessage, botReply]);
  setUserInput("");
};


  // Voice Search
const [listening, setListening] = useState(false);
let recognition;
let stopTimer = null;

const startVoiceSearch = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support Voice Search");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.start();
  setListening(true);

  // AUTO STOP after 5 seconds
  stopTimer = setTimeout(() => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  }, 5000);

  recognition.onresult = (event) => {
    clearTimeout(stopTimer);

    let voiceText = event.results[0][0].transcript;

    // Remove last punctuation
    voiceText = voiceText.replace(/[.,!?]$/, "");

    setSearchTerm(voiceText);
    setListening(false);

    // AUTO NAVIGATE
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
  useEffect(() => {
  if (searchTerm.trim().length === 0) {
    setSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  const delay = setTimeout(() => {
    const token = localStorage.getItem("token"); // get the token

    axios.get(
      `http://127.0.0.1:8000/api/search/suggestions?q=${searchTerm}`,
      {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`, // 🔥 add this
          "x-api-key": apiKey,               // keep if required by your backend
        }
      }
    )
    .then((res) => {
      setSuggestions(res.data);
      setShowSuggestions(true);
    })
    .catch((err) => {
      console.log("Error fetching suggestions:", err);
      setSuggestions([]);
      setShowSuggestions(false);
    });
  }, 300);

  return () => clearTimeout(delay);
}, [searchTerm]);


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
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          onClick={() => navigate("/home")}
          className="text-2xl font-extrabold cursor-pointer text-indigo-600 hover:text-pink-500 transition duration-300">
          Trendy<span className="text-yellow-500">Mart</span>
        </div>
      </div>

      {/* SEARCH BAR (Desktop Only) */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex flex-1 max-w-lg relative items-center">
        <input type="text" placeholder={t("search_placeholder") || "Search..."} value={searchTerm} onChange={(e) => {
  setSearchTerm(e.target.value);
  setShowSuggestions(true);
}}
 className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"/>
        <FaSearch className="absolute left-3 text-gray-500" />
        {showSuggestions && suggestions.length > 0 && (
  <ul className="absolute top-12 w-full bg-white shadow-lg border rounded-lg max-h-64 overflow-y-auto z-50">
    {suggestions.map((item) => (
      <li
        key={item.asin}
        onClick={() => {
          navigate(`/product/${item.asin}`);
          setShowSuggestions(false);
          setSearchTerm("");
        }}
        className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
      >
        <img
          src={item.image_url}
          alt={item.title}
          className="w-10 h-10 object-contain"
        />
        <div className="flex flex-col">
          <span className="font-medium">{item.title}</span>
          <span className="text-sm text-gray-500">{item.brand}</span>
        </div>
      </li>
    ))}
  </ul>
)}

        {/* Mic Icon */}
              <button type="button" onClick={startVoiceSearch} className="absolute right-10 text-xl">
                {listening ? (
                  <FontAwesomeIcon icon={faMicrophone} className="animate-pulse text-black" />
                ) : (
                  <FontAwesomeIcon icon={faMicrophone} className="text-black" />
                )}
              </button>

        <button type="submit" className="absolute right-3 text-gray-600 hover:text-indigo-600">
          <FaSearch />
        </button>
      </form>
  {listening && (
  <div className="fixed inset-0 flex justify-center items-center z-[9999] pointer-events-none">
    <div className="bg-white/20 border border-gray-200 shadow-2xl rounded-2xl px-10 py-8 w-96 text-center animate-fade backdrop-blur-sm">
      
      {/* Animated Face */}
      <div className="w-20 h-20 mx-auto mb-3">
        <img src="https://i.gifer.com/ZhKG.gif"  alt="Listening" className="w-full h-full object-contain rounded-full"/>
      </div>

      {/* Mic */}
      <FontAwesomeIcon
        icon={faMicrophone}
        className="text-black-500 text-3xl mb-2 animate-pulse"/>

      <h3 className="text-lg font-semibold">Listening...</h3>
      <p className="text-sm text-black-700 mt-1">Say something</p>
    </div>
  </div>
)}

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Language Dropdown */}
        <FormControl
  size="small" className="hidden sm:block" sx={{ minWidth: 150 }}>
  <InputLabel id="language-select-label">Language</InputLabel>

  <Select
    labelId="language-select-label"
    label="Language"
    value={i18n.language}
    onChange={(e) => changeLanguage(e.target.value)}
    sx={{
      borderRadius: "8px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
    }} >

    {/* English - UK Flag */}
    <MenuItem value="en">
      <div className="flex items-center space-x-2">
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "20px", height: "20px" }}
        />
        <span>English</span>
      </div>
    </MenuItem>

    {/* Tamil - India Flag */}
    <MenuItem value="ta">
      <div className="flex items-center space-x-2">
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "20px", height: "20px" }}
        />
        <span>தமிழ்</span>
      </div>
    </MenuItem>

    {/* Hindi */}
    <MenuItem value="hi">
      <div className="flex items-center space-x-2">
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "20px", height: "20px" }}
        />
        <span>हिंदी</span>
      </div>
    </MenuItem>

    {/* Telugu */}
    <MenuItem value="te">
      <div className="flex items-center space-x-2">
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "20px", height: "20px" }}
        />
        <span>తెలుగు</span>
      </div>
    </MenuItem>

    {/* Malayalam */}
    <MenuItem value="ml">
      <div className="flex items-center space-x-2">
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "20px", height: "20px" }}
        />
        <span>മലയാളം</span>
      </div>
    </MenuItem>
  </Select>
</FormControl>

        {/* My Bag */}
        <button onClick={() => navigate("/my-bag")} className="hidden md:flex items-center gap-1 text-indigo-600 border border-indigo-300 px-3 py-1 rounded-full hover:text-indigo-700">
          <TbShoppingBagHeart className="text-xl" />
          <span>{t("my_bag") || "My Bag"}</span>
        </button>

        {/* User */}
        <div className="hidden sm:flex items-center gap-2">
          <FaUserCircle className="text-2xl text-indigo-600" />
          <span>
            {userName === "Guest" ? t("guest") || "Guest" : userName}
          </span>
        </div>

        {/* Logout */}
        {userName !== "Guest" && (
          <button onClick={handleLogout} className="hidden sm:flex items-center gap-1 text-red-600 hover:text-red-700">
            <FaSignOutAlt />
            <span>{t("logout") || "Logout"}</span>
          </button>
        )}
        
      </div>
    </div>
  </div>

  {/* MOBILE MENU */}
  {isOpen && (
    <div className="lg:hidden px-4 pt-4 pb-6 space-y-4 bg-white shadow-md">

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input type="text" placeholder={t("search_placeholder") || "Search..."} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"/>
        <FaSearch className="absolute left-3 text-gray-500" />

         {/* Mic Button Mobile */}
              <button type="button" onClick={startVoiceSearch} className="absolute right-10 text-red-500 text-xl">
                        {listening ? (
                        <FontAwesomeIcon
                          icon={faMicrophone}
                          className="animate-pulse text-black"/>
                      ) : (
                        <FontAwesomeIcon icon={faMicrophone} className="text-black"/>
                      )}
                    </button>

        <button
          type="submit"
          className="absolute right-3 text-gray-600 hover:text-indigo-600">
          <FaSearch />
        </button>
      </form>

      {/* Mobile Buttons */}
      <div className="flex flex-col gap-3 mt-4">

        {/* My Bag */}
        <button onClick={() => navigate("/my-bag")} className="flex items-center gap-2 text-indigo-600 border border-indigo-300 px-4 py-2 rounded-full hover:text-indigo-700 w-full justify-center">
          <TbShoppingBagHeart className="text-xl" />
          <span>{t("my_bag") || "My Bag"}</span>
        </button>

        {/* Logout */}
        {userName !== "Guest" && (
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 border border-red-300 px-4 py-2 rounded-full hover:text-red-700 w-full justify-center">
            <FaSignOutAlt />
            <span>{t("logout") || "Logout"}</span>
          </button>
        )}
      </div>
    </div>
  )}
  {/* Floating Chatbot Button */}
<button
  onClick={() => setIsChatOpen(!isChatOpen)}
  className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-2xl hover:bg-indigo-700 z-[999]"
>
  💬
</button>

{/* Chat Window */}
{isChatOpen && (
  <div className="fixed bottom-24 right-6 w-80 bg-white shadow-2xl rounded-xl z-[999] border border-gray-200">
    
    {/* Header */}
    <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
      <h3 className="font-semibold">Customer Support</h3>
      <button onClick={() => setIsChatOpen(false)} className="text-white text-lg">✖</button>
    </div>

    {/* Messages */}
    <div className="p-3 h-64 overflow-y-auto space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`p-2 rounded-lg text-sm max-w-[80%] ${
            msg.sender === "user"
              ? "bg-indigo-100 text-indigo-800 ml-auto"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="p-3 border-t flex gap-2">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-3 py-2 outline-none"
      />
      <button
        onClick={sendMessage}
        className="bg-indigo-600 text-white px-3 py-2 rounded-lg"
      >
        Send
      </button>
    </div>

  </div>
)}

</nav>
    </>
  );
};

export default NavbarWithSidebar;
