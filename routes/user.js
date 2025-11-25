const { Router } = require("express");
const userRouter = Router();
const { adminModel, UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

jwt_secret = "coursera";
const salt_rounds = 10;

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().max(50),
  lastname: z.string().max(50),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

userRouter.post("/signup", async function (req, res) {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "validation failed",
        errors: parsed.error.errors,
      });
    }
    const { email, password } = parsed.data;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedpassword = awaitbcrypt.hash(password, salt_rounds);

    await UserModel.create({
      email,
      password: hashedpassword,
    });
    returnres.json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

userRouter.post("/signin", async function (req, res) {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.errors,
    });

    const { email, password } = parsed.data;

    const usre = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isvalid = await bcrypt.compare(password, hashedpassword);
    if (!isvalid) {
      return res.status(401).json({ message: "wrong password" });
    }
  }
});

userRouter.get("/purchase", function (req, res) {
  res.json("courses that u have bought");
});

module.exports = {
  userRouter: userRouter,
};
