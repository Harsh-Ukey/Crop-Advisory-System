import express from "express";
import axios from "axios";
import middleware from "../middleware.js";
import { User } from "../DB/db.js";
import { normalizeCity } from "../utils.js";
import { getCache, setCache } from "../cache.js";

const router = express.Router();

if (!process.env.WEATHER_API_KEY) {
  console.error("CRITICAL ERROR: WEATHER_API_KEY is not defined.");
  process.exit(1);
}


router.get("/", middleware, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.city) {
      return res.status(400).json({ message: "Location not set. Please update your profile." });
    }

    const city = normalizeCity(user.city);
    const cacheKey = `weather_${city}_${user.state}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for ${cacheKey}`);
      return res.json({ ...cachedData, isCached: true });
    }

    console.log(`Fetching weather for: '${city}' (original: '${user.city}')`);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: `${city},${user.state},IN`,
            units: 'metric',
            appid: process.env.WEATHER_API_KEY
          }
        }
      );
      setCache(cacheKey, response.data, 900); // Cache for 15 minutes
      return res.json(response.data);
    } catch (apiError) {
      console.warn("Retrying weather with city only...");
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              units: 'metric',
              appid: process.env.WEATHER_API_KEY
            }
          }
        );
        setCache(cacheKey, response.data, 900);
        return res.json(response.data);
      } catch (innerError) {
        console.warn(`Weather API completely failed for ${city}.`);
        if (process.env.NODE_ENV === 'development') {
          console.log("Using fallback data due to development environment.");
          const fallbackData = {
            weather: [{ main: "Clear", description: "API Limit Reached (Mock Data)", icon: "01d" }],
            main: { temp: 30, feels_like: 32, humidity: 60, pressure: 1010 },
            wind: { speed: 4.5 },
            name: user.city || city,
            sys: { country: "IN" },
            isFallback: true
          };
          setCache(cacheKey, fallbackData, 900);
          return res.json(fallbackData);
        } else {
          return res.status(503).json({ message: "Live weather data is currently unavailable." });
        }
      }
    }

  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    if (error.response?.status === 404 && user) {
      return res.status(404).json({ message: `Location '${user.city}' not found by weather provider` });
    }
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

export default router;
