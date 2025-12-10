import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaLock, FaEnvelope, FaFingerprint } from "react-icons/fa";

const AdminAuth = () => {
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
        title: "Required Fields",
        text: "Please fill in all the details.",
        confirmButtonColor: "rgba(255,255,255,0.2)",
        background: "rgba(0,0,0,0.8)",
        color: "#fff",
        backdrop: `rgba(0,0,0,0.4)`
      });
      return;
    }

    try {
      const endpoint = isLogin ? "/admin/login" : "/admin/register";
      const response = await api.post(endpoint, formData);

      Swal.fire({
        icon: "success",
        title: isLogin ? "Welcome" : "Registered",
        text: "Access Granted.",
        timer: 1500,
        showConfirmButton: false,
        background: "rgba(0,0,0,0.8)",
        color: "#fff",
        iconColor: "#10b981",
        backdrop: `rgba(0,0,0,0.4)`
      });

      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      if (!isLogin) setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Authentication failed.",
        confirmButtonColor: "#f43f5e",
        background: "rgba(0,0,0,0.8)",
        color: "#fff",
        backdrop: `rgba(0,0,0,0.4)`
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* 🌌 Background with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')"
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* 🧭 Navbar (Floating) */}
      <div className="absolute top-0 w-full z-50 bg-transparent">
        <Navbar />
      </div>

      {/* 💎 Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 m-4 rounded-[30px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 bg-white/10 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/30">
            <FaFingerprint className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">
            {isLogin ? "Admin Login" : "Join Admin"}
          </h2>
          <p className="text-blue-100/70 text-sm mt-2 font-light tracking-wider">
            SECURE ACCESS PORTAL
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="relative group">
                  <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-100/30 focus:outline-none focus:bg-black/30 focus:border-purple-400 transition-all shadow-inner"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-white transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-100/30 focus:outline-none focus:bg-black/30 focus:border-purple-400 transition-all shadow-inner"
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-white transition-colors" />
            <input
              type="password"
              name="password"
              placeholder="Secret Key"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-100/30 focus:outline-none focus:bg-black/30 focus:border-purple-400 transition-all shadow-inner"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold tracking-wider shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 border border-white/20 transition-all"
          >
            {isLogin ? "AUTHENTICATE" : "REGISTER PROFILE"}
          </motion.button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-100/60 hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-0.5"
          >
            {isLogin ? "Create new admin access" : "Back to login"}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default AdminAuth;
