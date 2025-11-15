import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    try {
      const res = await api.post("/login", { email, password });

      // ✅ Save token + api_key
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("api_key", res.data.api_key);
      localStorage.setItem("user_name", res.data.user.name);

      // 🔥 IMPORTANT — Save unique user ID for My Bag
      localStorage.setItem("user_unique_id", res.data.user.id);

      Swal.fire({
        icon: "success",
        title: "Welcome Back",
        text: "Login successful!",
        confirmButtonColor: "#6366f1",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        const apiKey = encodeURIComponent(res.data.api_key);
        navigate(`/home?api_key=${apiKey}`);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: err.response?.data?.error || "Invalid credentials.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4">
      <div className="relative bg-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Log in to your{" "}
          <span className="font-semibold text-indigo-600">TrendyMart</span> account
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-600 mt-8">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
