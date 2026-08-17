// components/admin/AdminCategoryManager.jsx
import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../page/categoryService";
//categoryService
const EMPTY_FORM = { icon: "", label: "", desc: "", value: "" };

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

// ─── Category card (admin view) ──────────────────────────────────────────────
function CategoryCard({ cat, onEdit, onDelete, deleting }) {
  return (
    <div className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-md hover:shadow-cyan-100">
      <div className="mb-3 flex w-full items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-2xl">
          {cat.icon}
        </div>
        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => onEdit(cat)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            title="Edit"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(cat)}
            disabled={deleting === cat._id}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
            title="Delete"
          >
            {deleting === cat._id ? <SpinnerIcon size={14} /> : <TrashIcon />}
          </button>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{cat.label}</h3>
      <p className="mt-1 text-xs text-gray-500">{cat.desc}</p>
      <code className="mt-2 text-[10px] text-gray-400">{cat.value}</code>
    </div>
  );
}

// ─── Add / Edit modal ────────────────────────────────────────────────────────
function CategoryModal({ initial, onSave, onClose, saving }) {
  const isEdit = !!initial?._id;
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [error, setError] = useState("");

  function set(field, val) {
    setForm((prev) => {
      const next = { ...prev, [field]: val };
      if (field === "label" && !isEdit) {
        next.value = toSlug(val);
      }
      return next;
    });
  }

  async function handleSave() {
    if (!form.icon || !form.label || !form.desc || !form.value) {
      setError("All fields are required.");
      return;
    }
    setError("");
    try {
      await onSave({ ...form, value: toSlug(form.value) });
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Edit category" : "Add category"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="Icon (emoji)">
            <input
              type="text"
              value={form.icon}
              onChange={(e) => set("icon", e.target.value)}
              placeholder="e.g. 🖥️"
              maxLength={2}
              className="input-base w-24"
            />
          </Field>
          <Field label="Label">
            <input
              type="text"
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="e.g. Hardware issue"
              className="input-base w-full"
            />
          </Field>
          <Field label="Description">
            <input
              type="text"
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              placeholder="e.g. Laptop, monitor, peripherals"
              className="input-base w-full"
            />
          </Field>
          <Field label="Value / slug" hint="Used in the ticket route URL">
            <input
              type="text"
              value={form.value}
              onChange={(e) => set("value", e.target.value)}
              placeholder="e.g. hardware"
              className="input-base w-full font-mono text-sm"
            />
          </Field>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="mt-1 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 py-2 text-sm font-medium text-white hover:bg-cyan-600 disabled:opacity-50"
            >
              {saving && <SpinnerIcon size={14} color="white" />}
              {isEdit ? "Save changes" : "Add category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Confirm delete modal ────────────────────────────────────────────────────
function ConfirmModal({ cat, onConfirm, onClose, deleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-base font-semibold text-gray-900">
          Delete category?
        </h2>
        <p className="text-sm text-gray-500">
          <strong>"{cat.label}"</strong> will be permanently removed. Any
          existing tickets in this category won't be affected.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
          >
            {deleting && <SpinnerIcon size={14} color="white" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function AdminCategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : (data.categories ?? []));
      } catch (e) {
        setFetchError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSave(form) {
    setSaving(true);
    try {
      if (modal.mode === "edit") {
        const updated = await updateCategory(modal.cat._id, form);
        setCategories((prev) =>
          prev.map((c) =>
            c._id === modal.cat._id ? (updated.category ?? updated) : c,
          ),
        );
      } else {
        const created = await createCategory(form);
        setCategories((prev) => [...prev, created.category ?? created]);
      }
      setModal(null);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleting(confirmDelete._id);
    try {
      await deleteCategory(confirmDelete._id);
      setCategories((prev) => prev.filter((c) => c._id !== confirmDelete._id));
      setConfirmDelete(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Ticket categories
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} · visible to
            all users when raising a ticket
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-600"
        >
          Add
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <SpinnerIcon size={20} />
          <span className="ml-2 text-sm">Loading…</span>
        </div>
      )}

      {fetchError && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          Failed to load categories: {fetchError}
        </div>
      )}

      {!loading && !fetchError && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">No categories yet.</p>
          <button
            onClick={() => setModal({ mode: "add" })}
            className="mt-3 text-sm font-medium text-cyan-600 hover:underline"
          >
            Add your first category
          </button>
        </div>
      )}

      {!loading && !fetchError && categories.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              cat={cat}
              onEdit={(c) => setModal({ mode: "edit", cat: c })}
              onDelete={(c) => setConfirmDelete(c)}
              deleting={deleting}
            />
          ))}
        </div>
      )}

      {modal && (
        <CategoryModal
          initial={modal.mode === "edit" ? modal.cat : undefined}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          cat={confirmDelete}
          onConfirm={handleDelete}
          onClose={() => setConfirmDelete(null)}
          deleting={!!deleting}
        />
      )}
    </div>
  );
}

// ─── Small helpers ───────────────────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-gray-500">
        {label}
        {hint && <span className="ml-1 text-gray-400">· {hint}</span>}
      </label>
      {children}
    </div>
  );
}

function SpinnerIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-spin"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
