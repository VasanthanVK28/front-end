import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      return Swal.fire({
        icon: "warning",
        title: "Password Mismatch ⚠️",
        text: "Password and confirmation do not match.",
      });
    }

    try {
      await api.post("/register", form);

      Swal.fire({
        icon: "success",
        title: "Account Created 🎉",
        text: "Welcome to TrendyMart!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: err.response?.data?.message || "Something went wrong.",
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

      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-indigo-400 blur-3xl opacity-20 rounded-full"></div>

      {/* Card */}
      <div
        className="relative bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl 
        rounded-3xl p-10 w-full max-w-lg transform transition duration-300 
        hover:scale-105 hover:-rotate-1"
      >
        {/* Slogan */}
        <h3 className="text-center text-white/90 text-lg font-medium mb-2">
           Join the Shopping Revolution
        </h3>

        <h2 className="text-3xl font-extrabold text-white text-center mb-3">
          Create Your Account
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Become a member of{" "}
          <span className="font-semibold text-yellow-300">TrendyMart</span>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/40 
                text-white placeholder-white/70 rounded-full 
                focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/40 
                text-white placeholder-white/70 rounded-full 
                focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/40 
                text-white placeholder-white/70 rounded-full 
                focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/40 
                text-white placeholder-white/70 rounded-full 
                focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black 
              font-bold rounded-full shadow-lg transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-200 mt-8">
          <p>
            Already registered?{" "}
            <Link
              to="/login"
              className="text-yellow-300 hover:text-yellow-200 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
