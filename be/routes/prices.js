import express from "express";
import axios from "axios";
import middleware from "../middleware.js";
import { User } from "../DB/db.js";
import { normalizeCity } from "../utils.js";
import { getCache, setCache } from "../cache.js";

const router = express.Router();

if (!process.env.DATA_GOV_API_KEY) {
    console.error("CRITICAL ERROR: DATA_GOV_API_KEY is not defined.");
    process.exit(1);
}


router.get("/", middleware, async (req, res) => {
    const { crop } = req.query;

    if (!crop) {
        return res.status(400).json({ message: "Crop required" });
    }

    const user = await User.findById(req.userId);

    if (!user?.city || !user?.state) {
        return res.status(400).json({ message: "User location incomplete" });
    }

    const cacheKey = `prices_${crop.toLowerCase()}_${user.state}_${user.city}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.json({ ...cachedData, isCached: true });
    }

    try {
        const getCommodityAliases = (crop) => {
            const lower = crop.toLowerCase();
            if (lower === "rice") {
                return ["Rice", "Paddy(Dhan)(Common)", "Paddy(Dhan)(Basmati)", "Paddy(Dhan)"];
            }
            if (lower === "wheat") {
                return ["Wheat", "Wheat(Husked)", "Wheat(Mexican)"];
            }
            return [crop.charAt(0).toUpperCase() + crop.slice(1)];
        };

        const aliases = getCommodityAliases(crop);

       
        const fetchPrices = async (filterObj) => {
            try {
                console.log("Fetching with filters:", filterObj);
                const params = {
                    "api-key": process.env.DATA_GOV_API_KEY,
                    format: "json",
                    limit: 10,
                    ...filterObj
                };

                const response = await axios.get(
                    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
                    { params }
                );
                return response.data.records || [];
            } catch (e) {
                console.error("Fetch attempt failed:", e.message);
                if (process.env.NODE_ENV === 'development') {
                    console.log("Using mock data due to API failure");
                    const commodity = filterObj["filters[commodity]"] || "Unknown";
                    const state = filterObj["filters[state]"] || "Unknown";
                    const district = filterObj["filters[district]"] || "Local";
                    
                    return [{
                        commodity: commodity,
                        state: state,
                        district: district,
                        market: district + " Main Mandi",
                        modal_price: Math.floor(Math.random() * 2000) + 1500,
                        arrival_date: new Date().toLocaleDateString("en-GB"),
                        isFallback: true
                    }];
                } else {
                    throw new Error("Live data unavailable");
                }
            }
        };

        const getCoordinates = async (location) => {
            try {
                const normalizedLocation = normalizeCity(location);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather`,
                    {
                        params: {
                            q: normalizedLocation,
                            appid: process.env.WEATHER_API_KEY
                        }
                    }
                );
                return response.data.coord;
            } catch (e) {
                console.warn(`Could not get coordinates for ${location}: ${e.message}`);
                return null;
            }
        };

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        let record = null;
        let fallbackRecord = null;

        for (const commodity of aliases) {
            let records = await fetchPrices({
                "filters[commodity]": commodity,
                "filters[state]": user.state,
                "filters[district]": user.city
            });

            if (records.length > 0) {
                record = records[0];
                break;
            }

            records = await fetchPrices({
                "filters[commodity]": commodity,
                "filters[state]": user.state,
                limit: 30
            });

            if (records.length > 0) {
                const userCoords = await getCoordinates(`${user.city}, ${user.state}`);

                if (userCoords) {
                    const uniqueDistricts = [...new Set(records.map(r => r.district))];
                    const districtCoordsMap = {};

                    // Limit to top 5 districts for faster response
                    for (const district of uniqueDistricts.slice(0, 5)) {
                        const coords = await getCoordinates(`${district}, ${user.state}`);
                        if (coords) districtCoordsMap[district] = coords;
                    }

                    records.sort((a, b) => {
                        const coordsA = districtCoordsMap[a.district];
                        const coordsB = districtCoordsMap[b.district];

                        if (!coordsA) return 1;
                        if (!coordsB) return -1;

                        const distA = calculateDistance(userCoords.lat, userCoords.lon, coordsA.lat, coordsA.lon);
                        const distB = calculateDistance(userCoords.lat, userCoords.lon, coordsB.lat, coordsB.lon);

                        return distA - distB;
                    });
                }

                record = records[0];
                break;
            }

            records = await fetchPrices({
                "filters[commodity]": commodity,
                limit: 20
            });

            if (records.length > 0) {
                const stateMatch = records.find(r => r.state.toLowerCase() === user.state.toLowerCase());
                if (stateMatch) {
                    record = stateMatch;
                    break;
                }

                if (!fallbackRecord) {
                    fallbackRecord = records[0];
                }
            }
        }

        if (record) {
            const responseData = {
                crop: record.commodity,
                market: record.market,
                district: record.district,
                state: record.state,
                price: record.modal_price,
                unit: "₹ / quintal",
                date: record.arrival_date,
                note: record.district.toLowerCase() !== user.city.toLowerCase() || record.state.toLowerCase() !== user.state.toLowerCase()
                    ? `Price from ${record.district}, ${record.state} (nearest available)`
                    : undefined,
                isFallback: record.isFallback
            };
            setCache(cacheKey, responseData, 3600); // Cache for 1 hour
            res.json(responseData);
            return;
        }

        if (fallbackRecord) {
            const responseData = {
                crop: fallbackRecord.commodity,
                market: fallbackRecord.market,
                district: fallbackRecord.district,
                state: fallbackRecord.state,
                price: fallbackRecord.modal_price,
                unit: "₹ / quintal",
                date: fallbackRecord.arrival_date,
                note: `Price from ${fallbackRecord.district}, ${fallbackRecord.state} (global fallback)`,
                isFallback: fallbackRecord.isFallback
            };
            setCache(cacheKey, responseData, 3600);
            res.json(responseData);
            return;
        }

        return res.json({ message: `No price data found for ${crop}` });

    } catch (error) {
        console.error("Price fetch error:", error.response?.data || error.message);
        if (error.message === "Live data unavailable") {
            return res.status(503).json({ message: "Live mandi prices data is currently unavailable." });
        }
        res.status(500).json({ message: "Failed to fetch mandi prices" });
    }
});

export default router;
