// ---------------------------------------------
// axios.js
// ---------------------------------------------

import axios from "axios";

// ---------------------------------------------
// Remove api_key from URL (once on page load)
// ---------------------------------------------
(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("api_key")) {
    const apiKey = params.get("api_key");

    // Save API key in localStorage for headers
    localStorage.setItem("api_key", apiKey);

    // Remove api_key from URL without reloading
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
  }
})();

// ---------------------------------------------
// Axios instance
// ---------------------------------------------
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ---------------------------------------------
// Automatically attach token and x-api-key
// ---------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("api_key");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (apiKey) config.headers["x-api-key"] = apiKey;

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------
// Analytics tracking functions
// ---------------------------------------------
export const trackImpression = async (productId) => {
  try {
    await api.post("/analytics/track-impression", { product_id: productId });
  } catch (error) {
    console.error(
      "❌ Impression track failed:",
      error.response?.data || error.message
    );
  }
};

export const trackClick = async (productId) => {
  try {
    await api.post("/analytics/track-click", { product_id: productId });
  } catch (error) {
    console.error(
      "❌ Click track failed:",
      error.response?.data || error.message
    );
  }
};

// ---------------------------------------------
// Default export
// ---------------------------------------------
export default api;
