import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../api/userApi"; // ✅ API import karo

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Password and Confirm Password do not match");
    }

    try {
      setIsLoading(true);
      const result = await userRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.status === "error") {
        return setError(result.message);
      }

      alert("Registration successful! Please login.");
      navigate("/login"); // ✅ login page pe redirect
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Register to continue
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-md mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm py-2 rounded-md transition duration-300 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-3">
          Already have an account?{" "}
          <Link
            to="/login" // ✅ fixed casing
            className="text-yellow-500 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
