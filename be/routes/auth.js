import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import rateLimit from "express-rate-limit";
import { User } from "../DB/db.js";
import { SignupType, SigninType } from "../types.js";
import { normalizeCity } from "../utils.js";
import middleware from "../middleware.js";

const router = express.Router();

router.get("/me", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { message: "Too many authentication attempts, please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false
});

const getLocationFromPincode = async (pincode) => {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const postOffice = response.data[0]?.PostOffice?.[0];

    if (!postOffice) {
      return { city: "", state: "" };
    }

    return {
      city: normalizeCity(postOffice.District),
      state: postOffice.State
    };
  } catch (e) {
    console.error("Pincode API Error:", e.message);
    return { city: "", state: "" };
  }
};

router.post("/signup", authLimiter, async (req, res) => {
  const parsedData = SignupType.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error.issues
    });
  }

  const { email, password, name, pincode } = parsedData.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { city, state } = await getLocationFromPincode(pincode);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
      city,
      state,
      pincode
    });
  } catch (dbError) {
    // Handle duplicate key (race condition where two requests pass findOne simultaneously)
    if (dbError.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    console.error("DB error during user creation:", dbError.message);
    return res.status(500).json({ message: "Failed to create user. Please try again." });
  }

  res.status(201).json({ message: "User created successfully" });
});

router.post("/signin", authLimiter, async (req, res) => {
  const parsedData = SigninType.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const { email, password } = parsedData.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Signin successful",
    token
  });
});

export default router;
