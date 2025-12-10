import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import { FaGoogle, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        text: "Redirecting you to the dashboard...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/home");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: err.response?.data?.error || "Invalid credentials.",
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Shopping Experience"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-0 left-0 p-16 z-20 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Discover the <br /> <span className="text-yellow-400">Extraordinary.</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-md leading-relaxed">
            Join thousands of shoppers discovering premium products at unbeatable prices. Your journey starts here.
          </p>
        </div>
      </div>

      {/* 📝 Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome back!</h2>
            <p className="mt-3 text-gray-500">
              Please enter your details to access your account.
            </p>
          </div>

          {/* Social Login (Visual Only) */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium mb-6 shadow-sm">
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="vs@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
