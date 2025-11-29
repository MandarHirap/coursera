const jwt = require("jsonwebtoken");
const { admin_jwt_secret } = require("../config");

function adminmiddleware(req, res, next) {
  // Authorization header
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  // Remove "Bearer "
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, admin_jwt_secret);
    req.userId = decoded.id; // attach adminId to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = { adminmiddleware };
