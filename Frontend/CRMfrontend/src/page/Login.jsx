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

/**
 * NOTE ON FONTS
 * This design uses "Poppins" for headings and "Inter" for body text.
 * Add this to your public/index.html <head> if not already present:
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
 */

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

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

  const isAdmin = activeTab === "admin";
  const isLoading = isAdmin ? adminLoading : userLoading;
  const error = isAdmin ? adminError : userError;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F3FB] p-4 sm:p-6 font-['Inter']">
      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(76,29,149,0.25)] overflow-hidden flex flex-col md:flex-row min-h-[640px]">
        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight font-['Poppins']">
              Flowly CRM
            </span>
          </div>

          {/* Heading */}
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-500 uppercase mb-2">
            Secure access
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-2 font-['Poppins']">
            Hello, Welcome Back
          </h1>
          <p className="text-slate-500 mb-8">
            Hey, welcome back to your special place
          </p>

          {/* Tabs — pill switch */}
          <div className="inline-flex bg-violet-50 rounded-full p-1 mb-7 w-fit overflow-hidden">
            <button
              type="button"
              onClick={() => setActiveTab("employee")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTab === "employee"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("admin")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTab === "admin"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Admin
            </button>
          </div>

          {error && (
            <Alert variant="danger" className="!py-2 !text-sm !mb-4">
              {error}
            </Alert>
          )}

          <form
            onSubmit={isAdmin ? handleAdminSubmit : handleUserSubmit}
            className="flex flex-col"
          >
            <label className="text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="yourname@gmail.com"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full border border-slate-200 bg-slate-50 focus:bg-white p-3 mb-4 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
            />

            <label className="text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleOnChange}
                className="w-full border border-slate-200 bg-slate-50 focus:bg-white p-3 pr-11 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // eye-off icon
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  // eye icon
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-7">
              <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((r) => !r)}
                  className="rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-violet-600/25"
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : isAdmin ? (
                "Sign in as Admin"
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: SIGNATURE ILLUSTRATION PANEL */}
        <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-violet-700 via-violet-600 to-violet-400 items-center justify-center overflow-hidden">
          {/* soft cloud blobs */}
          <div className="absolute top-10 left-10 w-20 h-10 bg-white/20 rounded-full blur-[2px]" />
          <div className="absolute top-16 left-24 w-14 h-8 bg-white/15 rounded-full blur-[2px]" />
          <div className="absolute bottom-16 right-12 w-24 h-12 bg-white/15 rounded-full blur-[2px]" />
          <div className="absolute bottom-24 right-28 w-14 h-8 bg-white/10 rounded-full blur-[2px]" />

          <svg
            viewBox="0 0 320 360"
            className="relative w-[280px] sm:w-[320px] drop-shadow-2xl"
          >
            {/* phone / access card */}
            <rect
              x="70"
              y="40"
              width="180"
              height="280"
              rx="28"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            />
            <rect
              x="70"
              y="40"
              width="180"
              height="280"
              rx="28"
              fill="url(#cardShine)"
            />
            <defs>
              <linearGradient id="cardShine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* fingerprint rings, pulsing */}
            <g transform="translate(160,180)">
              <circle
                r="46"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <circle
                r="34"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                opacity="0.7"
              />
              <circle
                r="22"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                opacity="0.5"
              />
              <circle r="8" fill="#FBBF24">
                <animate
                  attributeName="opacity"
                  values="1;0.4;1"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                r="60"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="1.5"
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  values="46;66;46"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* lock badge, floating top-right of card */}
            <g transform="translate(232,60)">
              <circle r="26" fill="#111827" />
              <rect
                x="-10"
                y="-3"
                width="20"
                height="16"
                rx="3"
                fill="#FBBF24"
              />
              <path
                d="M-6 -3 v-6 a6 6 0 0 1 12 0 v6"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="3"
              />
            </g>

            {/* checkmark chip, bottom-left of card */}
            <g transform="translate(88,300)">
              <circle r="18" fill="#ffffff" opacity="0.9" />
              <path
                d="M-7 0l5 5 9 -10"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          <div className="absolute bottom-8 left-8 right-8 text-white/90">
            <p className="text-lg font-semibold font-['Poppins']">
              One scan. Full access.
            </p>
            <p className="text-sm text-white/70 mt-1">
              Your CRM data, protected end to end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
