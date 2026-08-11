// src/routers/categoryRoutes.js
import express from "express";
import Category from "../models/admin/Category.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";

const router = express.Router();

// ✅ FIX: these routes had NO auth check before — any visitor (even logged out)
// could create/edit/delete categories via a direct API call. Locked down to
// admin-only, since only AdminCategoryManager.jsx uses this API.
router.use(adminAuthorization);

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
