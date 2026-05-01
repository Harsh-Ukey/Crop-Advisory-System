import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, MapPin, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import api from "../lib/api";

export function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/weather")
            .then(res => setWeather(res.data))
            .catch(err => {
                console.error("Weather fetch error", err);
                let errorMessage = "Failed to load weather data";
                if (err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                } else if (err.request) {
                    errorMessage = "Network Error: Cannot connect to server";
                }
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="h-48 animate-pulse rounded-xl bg-stone-200"></div>;

    if (error) {
        return (
            <Card className="bg-red-50 border-red-200 shadow-sm h-48 flex items-center justify-center">
                <CardContent className="text-center p-6">
                    <Cloud className="h-12 w-12 text-red-400 mx-auto mb-2" />
                    <p className="text-red-700 font-medium mb-1">Weather Unavailable</p>
                    <p className="text-red-500 text-sm">{error}</p>
                </CardContent>
            </Card>
        );
    }

    if (!weather) return null;

    return (
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg relative">
            {(weather.isFallback || weather.isCached) && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-black/20 px-2 py-1 rounded-full backdrop-blur-md" title={weather.isFallback ? "Estimated data due to API limits" : "Cached data"}>
                    <Info className="h-3 w-3" />
                    <span>{weather.isFallback ? "Estimated" : "Cached"}</span>
                </div>
            )}
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5" /> {weather.name}
                    </CardTitle>
                    <span className="text-sm opacity-90 capitalize mt-4">{weather.weather[0].description}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between mt-2">
                    <div>
                        <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°</div>
                        <div className="text-blue-100 mt-1">
                            H: {Math.round(weather.main.temp_max || weather.main.temp + 2)}° L: {Math.round(weather.main.temp_min || weather.main.temp - 2)}°
                        </div>
                    </div>
                    <Cloud className="h-16 w-16 opacity-80" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2 rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <Droplets className="h-4 w-4" /> Humidity: {weather.main.humidity}%
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <Wind className="h-4 w-4" /> Wind: {weather.wind.speed} m/s
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
