import express from "express";
import { verifyRefreshJWT, createAccessJWT } from "../helper/jwtHelper.js";
import { getUserByEmail } from "../models/user/userModel.js";
import { getAdminByEmail } from "../models/admin/adminModel.js"; // ✅ admin add kiya

const router = express.Router();

router.get("/new-access-jwt", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const decoded = await verifyRefreshJWT(authorization).catch(() => null);

  if (!decoded || !decoded.email) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // 1. Pehle user mein dhundo
  let profile = await getUserByEmail(decoded.email).catch(() => null);
  let isAdmin = false;

  // 2. User nahi mila toh admin mein dhundo
  if (!profile || !profile._id) {
    profile = await getAdminByEmail(decoded.email).catch(() => null);
    isAdmin = true;
  }

  if (!profile || !profile._id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  let tokenExp = profile.refreshJWT.addedAt;
  const dbRefreshToken = profile.refreshJWT.token;

  tokenExp = tokenExp.setDate(
    tokenExp.getDate() + Number(process.env.JWT_REFRESH_SECRET_EXP_DAY),
  );
  const today = new Date();

  if (dbRefreshToken !== authorization) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (tokenExp < today) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const accessJWT = await createAccessJWT(
    decoded.email,
    profile._id.toString(),
  );

  return res.json({ status: "success", accessJWT });
});

export default router;
