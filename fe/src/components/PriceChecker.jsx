import { useState } from "react";
import { Search, MapPin, IndianRupee, Truck, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import api from "../lib/api";
import { useLanguage } from "../context/LanguageContext";

export function PriceChecker() {
    const { t } = useLanguage();
    const [crop, setCrop] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const checkPrice = async (e) => {
        e.preventDefault();
        const trimmedCrop = crop.trim();
        if (!trimmedCrop) return;
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await api.get(`/prices?crop=${encodeURIComponent(trimmedCrop)}`);
            if (res.data.message && !res.data.price) {
                setError(res.data.message);
            } else {
                setResult(res.data);
            }
        } catch {
            setError("Failed to fetch prices.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full border-none shadow-xl shadow-amber-900/5 bg-white/80 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/40 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-inner border border-white">
                        <IndianRupee className="h-7 w-7 text-amber-600" />
                    </div>
                    <CardTitle className="text-2xl font-black text-stone-800 tracking-tight">{t("priceTitle")}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={checkPrice} className="flex gap-3 mb-6 relative">
                    <Input
                        className="bg-white/60 border-amber-100 focus:border-amber-500 focus:ring-amber-500/20 shadow-sm rounded-xl py-6 pl-5 text-lg"
                        placeholder={t("pricePlaceholder")}
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                    />
                    <Button type="submit" disabled={loading} className="px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200/50 transition-transform hover:-translate-y-0.5 border-none h-auto">
                        {loading ? <span className="animate-pulse">{t("btnChecking")}</span> : <Search className="h-6 w-6" />}
                    </Button>
                </form>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100/50 shadow-sm animate-in fade-in duration-300">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-5 rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/50 shadow-sm relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 text-amber-500/10">
                                <IndianRupee className="w-24 h-24" />
                            </div>
                            <div className="flex justify-between items-start mb-3 relative z-10">
                                <div>
                                    <h4 className="font-black text-xl capitalize flex items-center gap-2 text-stone-800">
                                        {result.crop}
                                        {result.isCached && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider bg-stone-200/50 text-stone-600 px-2 py-0.5 rounded-md font-bold" title="Cached data">
                                                <Info className="h-3 w-3" /> {t("cached")}
                                            </span>
                                        )}
                                        {result.isFallback && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-bold" title="Estimated based on mock data">
                                                <Info className="h-3 w-3" /> {t("estimated")}
                                            </span>
                                        )}
                                    </h4>
                                    <p className="text-amber-700/80 font-semibold text-sm flex items-center gap-1.5 mt-1">
                                        <MapPin className="h-3.5 w-3.5" /> {result.market}, {result.district}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-amber-600 drop-shadow-sm">₹{result.price}</div>
                                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">{t("perQuintal")}</div>
                                </div>
                            </div>
                            <div className="text-xs text-stone-500 mt-4 pt-3 border-t border-amber-200/30 flex justify-between font-medium">
                                <span>{t("updated")} <span className="font-bold text-stone-700">{result.date}</span></span>
                                <span className="font-black text-stone-400 uppercase tracking-wider">{result.state}</span>
                            </div>
                        </div>
                        {result.note && (
                            <div className="flex items-start gap-3 text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-100 shadow-sm font-medium">
                                <Truck className="h-5 w-5 shrink-0 text-stone-400" />
                                {result.note}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
