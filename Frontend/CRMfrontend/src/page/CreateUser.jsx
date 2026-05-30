import { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/admin/create-user", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("✅ User ban gaya!");
      setForm({ name: "", email: "", password: "", role: "sales" });
    } catch (err) {
      setMsg("❌ " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New User</h2>
      {msg && <p>{msg}</p>}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="sales">Sales</option>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button onClick={handleSubmit}>Create User</button>
    </div>
  );
}

export default CreateUser;
