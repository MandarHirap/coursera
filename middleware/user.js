const jwt = require("jsonwebtoken");
const { user_jwt_secret } = require("../config");

function usermiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, user_jwt_secret);

  if (decoded) {
    req.userId = decodedId;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
}

module.exports = {
  usermiddleware: usermiddleware,
};
