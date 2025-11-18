import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields!",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const endpoint = isLogin ? "/admin/login" : "/admin/register";
      const response = await api.post(endpoint, formData);

      Swal.fire({
        icon: "success",
        title: response.data.message || (isLogin ? "Login Successful" : "Registered Successfully"),
        timer: 1400,
        showConfirmButton: false,
      });

      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      setTimeout(() => navigate("/dashboard2"), 1500);

      if (!isLogin) setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Card */}
      <div className="w-[380px] p-8 rounded-3xl shadow-lg bg-white transition-all duration-500">

        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Third Party Admin Panel
        </h1>

        {/* Toggle Switch */}
        <div className="flex mb-6 bg-gray-200 p-1 rounded-xl">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-xl text-sm font-semibold transition-all ${
              isLogin
                ? "bg-white text-blue-600 shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-xl text-sm font-semibold transition-all ${
              !isLogin
                ? "bg-white text-blue-600 shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl text-lg font-bold bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-transform transform hover:scale-[1.02]"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login2;
