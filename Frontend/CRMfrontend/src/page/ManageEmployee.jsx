import React, { useEffect, useState } from "react";
import {
  createEmployee,
  fetchAllEmployees,
  toggleEmployeeStatus,
} from "../api/employeeApi";

const ManageEmployees = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    company: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllEmployees();
      if (res.status === "success") setEmployees(res.users || []);
    } catch (err) {
      setMessage({ type: "error", text: "Employees load nahi hue" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      const res = await createEmployee(form);
      if (res.status === "success") {
        setMessage({ type: "success", text: "Employee ban gaya! ✅" });
        setForm({
          name: "",
          email: "",
          password: "",
          role: "employee",
          company: "",
          phone: "",
          address: "",
        });
        setShowForm(false);
        loadEmployees();
      } else {
        setMessage({ type: "error", text: res.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Kuch galat hua, dobara try karo" });
    }
  };

  const handleToggle = async (userId, currentStatus) => {
    try {
      const res = await toggleEmployeeStatus(userId, !currentStatus);
      if (res.status === "success") loadEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "750px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.5rem",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            👥 Manage Employees
          </h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setMessage({ type: "", text: "" });
              }}
              style={{
                background: "#0e7490",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {showForm ? "Cancel" : "+ Add Employee"}
            </button>
            <button
              onClick={onClose}
              style={{
                background: "#f3f4f6",
                color: "#374151",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontSize: "13px",
              fontWeight: 500,
              background: message.type === "success" ? "#dcfce7" : "#fee2e2",
              color: message.type === "success" ? "#15803d" : "#dc2626",
            }}
          >
            {message.text}
          </div>
        )}

        {/* Add Employee Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                margin: "0 0 1rem",
                fontSize: "15px",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Naya Employee Add Karo
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                {
                  label: "Full Name *",
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  label: "Email *",
                  name: "email",
                  type: "email",
                  required: true,
                },
                {
                  label: "Password *",
                  name: "password",
                  type: "password",
                  required: true,
                },
                { label: "Company", name: "company", type: "text" },
                { label: "Phone", name: "phone", type: "number" },
                { label: "Address", name: "address", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#374151",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#374151",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Role *
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="employee">Employee</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <button
                type="submit"
                style={{
                  background: "#0e7490",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "9px 24px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Create Employee
              </button>
            </div>
          </form>
        )}

        {/* Employees List */}
        <div>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "12px",
            }}
          >
            All Employees ({employees.length})
          </h3>
          {isLoading ? (
            <p
              style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}
            >
              Loading...
            </p>
          ) : employees.length === 0 ? (
            <p
              style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}
            >
              Koi employee nahi mila
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    background: emp.isActive ? "white" : "#fef2f2",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#111827",
                      }}
                    >
                      {emp.name}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      {emp.email}
                    </p>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "20px",
                        fontWeight: 500,
                        marginTop: "4px",
                        display: "inline-block",
                        background: "#e0f2fe",
                        color: "#0369a1",
                      }}
                    >
                      {emp.role}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(emp._id, emp.isActive)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: emp.isActive ? "#ef4444" : "#10b981",
                      color: emp.isActive ? "#ef4444" : "#10b981",
                      background: "white",
                    }}
                  >
                    {emp.isActive ? "Block" : "Unblock"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
