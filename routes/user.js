const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json("created user successfully");
});

userRouter.post("/signin", function (req, res) {
  res.json("you are signed in");
});

userRouter.get("/purchase", function (req, res) {
  res.json("courses that u have bought");
});

module.exports = {
  userRouter: userRouter,
};
