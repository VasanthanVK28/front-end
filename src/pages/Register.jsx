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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password confirmation check
    if (form.password !== form.password_confirmation) {
      return Swal.fire({
        icon: "warning",
        title: "Password Mismatch ⚠️",
        text: "Password and confirmation do not match.",
        confirmButtonColor: "#6366f1",
      });
    }

    try {
      const res = await api.post("/register", form);

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Your account has been created successfully!",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text:
          err.response?.data?.message ||
          "Please check your details and try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-4">
      <div className="relative bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-lg transition-transform transform hover:scale-[1.02] duration-300">
        {/* ✨ Gradient Orbs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-indigo-400 to-pink-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-yellow-300 to-pink-400 rounded-full opacity-30 blur-3xl"></div>

        {/* 🧩 Header */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Join{" "}
          <span className="font-semibold text-indigo-600">NovaStore</span> and
          explore trending products!
        </p>

        {/* 📝 Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-md transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-px w-1/3 bg-gray-300"></span>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <span className="h-px w-1/3 bg-gray-300"></span>
        </div>

        {/* Google Signup Button */}
        <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-sm flex items-center justify-center space-x-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </button>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-8">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
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
