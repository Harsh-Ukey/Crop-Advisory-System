import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Leaf } from "lucide-react";
import { Button } from "../components/ui/Button";
import { WeatherWidget } from "../components/WeatherWidget";
import { Advisory } from "../components/Advisory";
import { PriceChecker } from "../components/PriceChecker";
import { ChatBot } from "../components/ChatBot";
import api from "../lib/api";
import { useLanguage } from "../context/LanguageContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("Farmer");
    const { t } = useLanguage();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                setUserName(res.data.name.split(" ")[0] || res.data.name);
            } catch {
                console.error("Failed to fetch user or token expired");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans relative overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-100/50 to-transparent -z-10" />
            
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-emerald-100/50 bg-white/70 backdrop-blur-xl shadow-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-3 font-black text-xl text-stone-800 tracking-tight drop-shadow-sm">
                        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2 rounded-xl shadow-inner border border-emerald-300">
                            <Leaf className="h-5 w-5 text-white drop-shadow-sm" />
                        </div>
                        {t("brandName")}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-block text-sm font-bold text-stone-600 bg-stone-100/80 px-3 py-1.5 rounded-full border border-stone-200/60 shadow-inner">
                            {t("welcomeUser", { name: userName })}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors">
                            <LogOut className="h-4 w-4 mr-2" /> {t("logout")}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10 space-y-10 relative">
                <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-[80px] -z-10" />
                <div className="absolute bottom-40 left-10 w-64 h-64 bg-teal-200/30 rounded-full blur-[80px] -z-10" />

                {/* Top Section: Hero + Weather */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center animate-in slide-in-from-left-8 fade-in duration-700">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight drop-shadow-sm leading-tight">
                            {t("heroTitle1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{t("heroTitle2")}</span>
                        </h1>
                        <p className="text-lg text-stone-600 max-w-xl leading-relaxed font-medium">
                            {t("heroDesc")}
                        </p>
                    </div>
                    <div className="lg:col-span-1 animate-in slide-in-from-right-8 fade-in duration-700">
                        <WeatherWidget />
                    </div>
                </section>

                <div className="my-10 border-t border-emerald-100/50" />

                {/* Main Features Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-12 fade-in duration-1000">
                    {/* Advisory takes up 2 columns */}
                    <div className="lg:col-span-2">
                        <Advisory />
                    </div>

                    {/* Price Checker on the side */}
                    <div className="lg:col-span-1">
                        <PriceChecker />
                    </div>
                </section>

                <ChatBot />
            </main>

            <footer className="mt-16 py-8 bg-white/80 backdrop-blur-md border-t border-emerald-100/50 text-center text-stone-500 text-sm flex flex-col items-center gap-3 relative z-10">
                <p className="font-medium text-stone-600">© 2025 <span className="font-bold text-stone-800">{t("brandName")}</span>. {t("footerEmpowering")}</p>
                <Link to="/about" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-colors">{t("aboutUs")}</Link>
            </footer>
        </div>
    );
}
