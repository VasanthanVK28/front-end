// src/components/Dashboard2.jsx

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ScrapedProductsTable from "../components/ScrapedProductsTable";
import ProductCount from "../components/ProductCount";
import Swal from "sweetalert2";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import {
  FaHome,
  FaChartPie,
  FaCogs,
  FaCloudDownloadAlt,
  FaTable,
  FaSignOutAlt,
  FaFingerprint,
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard2 = () => {
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
  const [schedules, setSchedules] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // ---------------- Scrape Products State ----------------
  const [scrapeCategory, setScrapeCategory] = useState("");
  const [scrapeResult, setScrapeResult] = useState(null);
  const [scrapeLoading, setScrapeLoading] = useState(false);

  // ---------------- Analytics States ----------------
  const [analytics, setAnalytics] = useState({
    impressions: 0, clicks: 0, ctr: 0, chartData: [], pieImpressions: [], pieClicks: [], pages: [],
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const userApiKey = localStorage.getItem("api_key");
  const [showPages, setShowPages] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = React.useState([]);

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
    const interval = setInterval(() => { if (activeItem === "Scrape Status") fetchSchedules(); }, 5000);
    return () => clearInterval(interval);
  }, [activeItem]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/schedule-scrapes`);
      setSchedules(response.data.data || []);
      setFetchError(null);
    } catch (err) { setFetchError(err.message || "Failed to fetch schedules"); }
  };

  const handleScrape = async () => {
    if (!scrapeCategory.trim()) {
      Swal.fire({ icon: "warning", title: "Enter a category", text: "Please type a valid category before scheduling." });
      return;
    }
    setScrapeLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/scraper/add`, {
        query: scrapeCategory.trim(), frequency: scrapeFrequency, time: scrapeTime, day: scrapeDay,
      });
      if (res.data.status === "ok") {
        Swal.fire({ icon: "success", title: "Scheduled Successfully!", text: res.data.message, confirmButtonColor: "#3b82f6" });
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: res.data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error Occurred", text: err.response?.data?.message || err.message });
    } finally { setScrapeLoading(false); }
  };

  useEffect(() => { if (activeItem === "View Analytics") fetchAnalytics(); }, [activeItem]);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/analytics`);
      if (res.data.status === "success") {
        const data = res.data.data;
        const totalImpressions = data.reduce((sum, d) => sum + (d.impressions || 0), 0);
        const totalClicks = data.reduce((sum, d) => sum + (d.clicks || 0), 0);
        const ctr = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

        const dailyTotals = {};
        data.forEach((d) => {
          const date = d.date.split("T")[0];
          if (!dailyTotals[date]) dailyTotals[date] = { impressions: 0, clicks: 0 };
          dailyTotals[date].impressions += d.impressions;
          dailyTotals[date].clicks += d.clicks;
        });

        const chartData = Object.keys(dailyTotals).sort().map((date) => {
          const imp = dailyTotals[date].impressions;
          const clk = dailyTotals[date].clicks;
          return { date, impressions: imp, clicks: clk, ctr: imp ? ((clk / imp) * 100).toFixed(2) : 0 };
        });

        const productMap = {};
        data.forEach((d) => {
          if (!d.product_name) return;
          if (!productMap[d.product_id]) {
            productMap[d.product_id] = { product_id: d.product_id, product_name: d.product_name, clicks: d.clicks, impressions: d.impressions };
          } else {
            productMap[d.product_id].clicks += d.clicks;
            productMap[d.product_id].impressions += d.impressions;
          }
        });
        const uniqueProducts = Object.values(productMap);

        const pages = [
          { url: `${API_URL}/home?api_key=${userApiKey}`, productName: "Home", clicks: 0 },
          ...uniqueProducts.map((p) => ({ url: `${API_URL}/products/${p.product_id}?api_key=${userApiKey}`, productName: p.product_name, clicks: p.clicks })),
        ];

        setAnalytics({ impressions: totalImpressions, clicks: totalClicks, ctr, chartData, pieImpressions: [], pieClicks: [], pages });
      }
    } catch (err) { console.error("Error fetching analytics:", err); } finally { setAnalyticsLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem("admin"); navigate("/"); };
  const handleSaveSettings = () => {
    const settings = { showPrice, showRating, showLabels, visibleCount, cardColor, textColor, starColor };
    localStorage.setItem("productSettings", JSON.stringify(settings));
    Swal.fire({ icon: "success", title: "Saved!", text: "Settings saved successfully.", timer: 2000, showConfirmButton: false });
  };

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "View Analytics", icon: <FaChartPie /> },
    { name: "Configurable layout", icon: <FaCogs /> },
    { name: "Scrape Products", icon: <FaCloudDownloadAlt /> },
    { name: "Product Table", icon: <FaTable /> }
  ];

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans">
      {/* 🌒 Sidebar */}
      <aside className="w-72 bg-[#0f172a] text-slate-300 flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <FaFingerprint size={16} />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Admin<span className="text-blue-500">Panel</span></span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeItem === item.name
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                : "hover:bg-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className={`text-xl transition-colors ${activeItem === item.name ? "text-white" : "text-slate-500 group-hover:text-white"}`}>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 py-3 rounded-xl transition-all font-medium text-sm">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* ☀️ Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">{activeItem}</h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800">Administrator</p>
                <p className="text-xs text-slate-500">Super User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <FaUserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 relative">

          {activeItem === "Home" && (
            <ProductCount />
          )}

          {activeItem === "View Analytics" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["impressions", "clicks", "ctr"].map((metric) => (
                  <div key={metric}
                    onClick={() => {
                      setSelectedMetrics(prev => prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]);
                    }}
                    className={`p-6 bg-white rounded-2xl shadow-sm border cursor-pointer transition-all hover:-translate-y-1 ${selectedMetrics.includes(metric) ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-100 hover:shadow-md"
                      }`}
                  >
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">{metric}</p>
                    <h3 className="text-3xl font-bold text-slate-800">
                      {analytics[metric] ?? 0}{metric === "ctr" ? "%" : ""}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Main Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ReactECharts
                  key={selectedMetrics.join("-")}
                  style={{ height: "400px" }}
                  option={{
                    tooltip: { trigger: "axis" },
                    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
                    xAxis: {
                      type: "category",
                      data: analytics.chartData.map(d => d.date),
                      axisLine: { lineStyle: { color: "#cbd5e1" } },
                      axisLabel: { color: "#64748b" }
                    },
                    yAxis: {
                      type: "value",
                      splitLine: { lineStyle: { color: "#f1f5f9" } },
                      axisLabel: { color: "#64748b" }
                    },
                    series: [
                      {
                        name: "Impressions", type: "line", smooth: true, showSymbol: false,
                        data: analytics.chartData.map(d => d.impressions),
                        lineStyle: { width: 4, color: "#3b82f6" },
                        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0.01)' }]) },
                        itemStyle: { color: "#3b82f6" }
                      },
                      {
                        name: "Clicks", type: "line", smooth: true, showSymbol: false,
                        data: analytics.chartData.map(d => d.clicks),
                        lineStyle: { width: 4, color: "#10b981" },
                        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(16,185,129,0.3)' }, { offset: 1, color: 'rgba(16,185,129,0.01)' }]) },
                        itemStyle: { color: "#10b981" }
                      }
                    ].filter(s => selectedMetrics.length === 0 || selectedMetrics.includes(s.name.toLowerCase()))
                  }}
                />
              </div>

              {/* Pages Table Toggle */}
              <button onClick={() => setShowPages(!showPages)} className="text-blue-600 font-semibold hover:underline bg-white px-4 py-2 rounded-lg border border-slate-200">
                {showPages ? "Hide Page Details" : "Show Page Details"}
              </button>

              {showPages && (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Page Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">URL</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Clicks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {analytics.pages.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-700">{p.productName}</td>
                          <td className="px-6 py-4 text-sm text-blue-500 truncate max-w-xs">{p.url}</td>
                          <td className="px-6 py-4 text-sm text-slate-700 font-bold text-right">{p.clicks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeItem === "Configurable layout" && (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Display Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Features</h4>
                  <div className="space-y-4">
                    {[
                      { label: "Show Price", val: showPrice, set: setShowPrice },
                      { label: "Show Ratings", val: showRating, set: setShowRating },
                      { label: "Show Labels", val: showLabels, set: setShowLabels }
                    ].map((opt, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">{opt.label}</span>
                        <button
                          onClick={() => opt.set(!opt.val)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${opt.val ? "bg-blue-600" : "bg-slate-300"}`}
                        >
                          <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${opt.val ? "translate-x-6" : ""}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Appearance</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                      <span className="font-medium text-slate-700">Items Count</span>
                      <input type="number" min="1" max="20" value={visibleCount} onChange={(e) => setVisibleCount(parseInt(e.target.value))} className="w-16 p-1 border rounded text-center" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-sm text-slate-600">Card Color</span><input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} /></div>
                      <div className="flex justify-between items-center"><span className="text-sm text-slate-600">Text Color</span><input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} /></div>
                      <div className="flex justify-between items-center"><span className="text-sm text-slate-600">Star Color</span><input type="color" value={starColor} onChange={(e) => setStarColor(e.target.value)} /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button onClick={handleSaveSettings} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all">Save Changes</button>
              </div>
            </div>
          )}

          {activeItem === "Scrape Products" && (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">New Scrape Task</h3>
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={scrapeCategory}
                  onChange={(e) => setScrapeCategory(e.target.value)}
                  placeholder="Enter product category..."
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={handleScrape} disabled={scrapeLoading} className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50">
                  {scrapeLoading ? "Starting..." : "Start Scrape"}
                </button>
              </div>
              {scrapeResult && <div className="p-4 bg-slate-100 rounded-xl text-slate-700 text-sm">{scrapeResult}</div>}
            </div>
          )}

          {activeItem === "Product Table" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <ScrapedProductsTable />
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default Dashboard2;
