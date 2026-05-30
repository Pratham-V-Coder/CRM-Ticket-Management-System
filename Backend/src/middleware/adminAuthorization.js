import { verifyAccessJWT } from "../helper/jwtHelper.js";

const adminAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const token = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : authorization;

    let decoded;
    try {
      decoded = await verifyAccessJWT(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded && decoded.email && decoded._id) {
      req.adminId = decoded._id;
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { adminAuthorization };
