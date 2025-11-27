const jwt = require("jsonwebtoken");
const { admin_jwt_secret_jwt_secret } = require("../config");
const { adminRouter } = require("../routes/admin");

function adminmiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, user_jwt_secret);

  if (decoded) {
    req.adminId = decodedId;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in as an admin",
    });
  }
}

module.exports = {
  adminmiddleware: adminmiddleware,
};
