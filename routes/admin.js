const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
adminRouter.post("/signup", function (req, res) {
  res.json("created user successfully");
});

adminRouter.post("/signin", function (req, res) {
  res.json("you are signed in");
});

adminRouter.post("/course", function (req, res) {
  res.json("you are signed in");
});

adminRouter.put("/course", function (req, res) {
  res.json("you are signed in");
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json("you are signed in");
});

module.exports = {
  adminRouter: adminRouter,
};
