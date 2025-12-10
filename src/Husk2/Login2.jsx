import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaFingerprint, FaKey, FaUser, FaArrowRight } from "react-icons/fa";

const Login2 = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please provide all required credentials.",
        confirmButtonColor: "#3b82f6",
        background: "#1e293b",
        color: "#fff",
      });
      return;
    }

    try {
      const endpoint = isLogin ? "/admin/login" : "/admin/register";
      const response = await api.post(endpoint, formData);

      Swal.fire({
        icon: "success",
        title: "Authentication Successful",
        text: "Redirecting to dashboard...",
        timer: 1500,
        showConfirmButton: false,
        background: "#1e293b",
        color: "#fff",
        iconColor: "#10b981"
      });

      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      setTimeout(() => navigate("/dashboard2"), 1500);

      if (!isLogin) setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: error.response?.data?.message || "Invalid credentials provided.",
        confirmButtonColor: "#ef4444",
        background: "#1e293b",
        color: "#fff",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 🌑 Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-[#1e293b] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden border border-slate-700/50"
      >
        {/* Header */}
        <div className="bg-[#1e293b] p-8 pb-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20 transform rotate-3 hover:rotate-6 transition-transform">
            <FaFingerprint className="text-3xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Join the Team"}
          </h2>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Enter your credentials to access the console." : "Create your admin profile to get started."}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                  <div className="relative group">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-[#334155] text-white pl-11 pr-4 py-3 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder-slate-500"
                      placeholder="johndoe"
                      autoComplete="off"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#334155] text-white pl-11 pr-4 py-3 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder-slate-500"
                  placeholder="admin@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative group">
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#334155] text-white pl-11 pr-4 py-3 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-2"
            >
              {isLogin ? "Sign In" : "Register Account"} <FaArrowRight size={14} />
            </motion.button>

          </form>

          {/* Footer Toggle */}
          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already valid?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                {isLogin ? "Request Access" : "Back to Login"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login2;
