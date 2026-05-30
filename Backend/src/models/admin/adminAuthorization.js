import { verifyAccessJWT } from "../helper/jwtHelper.js";
import { getJWT } from "../helper/redisHelper.js";
import { getAdminById } from "../models/admin/adminModel.js";

const adminAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  // 1. Verify JWT is valid
  const token = authorization.split(" ")[1];

  const decoded = await verifyAccessJWT(token).catch(() => null);

  if (!decoded || !decoded.email) {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  // 2. Check if JWT exists in redis
  const adminId = await getJWT(token).catch(() => null);

  if (!adminId) {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  // 3. Check admin exists in database
  const admin = await getAdminById(adminId).catch(() => null);

  if (!admin || !admin._id) {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  // 4. Check role is admin
  if (admin.role !== "admin") {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  // 5. Attach adminId to request
  req.adminId = adminId;

  return next();
};

export { adminAuthorization };
