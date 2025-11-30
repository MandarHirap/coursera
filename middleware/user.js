const jwt = require("jsonwebtoken");
const { user_jwt_secret } = require("../config");

function usermiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]; // standard place

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  // Expecting:  Authorization: Bearer <token>
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, user_jwt_secret);
    req.userId = decoded.id; // <-- THIS IS CORRECT
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = { usermiddleware };
