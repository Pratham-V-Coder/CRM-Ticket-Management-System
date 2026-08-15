import { useState } from "react";
import axios from "axios";

const rootUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/`
  : "http://localhost:4000/v1/";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" | "error"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const token =
      sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT");

    try {
      await axios.post(`${rootUrl}admin/create-user`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsgType("success");
      setMsg("User created successfully!");
      setForm({ name: "", email: "", password: "", role: "sales" });
    } catch (err) {
      setMsgType("error");
      setMsg(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F3FB] p-4 sm:p-6 font-['Inter']">
      <div className="w-full max-w-md bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(76,29,149,0.25)] px-8 sm:px-10 py-10">
        {/* Header */}
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-500 uppercase mb-2">
          Admin panel
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 font-['Poppins']">
          Create New User
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Add a new team member and assign their role
        </p>

        {/* Alert */}
        {msg && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
              msgType === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            <span>{msgType === "success" ? "✅" : "❌"}</span>
            <span>{msg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Full Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 bg-slate-50 focus:bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="john@company.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 bg-slate-50 focus:bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 bg-slate-50 focus:bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-slate-200 bg-slate-50 focus:bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm appearance-none cursor-pointer"
            >
              <option value="sales">Sales</option>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-violet-600/25"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
