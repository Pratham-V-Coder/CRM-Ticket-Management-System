import express from "express";
import {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeUserRefreshJWT,
} from "../models/user/userModel.js";
import { hashPassword, comparePassword } from "../helper/bcryptHelper.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwtHelper.js";
import { userAuthorization } from "../middleware/authorization.js";
import {
  setPasswordResetPin,
  getPinByEmailPin,
  deletePin,
} from "../models/resetPin/ResetPinModel.js";
import { emailProcessor } from "../helper/emailHelper.js";
import {
  resetPassReqValidation,
  updatePassReqValidation,
} from "../middleware/formValidationMiddleware.js";
import { deleteJWT } from "../helper/redisHelper.js";

const router = express.Router();

// Get Profile Route
router.get("/", userAuthorization, async (req, res) => {
  try {
    const _id = req.userId;
    const userProf = await getUserById(_id);
    res.json({
      user: {
        _id,
        name: userProf.name,
        email: userProf.email,
        role: userProf.role, // ✅ role add kiya
      },
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Create New User Route
router.post("/register", async (req, res) => {
  const { name, company, address, phone, email, password, role } = req.body; // ✅ role add kiya
  try {
    const hashedPassword = await hashPassword(password);
    const newUserObject = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPassword,
      role: role || "user", // ✅ role save karo, default customer
    };
    const result = await insertUser(newUserObject);
    console.log(result);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("REQ BODY:", req.body);
    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({
        status: "error",
        message: "Invalid form submission!",
      });
    }

    // Find user
    const user = await getUserByEmail(email);

    if (!user || !user._id) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials!",
      });
    }

    // Role check
    if (user.role !== role) {
      return res.status(401).json({
        status: "error",
        message: "Invalid role selected!",
      });
    }

    // Password check
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials!",
      });
    }

    // Create tokens
    const accessJWT = await createAccessJWT(
      user.email,
      `${user._id}`,
      user.role,
    );
    const refreshJWT = await createRefreshJWT(
      user.email,
      `${user._id}`,
      user.role,
    );

    // Success response
    return res.status(200).json({
      status: "success",
      message: "Login Successfully!",
      accessJWT,
      refreshJWT,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Request Password Reset Pin
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (user && user._id) {
      const setPin = await setPasswordResetPin(email);

      if (setPin._id) {
        await emailProcessor({
          email,
          pin: setPin.pin,
          type: "request-new-password",
        });
        return res.json({
          status: "success",
          message:
            "If the email exists in our database, the password reset pin will be sent shortly",
        });
      }

      return res.json({
        status: "error",
        message:
          "Unable to process your request at the moment. Please try again later",
      });
    }

    res.json({
      status: "success",
      message:
        "If the email exists in our database, the password reset pin will be sent shortly",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Update Password
router.patch("/reset-password", updatePassReqValidation, async (req, res) => {
  try {
    const { email, pin, newPassword } = req.body;
    const getPin = await getPinByEmailPin(email, pin);

    if (getPin && getPin._id) {
      const dbDate = getPin.addedAt;
      const expiresIn = 1;
      let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
      const today = new Date();

      if (today > expDate) {
        return res.json({ status: "error", message: "Invalid or expired pin" });
      }

      const hashedPass = await hashPassword(newPassword);
      const user = await updatePassword(email, hashedPass);

      if (user && user._id) {
        await emailProcessor({ email, type: "update-password-success" });
        await deletePin(email, pin);

        return res.json({
          status: "success",
          message: "Your password has been updated",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to update your password. Please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// User Logout

router.delete("/logout", userAuthorization, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const _id = req.userId;
    const token = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : authorization;
    await deleteJWT(token); // ✅ clean token
    const result = await storeUserRefreshJWT(_id, "");
    res.json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export default router;

// Here all the routes to test the api

// Register a new User
// POST http://localhost:4000/v1/user/register

// login
// POST http://localhost:4000/v1/user/login
