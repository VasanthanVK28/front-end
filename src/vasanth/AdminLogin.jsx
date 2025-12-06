import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";
 
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
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields!",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const endpoint = isLogin ? "/admin/login" : "/admin/register";
      const response = await api.post(endpoint, formData);

      Swal.fire({
        icon: "success",
        title: response.data.message || (isLogin ? "Login Success" : "Register Success"),
        timer: 1500,
        showConfirmButton: false,
        background: "#fef3f8",
      });

      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      if (!isLogin) setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-orange-100">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        {/* Login/Register Card */}
        <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-xl p-10 w-[380px] transition-all duration-500">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-center mb-6 drop-shadow-md">
            Admin
          </h1>

          {/* Toggle Login/Register */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 text-sm font-semibold rounded-l-lg transition-all duration-300 ${
                isLogin
                  ? "bg-white text-purple-700 border border-purple-400"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 text-sm font-semibold rounded-r-lg transition-all duration-300 ${
                !isLogin
                  ? "bg-white text-purple-700 border border-purple-400"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-gray-800">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
