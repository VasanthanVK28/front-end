// src/components/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import ProductPieChart from "../components/ProductPieChart";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {useReactTable,getCoreRowModel,getSortedRowModel,flexRender,} from "@tanstack/react-table";
import ReactECharts from "echarts-for-react"; // ✅ Added for analytics chart
import * as echarts from "echarts";

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

// ------------------- Mobile count Fetch ----------------
const [totalMobiles, setTotalMobiles] = useState(0);
const [mobilesLoading, setMobilesLoading] = useState(true);

// ------------------ Laptop count Fetch ----------------
const [laptopLoading, setLaptopLoading] = useState(true);
const [totalLaptops, setTotalLaptops] = useState(0);

// ------------------ Sofa count Fetch ----------------
const [sofaLoading, setSofaLoading] = useState(true);
const [totalSofas, setTotalSofas] = useState(0);

// ------------------ Shirt count Fetch ----------------
const [shirtLoading, setShirtLoading] = useState(true);
const [totalShirts, setTotalShirts] = useState(0);

// ------------------ Toys count Fetch ----------------
const [toyLoading, setToyLoading] = useState(true);
const [totalToys, setTotalToys] = useState(0);

// ---------------- Logs State ----------------
const [logs, setLogs] = useState([]);
const addLog = (message, type = "info") => {
  setLogs((prev) => [
    {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString(),
    },
    ...prev, // latest first
  ]);
};

// ---------------- Fetch Total Users ----------------
useEffect(() => {
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/total-users`);
      if (response.data.status === "success") {
        setTotalUsers(response.data.total_users);
        addLog("Fetched total users count successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
      addLog("Failed to fetch total users count", "error");
    } finally {
      setUsersLoading(false);
    }
  };

  fetchTotalUsers();
}, []);

  // ---------------- Analytics States ----------------
  const [analytics, setAnalytics] = useState({
    impressions: 0,
    clicks: 0,
    ctr: 0,
    chartData: [],
    pieImpressions: [],
    pieClicks: [],
    pages: [],
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const userApiKey = localStorage.getItem("api_key");
  const [showPages, setShowPages] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = React.useState([]); // empty array = show all by default

  // ---------------- Load Settings & Fetch Schedules ----------------
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

    fetchSchedules();

    // Auto-refresh every 5 seconds for scrape status
    const interval = setInterval(() => {
      if (activeItem === "Scrape Status") fetchSchedules();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeItem]);

  // ---------------- Fetch schedules from backend ----------------
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/schedule-scrapes`);
      setSchedules(response.data.data || []);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message || "Failed to fetch schedules");
    }
  };

  // ------------------ Mobile count Fetch ----------------
  useEffect(() => {
  const fetchMobileCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/mobiles`);
      if (response.data.status === "success") {
        setTotalMobiles(response.data.count);
        addLog("Fetched total mobiles successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching mobiles:", error);
      addLog("Failed to fetch total mobiles", "error");
    } finally {
      setMobilesLoading(false);
    }
  };

  fetchMobileCount();
}, []);



// ------------------ Laptop count Fetch ----------------
useEffect(() => {
  const fetchLaptopCount = async () => {
    try {
      const res = await fetch(`${API_URL}/api/laptops`);
      const data = await res.json();
      setTotalLaptops(data.count);
      addLog("Fetched total laptops successfully", "success");
    } catch (err) {
      console.error("Error fetching laptop count", err);
      addLog("Failed to fetch laptop count", "error");
    } finally {
      setLaptopLoading(false);
    }
  };

  fetchLaptopCount();
}, []);


// ------------------ Sofa count Fetch ----------------
useEffect(() => {
  const fetchSofaCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sofas`);
      if (response.data.status === "success") {
        setTotalSofas(response.data.count);
        addLog("Fetched total sofas successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching sofas:", error);
      addLog("Failed to fetch sofa count", "error");
    } finally {
      setSofaLoading(false);
    }
  };

  fetchSofaCount();
}, []);


