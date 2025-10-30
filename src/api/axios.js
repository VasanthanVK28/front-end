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

export default api;
