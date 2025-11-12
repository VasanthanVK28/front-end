import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = window.location.href;
    const path = location.pathname;

    // 🎯 Define which paths to track
    const trackedPaths = [
      "/home",
      "/products/laptop",
      "/products/mobile",
      "/products/sofa",
      "/products/toys",
      "/products/shirt",
      "/popular-product",
    ];

    // ✅ Check if current path matches any tracked path (supports partial match)
    const shouldTrack = trackedPaths.some((tracked) =>
      path.startsWith(tracked)
    );

    if (!shouldTrack) return; // ❌ Skip tracking for other pages

    // 📊 Get stored page data
    const storedData = JSON.parse(localStorage.getItem("pageAnalytics")) || {};

    // 🔼 Increment visit count for this page
    storedData[currentUrl] = (storedData[currentUrl] || 0) + 1;

    // 💾 Save back to localStorage
    localStorage.setItem("pageAnalytics", JSON.stringify(storedData));
  }, [location]);

  return null;
};

export default PageTracker;
