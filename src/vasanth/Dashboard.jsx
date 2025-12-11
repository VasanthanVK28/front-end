// src/components/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import ProductsTable from "../components/ProductsTable";
import ProductPieChart from "../components/ProductPieChart";
import { DataGrid } from "@mui/x-data-grid";
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  FaHome,
  FaDatabase,
  FaClipboardList,
  FaTable,
  FaSignOutAlt,
  FaUserFriends,
  FaMobileAlt,
  FaLaptop,
  FaCouch,
  FaTshirt,
  FaGamepad,
  FaRobot,
  FaCalendarCheck,
  FaSearch
} from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Home");

  // ---------------- Customization States ----------------
  const [showPrice, setShowPrice] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [cardColor, setCardColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [starColor, setStarColor] = useState("#FFD700");

  // ---------------- Scraping States ----------------
  const [scrapeFrequency, setScrapeFrequency] = useState("daily");
  const [scrapeTime, setScrapeTime] = useState("03:00");
  const [scrapeDay, setScrapeDay] = useState("sun");
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [schedules, setSchedules] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // ---------------- User Count State ----------------
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersLoading, setUsersLoading] = useState(true);

  // ------------------- Category Counts ----------------
  const [totalMobiles, setTotalMobiles] = useState(0);
  const [mobilesLoading, setMobilesLoading] = useState(true);

  const [laptopLoading, setLaptopLoading] = useState(true);
  const [totalLaptops, setTotalLaptops] = useState(0);

  const [sofaLoading, setSofaLoading] = useState(true);
  const [totalSofas, setTotalSofas] = useState(0);

  const [shirtLoading, setShirtLoading] = useState(true);
  const [totalShirts, setTotalShirts] = useState(0);

  const [toyLoading, setToyLoading] = useState(true);
  const [totalToys, setTotalToys] = useState(0);

  // ---------------- Logs State ----------------
  const [logs, setLogs] = useState([]);
  const addLog = (message, type = "info") => {
    setLogs((prev) => [{ id: Date.now(), message, type, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // ---------------- Fetch Data ----------------
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        addLog("Fetching total users...", "info");
        const response = await axios.get(`${API_URL}/api/total-users`);
        if (response.data.status === "success") {
          setTotalUsers(response.data.total_users);
          addLog(`✓ Loaded ${response.data.total_users} total users`, "success");
        }
      } catch (error) {
        console.error(error);
        addLog(`✗ Error fetching users: ${error.message}`, "error");
      } finally { setUsersLoading(false); }
    };
    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchData = async (endpoint, setter, loader) => {
      try {
        addLog(`Fetching ${endpoint} data...`, "info");
        const res = await axios.get(`${API_URL}/api/${endpoint}`);
        if (res.data.status === "success" || res.data.count !== undefined) {
          setter(res.data.count);
          addLog(`✓ Loaded ${res.data.count} ${endpoint}`, "success");
        }
      } catch (e) {
        console.error(e);
        addLog(`✗ Error fetching ${endpoint}: ${e.message}`, "error");
      } finally { loader(false); }
    };

    fetchData("mobiles", setTotalMobiles, setMobilesLoading);
    fetchData("laptops", setTotalLaptops, setLaptopLoading); // Note: verify endpoint
    fetchData("sofas", setTotalSofas, setSofaLoading);
    fetchData("shirts", setTotalShirts, setShirtLoading);
    fetchData("toys", setTotalToys, setToyLoading);
  }, []);

  // Laptops endpoint fetch separately if needed differently
  useEffect(() => {
    const fetchLaptopCount = async () => {
      try {
        const res = await fetch(`${API_URL}/api/laptops`);
        const data = await res.json();
        setTotalLaptops(data.count);
      } catch (err) { console.error(err); } finally { setLaptopLoading(false); }
    };
    fetchLaptopCount();
  }, []);


  // ---------------- Load Settings & Fetch Schedules ----------------
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("productSettings"));
    if (savedSettings) {
      setShowPrice(savedSettings.showPrice);
      setVisibleCount(savedSettings.visibleCount);
    }
    fetchSchedules();
    const interval = setInterval(() => { if (activeItem === "Scrape Status") fetchSchedules(); }, 5000);
    return () => clearInterval(interval);
  }, [activeItem]);

  const fetchSchedules = async () => {
    try {
      addLog("Fetching scrape schedules...", "info");
      const response = await axios.get(`${API_URL}/api/schedule-scrapes`);
      setSchedules(response.data.data || []);
      addLog(`✓ Loaded ${response.data.data?.length || 0} schedules`, "success");
    } catch (err) {
      setFetchError(err.message);
      addLog(`✗ Error fetching schedules: ${err.message}`, "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  // ---------------- Schedule Scrape ----------------
  const handleScheduleScrape = async () => {
    if ((scrapeFrequency === "daily" || scrapeFrequency === "weekly") && !scrapeTime) {
      Swal.fire({ icon: "warning", title: "Time required", text: "Please select a time" });
      addLog("⚠ Scrape schedule failed: Time not selected", "error");
      return;
    }
    if (scrapeFrequency === "weekly" && !scrapeDay) {
      Swal.fire({ icon: "warning", title: "Day required", text: "Please select a day" });
      addLog("⚠ Scrape schedule failed: Day not selected", "error");
      return;
    }
    if (!selectedCategories.length) {
      Swal.fire({ icon: "warning", title: "Select Category", text: "Please select at least one category" });
      addLog("⚠ Scrape schedule failed: No categories selected", "error");
      return;
    }

    setScheduleLoading(true);
    addLog(`Scheduling ${scrapeFrequency} scrape for categories: ${selectedCategories.join(", ")}`, "info");
    try {
      const categoryMap = { mobiles: "mobiles_collection", laptops: "laptops_collection", shirts: "shirts_collection", toys: "toys_collection", sofas: "sofas_collection" };
      let categoriesPayload = {};
      if (selectedCategories.includes("all")) categoriesPayload = categoryMap;
      else selectedCategories.forEach(cat => { if (categoryMap[cat]) categoriesPayload[cat] = categoryMap[cat]; });

      const payload = { scrapeFrequency, scrapeTime, scrapeDay, categories: categoriesPayload };
      const res = await fetch(`${API_URL}/api/schedule-scrape`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Scheduled!", timer: 2000, showConfirmButton: false });
        addLog(`✓ Successfully scheduled ${scrapeFrequency} scrape at ${scrapeTime || 'hourly'}`, "success");
        fetchSchedules();
      } else throw new Error("Failed to schedule");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
      addLog(`✗ Scrape scheduling failed: ${err.message}`, "error");
    } finally { setScheduleLoading(false); }
  };

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Scrape Products", icon: <FaRobot /> },
    { name: "Scrape Status", icon: <FaDatabase /> },
    { name: "Logs", icon: <FaClipboardList /> },
    { name: "Products table", icon: <FaTable /> }
  ];

  // ---------------- Render Function ----------------
  const StatsCard = ({ title, count, loading, icon, colorClass, borderClass, textClass }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 ${textClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <h3 className="text-3xl font-bold text-gray-900">{count}</h3>
        )}
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass} ${textClass}`}>
        {icon}
      </div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* 🌒 SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col shadow-2xl z-20">
        {/* Logo area */}
        <div className="h-20 flex items-center px-8 border-b border-gray-800">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Trendy<span className="text-white">Admin</span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 space-y-2 px-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeItem === item.name
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-xl transition-all font-semibold"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* ☀️ MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <h2 className="text-2xl font-bold text-gray-800">{activeItem}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">

          {activeItem === "Home" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <StatsCard title="Total Users" count={totalUsers} loading={usersLoading} icon={<FaUserFriends size={24} />} colorClass="bg-blue-100" textClass="text-blue-600" />
                <StatsCard title="Mobiles" count={totalMobiles} loading={mobilesLoading} icon={<FaMobileAlt size={24} />} colorClass="bg-green-100" textClass="text-green-600" />
                <StatsCard title="Laptops" count={totalLaptops} loading={laptopLoading} icon={<FaLaptop size={24} />} colorClass="bg-purple-100" textClass="text-purple-600" />
                <StatsCard title="Sofas" count={totalSofas} loading={sofaLoading} icon={<FaCouch size={24} />} colorClass="bg-orange-100" textClass="text-orange-600" />
                <StatsCard title="Shirts" count={totalShirts} loading={shirtLoading} icon={<FaTshirt size={24} />} colorClass="bg-lime-100" textClass="text-lime-600" />
                <StatsCard title="Toys" count={totalToys} loading={toyLoading} icon={<FaGamepad size={24} />} colorClass="bg-cyan-100" textClass="text-cyan-600" />
              </div>

              {/* Chart Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Product Distribution</h3>
                <ProductPieChart
                  totalUsers={totalUsers}
                  totalMobiles={totalMobiles}
                  totalLaptops={totalLaptops}
                  totalSofas={totalSofas}
                  totalShirts={totalShirts}
                  totalToys={totalToys}
                />
              </div>
            </div>
          )}

          {activeItem === "Scrape Products" && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <FaRobot size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Task Scheduler</h3>
                  <p className="text-sm text-gray-500">Automate your data collection</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={scrapeFrequency}
                    onChange={(e) => setScrapeFrequency(e.target.value)}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {(scrapeFrequency === "daily" || scrapeFrequency === "weekly") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={scrapeTime}
                        onChange={(e) => setScrapeTime(e.target.value)}
                      />
                    </div>
                  )}
                  {scrapeFrequency === "weekly" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Day</label>
                      <select
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={scrapeDay}
                        onChange={(e) => setScrapeDay(e.target.value)}
                      >
                        <option value="mon">Monday</option>
                        <option value="sun">Sunday</option>
                        {/* Add others as needed */}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "mobiles", "laptops", "shirts", "toys", "sofas"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          if (cat === "all") setSelectedCategories(["all"]);
                          else {
                            const newCats = selectedCategories.includes("all") ? [] : [...selectedCategories];
                            if (newCats.includes(cat)) setSelectedCategories(newCats.filter(c => c !== cat));
                            else setSelectedCategories([...newCats, cat]);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategories.includes(cat)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleScheduleScrape}
                  disabled={scheduleLoading}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {scheduleLoading ? "Scheduling..." : <><FaCalendarCheck /> Schedule Task</>}
                </button>
              </div>
            </div>
          )}

          {activeItem === "Scrape Status" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Active Schedules</h3>
              </div>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={schedules.map((s, i) => ({ id: s._id || i, ...s }))}
                  columns={[
                    { field: "frequency", headerName: "Frequency", flex: 1 },
                    { field: "time", headerName: "Time", flex: 1 },
                    {
                      field: "status", headerName: "Status", flex: 1, renderCell: (p) => (
                        <span className={`font-bold ${p.value === 'complete' ? 'text-green-500' : 'text-orange-500'}`}>
                          {p.value?.toUpperCase()}
                        </span>
                      )
                    },
                  ]}
                  pageSize={5}
                  checkboxSelection={false}
                  sx={{ border: "none" }}
                />
              </div>
            </div>
          )}

          {activeItem === "Logs" && (
            <div className="bg-black text-green-400 p-6 rounded-2xl font-mono text-sm h-[600px] overflow-y-auto shadow-2xl">
              <div className="border-b border-gray-800 pb-2 mb-4 flex justify-between">
                <span>System Logs</span>
                <span className="text-gray-500">Live Stream</span>
              </div>
              {logs.length === 0 ? <p className="opacity-50">No logs generated yet...</p>
                : logs.map(log => (
                  <div key={log.id} className="mb-2">
                    <span className="text-gray-500">[{log.time}]</span> <span className={log.type === 'error' ? 'text-red-400' : 'text-green-300'}>{log.message}</span>
                  </div>
                ))}
            </div>
          )}

          {activeItem === "Products table" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ProductsTable />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
