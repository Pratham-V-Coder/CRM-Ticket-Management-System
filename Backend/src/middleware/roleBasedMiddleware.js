import jwt from "jsonwebtoken";

const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // role check

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Access Denied",
        });
      }

      req.user = {
        _id: decoded._id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or Expired Token",
      });
    }
  };
};

export default checkRole;
