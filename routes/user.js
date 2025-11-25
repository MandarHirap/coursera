const { Router } = require("express");
const userRouter = Router();
const { adminModel, UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const jwt_secret = "coursera";
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

    const { email, password, firstname, lastname } = parsed.data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, salt_rounds);

    await UserModel.create({
      email,
      password: hashedpassword,
      firstname,
      lastname,
    });

    return res.json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

userRouter.post("/signin", async function (req, res) {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "validation failed",
        errors: parsed.error.errors,
      });
    }

    const { email, password } = parsed.data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "wrong password" });
    }

    const token = jwt.sign({ id: user._id }, jwt_secret);

    return res.json({
      message: "signin success",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

userRouter.get("/purchase", function (req, res) {
  res.json("courses that you have bought");
});

module.exports = {
  userRouter,
};
