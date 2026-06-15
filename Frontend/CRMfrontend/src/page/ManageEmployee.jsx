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

  const fields = [
    { label: "Full Name *", name: "name", type: "text", required: true },
    { label: "Email *", name: "email", type: "email", required: true },
    { label: "Password *", name: "password", type: "password", required: true },
    { label: "Company", name: "company", type: "text" },
    { label: "Phone", name: "phone", type: "number" },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="m-0 text-lg font-bold text-gray-900">
            👥 Manage Employees
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setMessage({ type: "", text: "" });
              }}
              className="rounded-lg bg-cyan-700 px-4 py-2 text-[13px] font-medium text-white cursor-pointer"
            >
              {showForm ? "Cancel" : "+ Add Employee"}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-3.5 py-2 text-base text-gray-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 rounded-lg px-3.5 py-2.5 text-[13px] font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add Employee Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5"
          >
            <h3 className="m-0 mb-4 text-[15px] font-semibold text-gray-700">
              Naya Employee Add Karo
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Role *
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-[13px] text-gray-900 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                >
                  <option value="employee">Employee</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-cyan-700 px-6 py-2.5 text-[13px] font-semibold text-white cursor-pointer"
              >
                Create Employee
              </button>
            </div>
          </form>
        )}

        {/* Employees List */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            All Employees ({employees.length})
          </h3>
          {isLoading ? (
            <p className="py-8 text-center text-gray-400">Loading...</p>
          ) : employees.length === 0 ? (
            <p className="py-8 text-center text-gray-400">
              Koi employee nahi mila
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  className={`flex items-center justify-between rounded-[10px] border border-gray-200 px-3.5 py-3 ${
                    emp.isActive ? "bg-white" : "bg-red-50"
                  }`}
                >
                  <div>
                    <p className="m-0 text-[13px] font-semibold text-gray-900">
                      {emp.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">{emp.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                      {emp.role}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(emp._id, emp.isActive)}
                    className={`cursor-pointer rounded-lg border-[1.5px] bg-white px-3.5 py-1.5 text-xs font-medium ${
                      emp.isActive
                        ? "border-red-500 text-red-500"
                        : "border-emerald-500 text-emerald-500"
                    }`}
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
