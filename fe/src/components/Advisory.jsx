import { useState } from "react";
import { Sprout, Droplets, Sun, Ruler, Calculator, Calendar, ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Lightbulb, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import api from "../lib/api";
import { useLanguage } from "../context/LanguageContext";

export function Advisory() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        soil: "Loamy",
        water: "Medium",
        season: "Rabi",
        landArea: "1"
    });
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prices, setPrices] = useState({});
    const [expandedCrop, setExpandedCrop] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getRecommendations = async () => {
        setLoading(true);
        try {
            const res = await api.post("/crop/recommend", formData);
            setRecommendations(res.data);
            res.data.forEach(crop => fetchEstimatedPrice(crop.crop));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEstimatedPrice = async (cropName) => {
        if (prices[cropName]) return;
        try {
            const res = await api.get(`/prices?crop=${cropName}`);
            if (res.data.price) {
                setPrices(prev => ({ ...prev, [cropName]: res.data.price }));
            }
        } catch {
            // ignore
        }
    };

    const calculateProfit = (crop) => {
        const yieldPerAcre = crop.avgYield;
        const area = parseFloat(formData.landArea) || 1;
        const price = prices[crop.crop];

        if (!price) return null;
        const grossIncome = yieldPerAcre * area * price;
        return `₹${grossIncome.toLocaleString()}`;
    };

    const toggleExpand = (cropName) => {
        setExpandedCrop(expandedCrop === cropName ? null : cropName);
    };

    return (
        <div className="space-y-8">
            <Card className="border-none shadow-xl shadow-emerald-900/5 bg-white/80 backdrop-blur-xl overflow-hidden relative">
                <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl shadow-inner border border-white">
                            <Sprout className="h-7 w-7 text-emerald-600" />
                        </div>
                        <CardTitle className="text-2xl font-black text-stone-800 tracking-tight">{t("advTitle")}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2 relative group">
                            <label className="text-sm font-bold text-stone-600 flex items-center gap-2"><Sun className="h-4 w-4 text-amber-500" /> {t("lblSeason")}</label>
                            <select name="season" className="w-full p-3 rounded-xl border-emerald-100 bg-white/60 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all group-hover:bg-white" onChange={handleChange} value={formData.season}>
                                <option value="Rabi">{t("optRabi")}</option>
                                <option value="Kharif">{t("optKharif")}</option>
                                <option value="Zaid">{t("optZaid")}</option>
                            </select>
                        </div>
                        <div className="space-y-2 relative group">
                            <label className="text-sm font-bold text-stone-600 flex items-center gap-2"><Ruler className="h-4 w-4 text-amber-700" /> {t("lblSoil")}</label>
                            <select name="soil" className="w-full p-3 rounded-xl border-emerald-100 bg-white/60 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all group-hover:bg-white" onChange={handleChange} value={formData.soil}>
                                <option value="Loamy">{t("optLoamy")}</option>
                                <option value="Clay">{t("optClay")}</option>
                                <option value="Sandy">{t("optSandy")}</option>
                                <option value="Black Soil">{t("optBlack")}</option>
                            </select>
                        </div>
                        <div className="space-y-2 relative group">
                            <label className="text-sm font-bold text-stone-600 flex items-center gap-2"><Droplets className="h-4 w-4 text-sky-500" /> {t("lblWater")}</label>
                            <select name="water" className="w-full p-3 rounded-xl border-emerald-100 bg-white/60 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all group-hover:bg-white" onChange={handleChange} value={formData.water}>
                                <option value="Low">{t("optLow")}</option>
                                <option value="Medium">{t("optMedium")}</option>
                                <option value="High">{t("optHigh")}</option>
                            </select>
                        </div>
                        <div className="space-y-2 relative group">
                            <label className="text-sm font-bold text-stone-600 flex items-center gap-2"><Ruler className="h-4 w-4 text-emerald-600" /> {t("lblLand")}</label>
                            <Input type="number" name="landArea" value={formData.landArea} onChange={handleChange} className="p-3 rounded-xl border-emerald-100 bg-white/60 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all group-hover:bg-white" />
                        </div>
                    </div>
                    <Button onClick={getRecommendations} className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-6 font-bold text-lg shadow-xl shadow-emerald-200/50 transition-transform hover:-translate-y-0.5 border-none" size="lg" disabled={loading}>
                        {loading ? t("btnAnalyzing") : t("btnGetRec")}
                    </Button>
                </CardContent>
            </Card>

            {recommendations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-12 fade-in duration-700 pb-10">
                    {recommendations.map((item, idx) => (
                        <Card key={idx} className={`overflow-hidden border-none shadow-lg shadow-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-3xl ${expandedCrop === item.crop ? 'md:col-span-2 md:row-span-2 ring-2 ring-emerald-500/30' : ''}`}>
                            <div className={`h-2 w-full bg-gradient-to-r ${item.score >= 5 ? 'from-emerald-400 to-teal-400' : 'from-teal-300 to-cyan-300'}`} />
                            <CardContent className="pt-6 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-3xl font-black text-stone-800 tracking-tight">{item.crop}</h3>
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${item.score >= 5 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-teal-50 text-teal-700 border-teal-100'}`}>
                                            {item.score >= 5 ? t("bestMatch") : t("goodMatch")}
                                        </span>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-sm border-b border-stone-100 pb-3">
                                            <span className="text-stone-500 font-medium">{t("expYield")}</span>
                                            <span className="font-bold text-stone-700">{item.avgYield} {t("qPerAcre")}</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-b border-stone-100 pb-3">
                                            <span className="text-stone-500 font-medium">{t("lblSeason")}</span>
                                            <span className="font-bold text-stone-700">{item.season}</span>
                                        </div>
                                    </div>

                                    {calculateProfit(item) ? (
                                        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-100/60 mb-6 shadow-sm">
                                            <div className="flex items-center gap-2 text-amber-700 mb-1">
                                                <Calculator className="h-4 w-4" />
                                                <span className="text-xs font-black uppercase tracking-wider">{t("estRevenue")}</span>
                                            </div>
                                            <div className="text-3xl font-black text-stone-800 mt-1">{calculateProfit(item)}</div>
                                            <div className="text-xs font-medium text-stone-400 mt-2">{t("basedOnMarket")}</div>
                                        </div>
                                    ) : (
                                        <div className="mb-6 bg-stone-50 border border-stone-100 p-4 rounded-2xl text-xs text-center text-stone-400 italic font-medium">
                                            {t("marketUnavailable")}
                                        </div>
                                    )}
                                </div>

                                {/* Fertilizer Section Toggle */}
                                <div className="mt-auto">
                                    {expandedCrop === item.crop && (
                                        <div className="mt-4 pt-6 border-t border-stone-100 animate-in fade-in duration-300 space-y-8">

                                            {/* Quick Stats Grid */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-stone-50 border border-stone-100 p-4 rounded-2xl shadow-sm">
                                                    <div className="flex items-center gap-1.5 text-xs font-black text-stone-500 uppercase tracking-wide mb-2">
                                                        <TrendingUp className="h-3 w-3" /> {t("demand")}
                                                    </div>
                                                    <div className="text-base font-bold text-stone-700">{item.marketDemand || "Stable"}</div>
                                                </div>
                                                <div className="bg-red-50/50 border border-red-100 p-4 rounded-2xl shadow-sm">
                                                    <div className="flex items-center gap-1.5 text-xs font-black text-red-500 uppercase tracking-wide mb-2">
                                                        <AlertTriangle className="h-3 w-3" /> {t("risk")}
                                                    </div>
                                                    <div className="text-base font-bold text-stone-700">{item.riskFactor || "Low"}</div>
                                                </div>
                                            </div>

                                            {/* Intercropping */}
                                            {item.intercropping && (
                                                <div>
                                                    <h4 className="font-bold text-stone-700 flex items-center gap-2 mb-3 text-sm tracking-tight">
                                                        <Users className="h-4 w-4 text-sky-500" /> {t("companionCrops")}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.intercropping.map((c, i) => (
                                                            <span key={i} className="px-3 py-1.5 bg-sky-50 text-sky-700 text-xs font-bold rounded-lg border border-sky-100 shadow-sm">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Fertilizer Schedule */}
                                            {item.fertilizers && (
                                                <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/50">
                                                    <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-5 tracking-tight">
                                                        <Calendar className="h-5 w-5" /> {t("fertSchedule")}
                                                    </h4>
                                                    <div className="relative pl-5 border-l-2 border-emerald-200 space-y-6">
                                                        {item.fertilizers.map((fert, fIdx) => (
                                                            <div key={fIdx} className="relative">
                                                                <div className="absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-[3px] border-white shadow-sm"></div>
                                                                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">{fert.when}</p>
                                                                <p className="text-sm font-bold text-stone-800 mt-1">
                                                                    {fert.name} <span className="text-stone-400 font-medium mx-1">—</span> <span className="text-emerald-700 bg-emerald-100/50 px-1.5 py-0.5 rounded text-xs">{fert.quantity}</span>
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Pro Tip */}
                                            {item.proTip && (
                                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 p-5 rounded-2xl flex gap-4 shadow-sm">
                                                    <div className="p-2 bg-indigo-100/50 rounded-xl h-fit">
                                                        <Lightbulb className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-xs font-black text-indigo-800 uppercase tracking-wider mb-2">{t("expertTip")}</h5>
                                                        <p className="text-sm text-indigo-900 leading-relaxed font-semibold italic">
                                                            "{item.proTip}"
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <Button
                                        variant="ghost"
                                        className={`w-full mt-4 font-bold border ${expandedCrop === item.crop ? 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100' : 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100'}`}
                                        onClick={() => toggleExpand(item.crop)}
                                    >
                                        {expandedCrop === item.crop ? (
                                            <span className="flex items-center">{t("hideDetails")} <ChevronUp className="ml-2 h-4 w-4" /></span>
                                        ) : (
                                            <span className="flex items-center">{t("viewFullGuide")} <ChevronDown className="ml-2 h-4 w-4" /></span>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
