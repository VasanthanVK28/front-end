import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Home");

  // States for customization panel
  const [showPrice, setShowPrice] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [cardColor, setCardColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [starColor, setStarColor] = useState("#FFD700");

  // States for scraping schedule
  const [scrapeFrequency, setScrapeFrequency] = useState("daily");
  const [scrapeTime, setScrapeTime] = useState("03:00");
  const [scrapeDay, setScrapeDay] = useState("sun");
  const [loading, setLoading] = useState(false); // disable button while request in progress

  // Backend API URL from .env
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("productSettings"));
    if (savedSettings) {
      setShowPrice(savedSettings.showPrice);
      setShowRating(savedSettings.showRating);
      setShowLabels(savedSettings.showLabels);
      setVisibleCount(savedSettings.visibleCount);
      setCardColor(savedSettings.cardColor);
      setTextColor(savedSettings.textColor);
      setStarColor(savedSettings.starColor);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  // Sidebar menu items
  const menuItems = [
    "Home",
    "Scrape Products",
    "Configurable layout",
    "Scrape Status",
    "Users",
    "Settings",
  ];

  // Save settings function with SweetAlert
  const handleSaveSettings = () => {
    const settings = {
      showPrice,
      showRating,
      showLabels,
      visibleCount,
      cardColor,
      textColor,
      starColor,
    };
    localStorage.setItem("productSettings", JSON.stringify(settings));

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Product display settings saved successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Schedule scraping handler
  const handleScheduleScrape = async () => {
    // Validation
    if ((scrapeFrequency === "daily" || scrapeFrequency === "weekly") && !scrapeTime) {
      Swal.fire({ icon: "warning", title: "Time required", text: "Please select a time" });
      return;
    }
    if (scrapeFrequency === "weekly" && !scrapeDay) {
      Swal.fire({ icon: "warning", title: "Day required", text: "Please select a day" });
      return;
    }

    setLoading(true);
    try {
      const payload = { scrapeFrequency, scrapeTime, scrapeDay };
      const res = await fetch(`${API_URL}/api/schedule-scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Scheduled!",
          text: "Scraping task scheduled successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to schedule scraping task");
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-2xl font-bold p-6 border-b border-white/20">Dashboard</div>
            <ul className="mt-4">
              {menuItems.map((item) => (
                <li
                  key={item}
                  onClick={() => setActiveItem(item)}
                  className={`px-6 py-4 cursor-pointer transition-all duration-300 rounded-r-full ${
                    activeItem === item ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Logout */}
          <div className="p-6 border-t border-white/20">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 py-2 rounded font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
          <p className="text-gray-700 mb-6">
            You have selected: <span className="font-semibold">{activeItem}</span>
          </p>

          {/* Scrape Products Panel */}
          {activeItem === "Scrape Products" && (
            <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">⏱️ Schedule Scraping Task</h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Frequency</label>
                  <select
                    value={scrapeFrequency}
                    onChange={(e) => setScrapeFrequency(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly Once</option>
                  </select>
                </div>

                {(scrapeFrequency === "daily" || scrapeFrequency === "weekly") && (
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Time (HH:MM)</label>
                    <input
                      type="time"
                      value={scrapeTime}
                      onChange={(e) => setScrapeTime(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                )}

                {scrapeFrequency === "weekly" && (
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Day of Week</label>
                    <select
                      value={scrapeDay}
                      onChange={(e) => setScrapeDay(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    >
                      <option value="mon">Monday</option>
                      <option value="tue">Tuesday</option>
                      <option value="wed">Wednesday</option>
                      <option value="thu">Thursday</option>
                      <option value="fri">Friday</option>
                      <option value="sat">Saturday</option>
                      <option value="sun">Sunday</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={handleScheduleScrape}
                  disabled={loading}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Scheduling..." : "Schedule Scrape"}
                </button>
              </div>
            </div>
          )}

          {/* Configurable Layout Panel */}
          {activeItem === "Configurable layout" && (
            <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">⚙️ Customize Product Display</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Toggle Visibility */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700">Show / Hide</h3>
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={showPrice}
                        onChange={() => setShowPrice(!showPrice)}
                        className="mr-2"
                      />
                      Show Price
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={showRating}
                        onChange={() => setShowRating(!showRating)}
                        className="mr-2"
                      />
                      Show Ratings
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={showLabels}
                        onChange={() => setShowLabels(!showLabels)}
                        className="mr-2"
                      />
                      Show Labels (Brand & Title)
                    </label>
                  </div>
                </div>

                {/* Number of Items */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700">Number of Visible Items</h3>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={visibleCount}
                    onChange={(e) => setVisibleCount(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                {/* Color Customization */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700">Color Customization</h3>
                  <div className="flex flex-col gap-2">
                    <label>
                      Card Background:
                      <input
                        type="color"
                        value={cardColor}
                        onChange={(e) => setCardColor(e.target.value)}
                        className="ml-2"
                      />
                    </label>
                    <label>
                      Text Color:
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="ml-2"
                      />
                    </label>
                    <label>
                      Star Color:
                      <input
                        type="color"
                        value={starColor}
                        onChange={(e) => setStarColor(e.target.value)}
                        className="ml-2"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveSettings}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
