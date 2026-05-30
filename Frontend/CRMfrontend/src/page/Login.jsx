import React, { useState, useEffect } from "react";

import { loginPending, loginSuccess, loginFail } from "./LoginSlice";

import {
  adminLoginPending,
  adminLoginSuccess,
  adminLoginFail,
} from "./adminSlice";

import { useDispatch, useSelector } from "react-redux";
import { Spinner, Alert } from "react-bootstrap";

import { userLogin } from "../api/userApi";
import { adminLogin, fetchAdmin } from "../api/adminApi";
import { useNavigate } from "react-router-dom";

import { getUserProfile } from "./userAction";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("employee");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    isLoading: userLoading,
    isAuth: userAuth,
    error: userError,
    user,
  } = useSelector((state) => state.login);

  const {
    isLoading: adminLoading,
    isAuth: adminAuth,
    error: adminError,
    admin,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (userAuth && user?.role) {
      navigate("/dashboard");
    }
  }, [userAuth, user, navigate]);

  useEffect(() => {
    if (adminAuth && admin) {
      navigate("/admin/dashboard");
    }
  }, [adminAuth, admin, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return alert("Please fill all fields");
    }
    dispatch(loginPending());
    try {
      const result = await userLogin({ email, password, role: "employee" });
      if (result.status === "error") {
        return dispatch(loginFail(result.message));
      }
      dispatch(loginSuccess(result.user));
      localStorage.setItem("user", JSON.stringify(result.user));
      await dispatch(getUserProfile());
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return alert("Please fill all fields");
    }
    dispatch(adminLoginPending());
    try {
      const result = await adminLogin({ email, password });
      if (result.status === "error") {
        return dispatch(adminLoginFail(result.message));
      }
      const profile = await fetchAdmin();
      dispatch(adminLoginSuccess(profile.user));
      localStorage.setItem("admin", JSON.stringify(profile.user));
    } catch (error) {
      dispatch(adminLoginFail(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-6 rounded-lg w-[380px]">
        {/* TABS */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("employee")}
            className={`flex-1 py-2 text-sm font-semibold ${
              activeTab === "employee"
                ? "border-b-2 border-yellow-400 text-yellow-500"
                : "text-gray-400"
            }`}
          >
            Employee Login
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-2 text-sm font-semibold ${
              activeTab === "admin"
                ? "border-b-2 border-yellow-400 text-yellow-500"
                : "text-gray-400"
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* EMPLOYEE LOGIN */}
        {activeTab === "employee" && (
          <form onSubmit={handleUserSubmit}>
            <h1 className="text-2xl font-bold text-center mb-4">
              Employee Login
            </h1>

            {userError && <Alert variant="danger">{userError}</Alert>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full border p-2 mb-4 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full border p-2 mb-4 rounded"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 py-2 rounded font-semibold"
            >
              {userLoading ? <Spinner animation="border" size="sm" /> : "Login"}
            </button>
          </form>
        )}

        {/* ADMIN LOGIN */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminSubmit}>
            <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>

            {adminError && <Alert variant="danger">{adminError}</Alert>}

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full border p-2 mb-4 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full border p-2 mb-4 rounded"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 py-2 rounded font-semibold"
            >
              {adminLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Admin Login"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
