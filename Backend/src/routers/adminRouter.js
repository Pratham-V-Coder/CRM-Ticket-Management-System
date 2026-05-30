import express from "express";
import {
  insertAdmin,
  getAdminByEmail,
  getAdminById,
  storeAdminRefreshJWT,
} from "../models/admin/adminModel.js";
import { hashPassword, comparePassword } from "../helper/bcryptHelper.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwtHelper.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import { deleteJWT } from "../helper/redisHelper.js";

const router = express.Router();

// Get Admin Profile
router.get("/", adminAuthorization, async (req, res) => {
  try {
    const _id = req.adminId;
    const admin = await getAdminById(_id);
    res.json({
      status: "success",
      user: {
        _id,
        name: admin.name,
        email: admin.email,
        company: admin.company,
        role: admin.role,
      },
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Create New Admin
router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {
    const existingAdmin = await getAdminByEmail(email).catch(() => null);
    if (existingAdmin && existingAdmin._id) {
      return res.json({
        status: "error",
        message: "Admin with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newAdminObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPassword,
      role: "admin",
    };

    const result = await insertAdmin(newAdminObj);
    res.json({ status: "success", message: "New admin created", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: "error", message: "Invalid form submission!" });
    }

    const admin = await getAdminByEmail(email);
    const passFromDb = admin && admin._id ? admin.password : null;

    if (!passFromDb) {
      return res.json({
        status: "error",
        message: "Invalid email or password!",
      });
    }

    const result = await comparePassword(password, passFromDb);

    if (!result) {
      return res.json({
        status: "error",
        message: "Invalid email or password!",
      });
    }

    if (admin.role !== "admin") {
      return res.json({
        status: "error",
        message: "Unauthorized access!",
      });
    }

    const accessJWT = await createAccessJWT(admin.email, `${admin._id}`, "admin");
    const refreshJWT = await createRefreshJWT(admin.email, `${admin._id}`, "admin");

    res.json({
      status: "success",
      message: "Login successful!",
      accessJWT,
      refreshJWT,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Admin Logout
router.delete("/logout", adminAuthorization, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const _id = req.adminId;

    // Bearer token strip karke delete karo
    const token = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : authorization;

    await deleteJWT(token);
    await storeAdminRefreshJWT(_id, "");

    res.json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export default router;
