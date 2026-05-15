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
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 font-bold text-xl text-green-700">

                        <div className="bg-green-100 p-2 rounded-lg">
                            <Leaf className="h-5 w-5" />
                        </div>
                        {t("brandName")}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-block text-sm text-stone-500">{t("welcomeUser", { name: userName })}</span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" /> {t("logout")}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {/* Top Section: Hero + Weather */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
                            {t("heroTitle1")}<span className="text-green-600">{t("heroTitle2")}</span>
                        </h1>
                        <p className="text-lg text-stone-600 max-w-xl leading-relaxed">
                            {t("heroDesc")}
                        </p>
                    </div>
                    <div className="lg:col-span-1">
                        <WeatherWidget />
                    </div>
                </section>

                <div className="my-8 border-t border-stone-200" />

                {/* Main Features Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            <footer className="mt-12 py-8 bg-white border-t border-stone-100 text-center text-stone-500 text-sm flex flex-col items-center gap-2">
                <p>© 2025 {t("brandName")}. {t("footerEmpowering")}</p>
                <Link to="/about" className="text-green-600 hover:underline">{t("aboutUs")}</Link>
            </footer>
        </div>
    );
}
