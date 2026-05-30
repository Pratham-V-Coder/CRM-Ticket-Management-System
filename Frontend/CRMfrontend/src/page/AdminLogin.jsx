import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginAction } from "./adminAction";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuth, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(adminLoginAction(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/admin/dashboard");
    }
  }, [isAuth, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#0f172a",
          }}
        >
          Admin Login
        </h2>

        {error && (
          <p
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleOnSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter password"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#0e7490",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
