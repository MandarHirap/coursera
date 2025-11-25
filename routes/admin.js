const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const jwt_secret = "coursera";
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
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const ispasswordvalid = await bcrypt.compare(password, admin.password);
    if (!ispasswordvalid) {
      return res.status(401).json({ message: "Incorrect password " });
    }
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      jwt_secret,
      { expiresIn: "1h" }
    );
    return res.json({ message: "signed in", token });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
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