// ------------------ Shirt count Fetch ----------------
useEffect(() => {
  const fetchShirtCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/shirts`);
      if (response.data.status === "success") {
        setTotalShirts(response.data.count);
        addLog("Fetched total shirts successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching shirts:", error);
      addLog("Failed to fetch shirt count", "error");
    } finally {
      setShirtLoading(false);
    }
  };

  fetchShirtCount();
}, []);

// ------------------ Toys count Fetch ----------------

useEffect(() => {
  const fetchToyCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/toys`);
      if (response.data.status === "success") {
        setTotalToys(response.data.count);
        addLog("Fetched total toys successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching toys:", error);
      addLog("Failed to fetch toys count", "error");
    } finally {
      setToyLoading(false);
    }
  };

  fetchToyCount();
}, []);


         

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  // ---------------- Save Settings ----------------
  const handleSaveSettings = () => {
    const settings = { showPrice, showRating, showLabels, visibleCount, cardColor, textColor, starColor };
    localStorage.setItem("productSettings", JSON.stringify(settings));
    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Settings saved successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // ---------------- Schedule Scrape ----------------
  // ---------------- Schedule Scrape ----------------
const handleScheduleScrape = async () => {
  if ((scrapeFrequency === "daily" || scrapeFrequency === "weekly") && !scrapeTime) {
    Swal.fire({ icon: "warning", title: "Time required", text: "Please select a time" });
    return;
  }
  if (scrapeFrequency === "weekly" && !scrapeDay) {
    Swal.fire({ icon: "warning", title: "Day required", text: "Please select a day" });
    return;
  }

  if (!selectedCategories.length) {
    Swal.fire({ icon: "warning", title: "Select Category", text: "Please select at least one category" });
    return;
  }

  setScheduleLoading(true);
  try {
    // Map categories to MongoDB collections
    const categoryMap = {
      mobiles: "mobiles_collection",
      laptops: "laptops_collection",
      shirts: "shirts_collection",
      toys: "toys_collection",
      sofas: "sofas_collection",
    };

    let categoriesPayload = {};
    if (selectedCategories.includes("all")) {
      categoriesPayload = categoryMap; // all categories
    } else {
      selectedCategories.forEach(cat => {
        if (categoryMap[cat]) categoriesPayload[cat] = categoryMap[cat];
      });
    }

    const payload = {
      scrapeFrequency,
      scrapeTime,
      scrapeDay,
      categories: categoriesPayload, // send object {query: collection_name}
    };

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
      fetchSchedules();
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to schedule scraping task");
    }
  } catch (err) {
    Swal.fire({ icon: "error", title: "Error", text: err.message });
  } finally {
    setScheduleLoading(false);
  }
};


  // ---------------- Helper: calculate schedule datetime ----------------
  const getScheduleTime = (schedule) => {
    const now = new Date();
    const [hours, minutes] = (schedule.time || "00:00").split(":");
    const scheduleDate = new Date(now);

    if (schedule.frequency === "weekly") {
      const dayMap = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 };
      const targetDay = dayMap[schedule.day || "sun"];
      const diff = (targetDay + 7 - scheduleDate.getDay()) % 7;
      scheduleDate.setDate(scheduleDate.getDate() + diff);
    }

    scheduleDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return scheduleDate;
  };

  // ---------------- Menu Items ----------------
  const menuItems = ["Home", "Scrape Products", "Scrape Status","Logs"];

  // ---------------- React Table Setup ----------------
  const columns = useMemo(
  () => [
    { accessorKey: "frequency", header: "Frequency" },
    { accessorKey: "time", header: "Time", cell: info => info.getValue() || "-" },
    { accessorKey: "day", header: "Day", cell: info => info.getValue() || "-" },

    // ✅ Categories Column
    {
  field: "categories",
  headerName: "Categories",
  flex: 2,
  renderCell: (params) => {
    const cats = params.value || {};

    return (
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {Object.keys(cats).length === 0 ? (
          <span>-</span>
        ) : (
          Object.keys(cats).map((key) => (
            <span
              key={key}
              style={{
                background: "#e5e7eb",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {key}
            </span>
          ))
        )}
      </div>
    );
  },
}

,


    // ✅ Status Column
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const schedule = row.original;
        let displayStatus = "";
        let textColor = "";

        if (schedule.is_running) {
          displayStatus = "Running...";
          textColor = "text-yellow-600";
        } else if (schedule.status === "complete") {
          displayStatus = "Complete";
          textColor = "text-green-600";
        } else if (schedule.status === "failed") {
          displayStatus = "Failed";
          textColor = "text-red-600";
        } else if (schedule.status === "active") {
          displayStatus = "Scheduled";
          textColor = "text-blue-600";
        } else {
          displayStatus = "Incomplete";
          textColor = "text-red-600";
        }

        return (
          <span className={`font-semibold ${textColor}`}>{displayStatus}</span>
        );
      },
    },
  ],
  []
);

  const table = useReactTable({
    data: schedules,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ---------------- Chart Options ----------------
  const chartOption = {
    title: { text: "📈 Clicks & Impressions Over Time", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Impressions", "Clicks"], bottom: 0 },
    xAxis: { type: "category", data: analytics.chartData.map(d => d.date) },
    yAxis: { type: "value" },
    series: [
      { name: "Impressions", type: "line", smooth: true, data: analytics.chartData.map(d => d.impressions) },
      { name: "Clicks", type: "line", smooth: true, data: analytics.chartData.map(d => d.clicks) },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        {/* ---------------- Sidebar ---------------- */}
        <div className="w-64 bg-white shadow-lg flex flex-col justify-between border-r border-gray-200">
          <div>
            <div className="text-2xl font-bold p-6 border-b border-gray-200 text-gray-800">Dashboard</div>
            <ul className="mt-4">
              {menuItems.map((item) => (
                <li
                  key={item}
                  onClick={() => setActiveItem(item)}
                  className={`px-6 py-4 cursor-pointer transition-all duration-300 rounded-r-full ${
                    activeItem === item ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  } text-gray-700`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 py-2 rounded font-semibold text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ---------------- Main Content ---------------- */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome to Super Admin Dashboard</h1>
          <p className="text-gray-700 mb-6">
            You have selected: <span className="font-semibold">{activeItem}</span>
          </p>


          
{/* ---------------- Home Section ---------------- */}
{activeItem === "Home" && (
  <>
    {/* ---------------- Home Cards ---------------- */}
    <div className="flex gap-16 flex-wrap">

      {/* ---- USER CARD ---- */}
      <div className="bg-blue-100 border border-blue-200 text-blue-800 rounded-xl shadow-md 
        w-72 p-6 mb-6 flex items-center justify-between
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          {usersLoading ? (
            <p className="text-3xl font-bold animate-pulse text-blue-400">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">{totalUsers}</p>
          )}
          <p className="text-sm opacity-70 mt-1">Total registered users</p>
        </div>

        <div className="text-blue-700 text-6xl opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5.121 17.804A12 12 0 1112 12a12 12 0 01-6.879 5.804z" />
          </svg>
        </div>
      </div>

      {/* ---- MOBILE CARD ---- */}
      <div className="bg-green-100 border border-green-200 text-green-800 rounded-xl shadow-md 
        w-72 p-6 mb-6 flex items-center justify-between
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Mobiles</h2>
          {mobilesLoading ? (
            <p className="text-3xl font-bold animate-pulse text-green-400">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">{totalMobiles}</p>
          )}
          <p className="text-sm opacity-70 mt-1">Total mobile products</p>
        </div>

        <div className="text-green-700 text-6xl opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10v16H7z" />
          </svg>
        </div>
      </div>

      {/* ---- LAPTOP CARD ---- */}
      <div className="bg-purple-100 border border-purple-200 text-purple-800 rounded-xl shadow-md 
        w-72 p-6 mb-6 flex items-center justify-between
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Laptops</h2>
          {laptopLoading ? (
            <p className="text-3xl font-bold animate-pulse text-purple-400">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">{totalLaptops}</p>
          )}
          <p className="text-sm opacity-70 mt-1">Total laptop products</p>
        </div>

        <div className="text-purple-700 text-6xl opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 4h18v12H3z M7 20h10" />
          </svg>
        </div>
      </div>

      {/* ---- SOFA CARD ---- */}
      <div className="bg-orange-100 border border-orange-200 text-orange-800 rounded-xl shadow-md 
        w-72 p-6 mb-6 flex items-center justify-between
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Sofas</h2>
          {sofaLoading ? (
            <p className="text-3xl font-bold animate-pulse text-orange-400">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">{totalSofas}</p>
          )}
          <p className="text-sm opacity-70 mt-1">Total sofa products</p>
        </div>

        <div className="text-orange-700 text-6xl opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 10h16v6H4z M2 16h20M6 10V7h12v3" />
          </svg>
        </div>
      </div>

      {/* ---- SHIRT CARD ---- */}
      <div className="bg-lime-200 border border-lime-200 text-lime-800 rounded-xl shadow-md 
        w-72 p-6 mb-6 flex items-center justify-between
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Shirts</h2>
          {shirtLoading ? (
            <p className="text-3xl font-bold animate-pulse text-lime-400">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">{totalShirts}</p>
          )}
          <p className="text-sm opacity-70 mt-1">Total shirt products</p>
        </div>

        <div className="text-lime-700 text-6xl opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 6l4-2 4 2 4-2 4 2v12H4V6z" />
          </svg>
        </div>
      </div>

      {/* ---- TOY CARD ---- */}
      <div className="bg-cyan-300 border border-purple-200 text-cyan-800 rounded-xl shadow-md 
        w-72 p-6 mb-6 flex items-center justify-between
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Toys</h2>
          {toyLoading ? (
            <p className="text-3xl font-bold animate-pulse text-cyan-400">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">{totalToys}</p>
          )}
          <p className="text-sm opacity-70 mt-1">Total toy products</p>
        </div>

        <div className="text-cyan-700 text-6xl opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5 15l7-7 7 7M5 9h14" />
          </svg>
        </div>
      </div>

    </div>

    {/* ---- PIE CHART SECTION ---- */}
    <ProductPieChart
      totalUsers={totalUsers}
      totalMobiles={totalMobiles}
      totalLaptops={totalLaptops}
      totalSofas={totalSofas}
      totalShirts={totalShirts}
      totalToys={totalToys}
    />
  </>
)}

          {/* ---------------- Logs Panel ---------------- */}

{activeItem === "Logs" && (
  <div className="bg-white p-6 rounded-lg shadow mt-6">
    <h2 className="text-2xl font-bold mb-4">Scrape Schedule Logs</h2>

    {schedules.length === 0 ? (
      <p className="text-gray-500">No scrape schedules found.</p>
    ) : (
      <div className="space-y-2 max-h-[500px] overflow-y-auto font-mono">
        {schedules.map((schedule, index) => {
          // Schedule time (keep as-is from DB)
          const startTime = schedule.time || "-";

          // Last run: show exact MongoDB string or format in UTC
          const lastRunTime = schedule.last_run
            ? new Date(schedule.last_run).toISOString() // keep as UTC ISO string
            : "-";

          return (
            <div key={schedule._id || index}>
              <p className="text-yellow-600">
                Starting scrape for schedule '{schedule.frequency}': {startTime}
              </p>

              {schedule.status === "complete" && (
                <p className="text-green-600">
                  Scheduled Scrape complete: {lastRunTime}
                </p>
              )}

              {schedule.status === "failed" && (
                <p className="text-red-600">
                  ❌ Scrape failed | Last run: {lastRunTime}
                </p>
              )}

              {schedule.is_running && (
                <p className="text-blue-600">
                  ⏳ Scraping in progress...
                </p>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
)}

          {/* ---------------- Scrape Products Panel ---------------- */}
{activeItem === "Scrape Products" && (
  <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-3xl">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Schedule Scraping Task</h2>
    <div className="flex flex-col gap-4">
      <label className="block font-semibold text-gray-700">Frequency</label>
      <select
        value={scrapeFrequency}
        onChange={(e) => setScrapeFrequency(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      >
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly Once</option>
      </select>

      {(scrapeFrequency === "daily" || scrapeFrequency === "weekly") && (
        <>
          <label className="block font-semibold text-gray-700">Time (HH:MM)</label>
          <input
            type="time"
            value={scrapeTime}
            onChange={(e) => setScrapeTime(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </>
      )}

      {scrapeFrequency === "weekly" && (
        <>
          <label className="block font-semibold text-gray-700">Day of Week</label>
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
        </>
      )}

      
      {/* ---------------- Category Checkbox ---------------- */}
<div>
  <label className="block font-semibold text-gray-700 mb-1">Category</label>

  <div className="flex flex-wrap gap-4">
    {["all", "mobiles", "laptops", "shirts", "toys", "sofas"].map((cat) => (
      <label key={cat} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedCategories.includes(cat)}
          onChange={() => {
            if (cat === "all") {
              setSelectedCategories(["all"]);
            } else {
              let updated = [...selectedCategories];

              // Remove "all" if other category is selected
              if (updated.includes("all")) {
                updated = updated.filter((c) => c !== "all");
              }

              if (updated.includes(cat)) {
                updated = updated.filter((c) => c !== cat);
              } else {
                updated.push(cat);
              }

              setSelectedCategories(updated);
            }
          }}
        />
        <span className="capitalize">{cat}</span>
      </label>
    ))}
  </div>
</div>

      <button
        onClick={handleScheduleScrape}
        disabled={scheduleLoading}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {scheduleLoading ? "Scheduling..." : "Schedule Scrape"}
      </button>
    </div>
  </div>
)}

         

{/* ---------------- Daily Runs Table ---------------- */}
{activeItem === "Scrape Status" && (
  <div className="bg-white mt-8 p-6 rounded-xl shadow-md max-w-5xl">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Scrape Schedule</h2>

    {(() => {
      // FILTER SCHEDULE LISTS
      const activeSchedules = schedules.filter(
        (s) => s.frequency && s.status?.toLowerCase() === "active"
      );
      
      const completedSchedules = schedules.filter(
        (s) => s.frequency && s.status?.toLowerCase() === "complete" // <-- FIXED HERE
      );
      
  const safeCategories = (cats) => {
  if (!cats) return {};

  if (typeof cats === "object") return cats;

  if (typeof cats === "string") {
    try {
      return JSON.parse(cats);
    } catch (e) {
      return {};
    }
  }

  return {};
  };

      return (
        <>
          {/* ---------------- ACTIVE TABLE ---------------- */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-green-700">
            Active Schedules
          </h3>

          {activeSchedules.length === 0 ? (
            <p>No active schedules found.</p>
          ) : (
            <div style={{ height: 350, width: "100%", marginBottom: "40px" }}>
              <DataGrid
                rows={activeSchedules.map((run, index) => ({
                  id: run._id || index,
                  frequency: run.frequency,
                  time: run.time,
                  status: run.status,
               categories: safeCategories(run.categories),

                }))}
                columns={[
                  { field: "frequency", headerName: "Frequency", flex: 1 },
                  { field: "time", headerName: "Time", flex: 1 },
                  { field: "status", headerName: "Status", flex: 1 },
  {
  field: "categories",
  headerName: "Categories",
  flex: 2,
  renderCell: (params) => {
    const cats = params.value || {};
    const keys = Object.keys(cats);

    if (keys.length === 0) return "-";

    // ✅ Show "All" if more than one category
    if (keys.length > 1) return "All";

    // ✅ Otherwise show the single category
    return (
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <span
          style={{
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "15px",
            fontWeight: "300",
          }}
        >
          {keys[0]}
        </span>
      </div>
    );
  },
  }


                ]}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#d1fae5",
                    color: "#065f46",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f0fdf4",
                  },
                }}
              />
            </div>
          )}

          {/* ---------------- COMPLETED TABLE ---------------- */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-red-700">
            Completed Schedules
          </h3>

          {completedSchedules.length === 0 ? (
            <p>No completed schedules found.</p>
          ) : (
            <div style={{ height: 350, width: "100%" }}>
              <DataGrid
                rows={completedSchedules.map((run, index) => ({
                  id: run._id || index,
                  frequency: run.frequency,
                  time: run.time,
                  status: run.status,
                 categories: safeCategories(run.categories),

                }))}
                columns={[
                  { field: "frequency", headerName: "Frequency", flex: 1 },
                  { field: "time", headerName: "Time", flex: 1 },
                  { field: "status", headerName: "Status", flex: 1 },
                 {
  field: "categories",
  headerName: "Categories",
  flex: 2,
  renderCell: (params) => {
    const cats = params.value || {};
    const keys = Object.keys(cats);

    if (keys.length === 0) return "-";

    // ✅ Show "All" if more than one category
    if (keys.length > 1) return "All";

    // ✅ Otherwise show the single category
    return (
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <span
          style={{
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "15px",
            fontWeight: "300",
          }}
        >
          {keys[0]}
        </span>
      </div>
    );
  },
  }


                ]}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#fee2e2",
                    color: "#7f1d1d",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#fef2f2",
                  },
                }}
              />
            </div>
          )}
        </>
      );
    })()}
  </div>
  )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
