import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const URL = process.env.MONGO_URL;

if (!URL) {
  console.error("CRITICAL ERROR: MONGO_URL is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit if DB connection fails at startup
  });
const user = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, index: true },
  password: { type: String, required: true },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  pincode: { type: String }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

export const User = mongoose.model("users", user);