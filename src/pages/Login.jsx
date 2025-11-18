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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("api_key", res.data.api_key);
      localStorage.setItem("user_name", res.data.user.name);
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
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5632393/pexels-photo-5632393.jpeg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl 
        rounded-3xl p-10 w-full max-w-md transform transition duration-300 
        hover:scale-105 hover:-rotate-1"
      >
        {/* Slogan */}
        <h3 className="text-center text-white/90 text-lg font-medium mb-2">
           Shop Smart. Live Better.
        </h3>

        <h2 className="text-3xl font-extrabold text-white text-center mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Log in to your{" "}
          <span className="font-semibold text-yellow-300">TrendyMart</span> account
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/40 
                text-white placeholder-white/70 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/40 
                text-white placeholder-white/70 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black 
              font-bold rounded-full shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-200 mt-8">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-300 hover:text-yellow-200 font-semibold"
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
