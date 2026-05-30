// middleware/adminOnly.js
const adminOnly = (req, res, next) => {
  const user = req.user; // yeh JWT middleware se aata hai

  if (!user) {
    return res.status(401).json({ status: "failed", message: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ status: "failed", message: "Access denied. Admins only." });
  }

  next();
};

export default adminOnly;
