import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach token and x-api-key automatically before every request
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
const trackImpression = async (productId) => {
  try {
    await api.post("/analytics/track-impression", { product_id: productId });
  } catch (error) {
    console.error("❌ Impression track failed:", error.response?.data || error.message);
  }
};

const trackClick = async (productId) => {
  try {
    await api.post("/analytics/track-click", { product_id: productId });
  } catch (error) {
    console.error("❌ Click track failed:", error.response?.data || error.message);
  }
};

export default api;
