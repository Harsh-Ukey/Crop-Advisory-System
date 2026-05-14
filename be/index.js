import dotenv from "dotenv";
dotenv.config();

console.log("Environment variables loaded.");
const requiredEnvVars = ["SECRET_KEY", "MONGO_URL", "WEATHER_API_KEY", "DATA_GOV_API_KEY", "GEMINI_API_KEY"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`CRITICAL ERROR: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";


import cropRoutes from "./routes/crop.js";
import weatherRoutes from "./routes/weather.js";
import priceRoutes from "./routes/prices.js";
import geminiRoutes from "./routes/gemini.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.get("/test", (req, res) => {
  res.json({ message: "Backend is alive and healthy! 🛸" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Crop Backend API! 🚀");
});

app.use(express.json());
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin '${origin}' not allowed`));
  },
  credentials: true
}));
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply general limiter to all API routes
app.use(apiLimiter);

app.use("/crop", cropRoutes);
app.use("/weather", weatherRoutes);
app.use("/prices", priceRoutes);
app.use("/gemini", geminiRoutes);
app.use("/", authRoutes);

// Global error handler — catches any uncaught errors in routes
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "An internal server error occurred." });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
