import jwt from "jsonwebtoken";
import { setJWT } from "./redisHelper.js";
import { storeUserRefreshJWT } from "../models/user/userModel.js";
import { storeAdminRefreshJWT } from "../models/admin/adminModel.js";

// ================= ACCESS TOKEN =================

const createAccessJWT = async (email, _id, role = "customer") => {
  try {
    const payload = {
      email,
      _id,
      role,
    };

    const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "60m",
    });

    await setJWT(accessJWT, _id);

    return accessJWT;
  } catch (error) {
    throw error;
  }
};

// ================= REFRESH TOKEN =================

const createRefreshJWT = async (email, _id, role = "customer") => {
  try {
    const payload = {
      email,
      _id,
      role,
    };

    const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    if (role === "admin") {
      await storeAdminRefreshJWT(_id, refreshJWT);
    } else {
      await storeUserRefreshJWT(_id, refreshJWT);
    }

    await setJWT(refreshJWT, _id);

    return refreshJWT;
  } catch (error) {
    throw error;
  }
};

// ================= VERIFY ACCESS TOKEN =================

const verifyAccessJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

// ================= VERIFY REFRESH TOKEN =================

const verifyRefreshJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

export { createAccessJWT, createRefreshJWT, verifyAccessJWT, verifyRefreshJWT };
