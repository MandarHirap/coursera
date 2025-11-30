const { Router } = require("express");
const { userRouter } = require("./user");
const { CourseModel, purchasemodel } = require("../db");
const courseRouter = Router();
const { usermiddleware } = require("../middleware/user");

courseRouter.post("/purchase", usermiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchasemodel.create({
    userId,
    courseId,
  });
  res.json("You Successfully bought the course");
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find({});
  res.json({
    courses,
  });
});

courseRouter.get("/courses", usermiddleware, async function (req, res) {
  const userId = req.userId;
  const purchases = await purchasemodel.find({
    userId,
  });
  res.json({
    purchases,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
