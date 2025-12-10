import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import { FaGoogle, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.password_confirmation) {
      setLoading(false);
      return Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Please ensure both passwords match.",
        confirmButtonColor: "#f59e0b",
      });
    }

    try {
      await api.post("/register", form);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to TrendyMart. Please log in.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* 🖼️ Left Side - Image/Brand Section (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-black/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Shopping Lifestyle"
          className="w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="absolute bottom-0 left-0 p-16 z-20 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Join the <br /> <span className="text-yellow-400">Revolution.</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-md leading-relaxed">
            Create an account today and start experiencing the future of online shopping with exclusive deals.
          </p>
        </div>
      </div>

      {/* 📝 Right Side - Register Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white overflow-y-auto py-10">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="mt-3 text-gray-500">
              Enter your details below to get started.
            </p>
          </div>

          {/* Social Sign Up */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium mb-6 shadow-sm">
            <FaGoogle className="text-red-500 text-lg" />
            Sign up with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="••••••••"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-purple-600 hover:text-purple-500 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
