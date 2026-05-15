import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, MapPin, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import api from "../lib/api";
import { useLanguage } from "../context/LanguageContext";

export function WeatherWidget() {
    const { t } = useLanguage();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/weather")
            .then(res => setWeather(res.data))
            .catch(err => {
                console.error("Weather fetch error", err);
                let errorMessage = t("weatherUnavailable");
                if (err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                } else if (err.request) {
                    errorMessage = "Network Error: Cannot connect to server";
                }
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    }, [t]);

    if (loading) return <div className="h-[220px] animate-pulse rounded-3xl bg-gradient-to-br from-stone-200 to-stone-300 shadow-sm"></div>;

    if (error) {
        return (
            <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-none shadow-sm h-[220px] flex items-center justify-center rounded-3xl">
                <CardContent className="text-center p-6">
                    <Cloud className="h-12 w-12 text-rose-400 mx-auto mb-3 opacity-80" />
                    <p className="text-rose-800 font-bold mb-1 tracking-tight">{t("weatherUnavailable")}</p>
                    <p className="text-rose-600/80 text-sm font-medium">{error}</p>
                </CardContent>
            </Card>
        );
    }

    if (!weather) return null;

    return (
        <Card className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white border-none shadow-xl shadow-blue-900/20 relative overflow-hidden rounded-3xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-900/20 rounded-tr-full -z-10 blur-xl" />
            
            {(weather.isFallback || weather.isCached) && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-md shadow-inner border border-white/10" title={weather.isFallback ? "Estimated data due to API limits" : "Cached data"}>
                    <Info className="h-3 w-3" />
                    <span>{weather.isFallback ? t("estimated") : t("cached")}</span>
                </div>
            )}
            <CardHeader className="pb-0 pt-5 px-6">
                <div className="flex flex-col">
                    <CardTitle className="text-xl font-bold flex items-center gap-2 tracking-tight drop-shadow-md">
                        <MapPin className="h-5 w-5 opacity-90" /> {weather.name}
                    </CardTitle>
                    <span className="text-sm font-medium text-sky-100 capitalize mt-1 drop-shadow-sm">{weather.weather[0].description}</span>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
                <div className="flex items-end justify-between mt-2 relative z-10">
                    <div>
                        <div className="text-6xl font-black tracking-tighter drop-shadow-lg">{Math.round(weather.main.temp)}°</div>
                        <div className="text-sky-100 font-medium text-sm mt-1 bg-black/10 w-fit px-2 py-0.5 rounded backdrop-blur-sm">
                            H: {Math.round(weather.main.temp_max || weather.main.temp + 2)}° <span className="mx-1 opacity-50">|</span> L: {Math.round(weather.main.temp_min || weather.main.temp - 2)}°
                        </div>
                    </div>
                    <Cloud className="h-20 w-20 text-white/90 drop-shadow-xl translate-y-2 group-hover:-translate-y-1 transition-transform duration-500" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold tracking-wide">
                    <div className="flex items-center gap-2.5 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/20 shadow-inner group-hover:bg-white/15 transition-colors">
                        <Droplets className="h-4 w-4 text-sky-200" /> 
                        <div>
                            <div className="text-[10px] text-sky-200 uppercase font-black">{t("humidity")}</div>
                            <div className="text-base drop-shadow-sm">{weather.main.humidity}%</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/20 shadow-inner group-hover:bg-white/15 transition-colors">
                        <Wind className="h-4 w-4 text-sky-200" /> 
                        <div>
                            <div className="text-[10px] text-sky-200 uppercase font-black">{t("wind")}</div>
                            <div className="text-base drop-shadow-sm">{weather.wind.speed} m/s</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
