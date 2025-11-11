// src/components/Dashboard.jsx

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
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

  const [schedules, setSchedules] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // ---------------- Analytics States ----------------
  const [analytics, setAnalytics] = useState({
    impressions: 0,
    clicks: 0,
    ctr: 0,
    chartData: [],
    pieImpressions: [],
    pieClicks: [],
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


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

  // ---------------- Fetch Analytics ----------------
  useEffect(() => {
    if (activeItem === "View Analytics") fetchAnalytics();
  }, [activeItem]);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/analytics`);
      if (res.data.status === "success") {
        const data = res.data.data;

        // Aggregate totals
        const totalImpressions = data.reduce((sum, d) => sum + (d.impressions || 0), 0);
        const totalClicks = data.reduce((sum, d) => sum + (d.clicks || 0), 0);
        const ctr = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

        // Aggregate by date for line chart
        const dailyTotals = {};
        data.forEach((d) => {
          const date = d.date.split("T")[0];
          if (!dailyTotals[date]) dailyTotals[date] = { impressions: 0, clicks: 0 };
          dailyTotals[date].impressions += d.impressions;
          dailyTotals[date].clicks += d.clicks;
        });
        const chartData = Object.keys(dailyTotals)
  .sort()
  .map((date) => {
    const imp = dailyTotals[date].impressions;
    const clk = dailyTotals[date].clicks;
    return {
      date,
      impressions: imp,
      clicks: clk,
      ctr: imp ? ((clk / imp) * 100).toFixed(2) : 0, // Calculate daily CTR
    };
  });


        // Pie chart by product
        const pieImpressions = data.map((d) => ({ name: d.product_name, value: d.impressions }));
        const pieClicks = data.map((d) => ({ name: d.product_name, value: d.clicks }));

        setAnalytics({ impressions: totalImpressions, clicks: totalClicks, ctr, chartData, pieImpressions, pieClicks });
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  };


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
  const handleScheduleScrape = async () => {
    if ((scrapeFrequency === "daily" || scrapeFrequency === "weekly") && !scrapeTime) {
      Swal.fire({ icon: "warning", title: "Time required", text: "Please select a time" });
      return;
    }
    if (scrapeFrequency === "weekly" && !scrapeDay) {
      Swal.fire({ icon: "warning", title: "Day required", text: "Please select a day" });
      return;
    }

    setScheduleLoading(true);
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
  const menuItems = ["Home", "Scrape Products", "Scrape Status", "View Analytics", "Configurable layout"];

  // ---------------- React Table Setup ----------------
  const columns = useMemo(
    () => [
      { accessorKey: "frequency", header: "Frequency" },
      { accessorKey: "time", header: "Time", cell: info => info.getValue() || "-" },
      { accessorKey: "day", header: "Day", cell: info => info.getValue() || "-" },
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

          return <span className={`font-semibold ${textColor}`}>{displayStatus}</span>;
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
          <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
          <p className="text-gray-700 mb-6">
            You have selected: <span className="font-semibold">{activeItem}</span>
          </p>

          {/* ---------------- Scrape Products Panel ---------------- */}
          {activeItem === "Scrape Products" && (
            <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">⏱️ Schedule Scraping Task</h2>
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

          {/* ---------------- Scrape Status Panel ---------------- */}
          {activeItem === "Scrape Status" && (
            <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-5xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Scrape Status</h2>

              {fetchError && <p className="text-red-500">{fetchError}</p>}
              {!fetchError && schedules.length === 0 && <p>No schedules found.</p>}

              {schedules.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                      {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-6 py-3 border-r text-center">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-3 border-r text-center">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          
          {/* ---------------- View Analytics Panel ---------------- */}
{activeItem === "View Analytics" && (
  <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-5xl">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Analytics</h2>

    {analyticsLoading ? (
      <p>Loading analytics...</p>
    ) : (
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-4">
          <div className="p-4 bg-blue-50 rounded-lg shadow cursor-pointer"
               onClick={() => setSelectedMetric("impressions")}>
            <h3 className="text-xl font-semibold text-blue-700">Impressions</h3>
            <p className="text-2xl font-bold text-blue-900">{analytics.impressions}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow cursor-pointer"
               onClick={() => setSelectedMetric("clicks")}>
            <h3 className="text-xl font-semibold text-green-700">Clicks</h3>
            <p className="text-2xl font-bold text-green-900">{analytics.clicks}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg shadow cursor-pointer"
               onClick={() => setSelectedMetric("ctr")}>
            <h3 className="text-xl font-semibold text-purple-700">CTR</h3>
            <p className="text-2xl font-bold text-purple-900">{analytics.ctr}%</p>
          </div>
        </div>

       

        {/* Chart */}
       <ReactECharts
  key={selectedMetric} // forces chart to re-render on metric change
  style={{ height: "400px" }}
  option={{
    title: { text: "📈 Analytics Over Time", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Impressions", "Clicks", "CTR"], bottom: 0 },
    xAxis: { type: "category", data: analytics.chartData.map((d) => d.date) },
    yAxis: { type: "value" },
    series: [
      ...(selectedMetric === null || selectedMetric === "impressions"
        ? [{
            name: "Impressions",
            type: "line",
            smooth: true,
            data: analytics.chartData.map((d) => d.impressions),
            lineStyle: { color: "#1E90FF" }, // Blue line
            itemStyle: { color: "#1E90FF" }, // Blue points
          }]
        : []),
      ...(selectedMetric === null || selectedMetric === "clicks"
        ? [{
            name: "Clicks",
            type: "line",
            smooth: true,
            data: analytics.chartData.map((d) => d.clicks),
            lineStyle: { color: "#32CD32" }, // Green line
            itemStyle: { color: "#32CD32" }, // Green points
          }]
        : []),
      ...(selectedMetric === null || selectedMetric === "ctr"
        ? [{
            name: "CTR",
            type: "line",
            smooth: true,
            data: analytics.chartData.map((d) => d.ctr),
            lineStyle: { color: "#800080" }, // Purple line
            itemStyle: { color: "#800080" }, // Purple points
          }]
        : []),
    ],
  }}
/>


      </>
    )}
  </div>
)}
          {/* ---------------- Configurable Layout Panel ---------------- */}
          {activeItem === "Configurable layout" && (
            <div className="bg-white mt-6 p-6 rounded-xl shadow-md max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ Customize Product Display</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Show / Hide Options */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 mb-2">Visibility</h3>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={showPrice} onChange={() => setShowPrice(!showPrice)} className="mr-2" />
                      Show Price
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={showRating} onChange={() => setShowRating(!showRating)} className="mr-2" />
                      Show Ratings
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={showLabels} onChange={() => setShowLabels(!showLabels)} className="mr-2" />
                      Show Labels
                    </label>
                  </div>
                </div>

                {/* Number of Items */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 mb-2">Number of Items</h3>
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
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 mb-2">Colors</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label className="text-gray-700 font-medium">Card Background</label>
                      <input
                        type="color"
                        value={cardColor}
                        onChange={(e) => setCardColor(e.target.value)}
                        className="w-16 h-8 border rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-gray-700 font-medium">Text Color</label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-16 h-8 border rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-gray-700 font-medium">Star Color</label>
                      <input
                        type="color"
                        value={starColor}
                        onChange={(e) => setStarColor(e.target.value)}
                        className="w-16 h-8 border rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              


              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
