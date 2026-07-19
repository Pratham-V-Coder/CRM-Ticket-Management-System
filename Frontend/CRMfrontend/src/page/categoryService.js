// services/categoryService.js
// Adjust BASE_URL to match your Express server
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/v1";

function getAuthHeaders() {
  const token = localStorage.getItem("admin_token"); // adjust key if needed
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

// GET /api/categories
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

// POST /api/categories
export async function createCategory(payload) {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUT /api/categories/:id
export async function updateCategory(id, payload) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// DELETE /api/categories/:id
export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}
