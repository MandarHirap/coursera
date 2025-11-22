const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json("buy a course here");
});

courseRouter.get("/preview", function (req, res) {
  res.json("purchased courses");
});

module.exports = {
  courseRouter: courseRouter,
};
