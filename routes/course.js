const mongoose = require("mongoose");
const { Router } = require("express");
const { CourseModel, purchasemodel } = require("../db");
const { usermiddleware } = require("../middleware/user");

const courseRouter = Router();

// BUY A COURSE
courseRouter.post("/purchase", usermiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  // 1. Validate courseId
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  // 2. Check if course exists
  const course = await CourseModel.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // 3. Save purchase
  await purchasemodel.create({
    userId,
    courseId,
  });

  return res.json({ message: "You successfully bought the course" });
});

// GET ALL COURSES (Public)
courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find({});
  return res.json({ courses });
});

// GET ALL PURCHASES OF LOGGED-IN USER
courseRouter.get("/courses", usermiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchasemodel.find({ userId });

  return res.json({ purchases });
});

// DUPLICATE /purchases (OPTIONAL)
// If you don't need it, you can delete this
courseRouter.post("/purchases", usermiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  await purchasemodel.create({ userId, courseId });

  return res.json({ message: "Purchase saved" });
});

module.exports = {
  courseRouter,
};
