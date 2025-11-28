const { Router } = require("express");
const adminRouter = Router();
const { adminModel, CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z, parse } = require("zod");
const { admin_jwt_secret } = require("../config");
const { adminmiddleware } = require("../middleware/admin");
const course = require("./course");
const salt_rounds = 10;

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

adminRouter.post("/signup", async function (req, res) {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.errors });
    }

    const { email, password } = parsed.data;

    const exisitingAdmin = await adminModel.findOne({ email });
    if (exisitingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, salt_rounds);

    await adminModel.create({
      email,
      password: hashedpassword,
    });

    return res.json({ message: "Admin created successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.errors,
      });
    }
    const { email, password } = parsed.data;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isvalid = await bcrypt.compare(password, admin.password);
    if (!isvalid) {
      return res.status(401).json({ message: "wrong password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      admin_jwt_secret,
      {
        expiresIn: "1h",
      }
    );
    return res.json({ message: "sign in ", token });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
});

adminRouter.post("/course", adminmiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await CourseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });
  res.json({
    message: "course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", async function (req, res) {
  const { title, description, imageUrl, price } = req.body;
  const { courseId } = req.params;

  const adminId = req.adminId; // get from middleware later

  await CourseModel.updateOne(
    { _id: courseId },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  return res.json({
    message: "course updated",
    courseId: courseId,
  });
});

adminRouter.get("/course/bulk", adminmiddleware, async function (req, res) {
  const adminId = req.userId;
  const courses = await CourseModel.find({
    creatorId: adminId,
  });
  res.json({
    message: "course updated",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
