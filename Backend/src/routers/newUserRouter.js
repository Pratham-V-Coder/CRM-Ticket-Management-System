import express from "express";
import bcrypt from "bcryptjs";
import {
  insertUser,
  getAllUsers,
  getUserByEmail,
  updateUserStatus,
} from "../models/user/userModel.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";

const newUserRouter = express.Router();

// Sabhi routes pe admin auth
newUserRouter.use(adminAuthorization);

// Naya employee banao
newUserRouter.post("/create-user", async (req, res) => {
  try {
    const { name, email, password, role, company, phone, address } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: "failed",
        message: "Name, email, password aur role required hain",
      });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "Yeh email already registered hai",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await insertUser({
      name,
      email,
      password: hashedPassword,
      role,
      company: company || "",
      phone: phone || 0,
      address: address || "",
    });
    res.status(201).json({
      status: "success",
      message: "User ban gaya!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
});

// Sabhi employees ki list
newUserRouter.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
});

// Employee block/unblock
newUserRouter.put("/toggle-status", async (req, res) => {
  try {
    const { userId, isActive } = req.body;
    if (!userId || isActive === undefined) {
      return res.status(400).json({
        status: "failed",
        message: "userId aur isActive required hain",
      });
    }
    const updated = await updateUserStatus(userId, isActive);
    res.status(200).json({ status: "success", user: updated });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
});

export default newUserRouter;
