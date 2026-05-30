import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword({ setFrmLoad }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    alert("OTP sent to your email (mock)");
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("OTP:", otp);
    alert("OTP verified (mock)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
              Forgot Password
            </h2>
            <p className="text-center text-gray-500 text-sm mb-4">
              Enter your email to receive a reset link
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition duration-300 mt-2"
              >
                Send Reset Link
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-500 text-xs mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-yellow-500 hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
              Verify OTP
            </h2>
            <p className="text-center text-gray-500 text-sm mb-4">
              Enter the OTP sent to your email
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm mb-1">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition duration-300 mt-2"
              >
                Verify OTP
              </button>
            </form>

            {/* Resend OTP */}
            <p className="text-center text-gray-500 text-xs mt-4">
              <span
                onClick={() => setStep(1)}
                className="text-yellow-500 cursor-pointer hover:underline font-semibold"
              >
                Resend OTP
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
