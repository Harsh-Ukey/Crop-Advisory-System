import { Link } from "react-router-dom";
import {
    Leaf,
    CloudSun,
    TrendingUp,
    MessageSquare,
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { useLanguage, LANGUAGES } from "../context/LanguageContext";

export default function Landing() {
    const { t, language, setLanguage } = useLanguage();

    const features = [
        {
            icon: <Leaf className="h-8 w-8 text-emerald-500" />,
            title: t("f1Title"),
            description: t("f1Desc")
        },
        {
            icon: <CloudSun className="h-8 w-8 text-sky-500" />,
            title: t("f2Title"),
            description: t("f2Desc")
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-amber-500" />,
            title: t("f3Title"),
            description: t("f3Desc")
        },
        {
            icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
            title: t("f4Title"),
            description: t("f4Desc")
        }
    ];

    return (
        <div className="min-h-screen font-sans text-stone-900 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100/50 selection:bg-emerald-200">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-sm">
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    <div className="flex items-center gap-2 text-2xl font-extrabold text-emerald-800 tracking-tight">
                        <Leaf className="h-8 w-8 text-emerald-600" />
                        <span>{t("brandName")}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 font-medium">
                        <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                            <Globe className="h-4 w-4 text-emerald-600" />
                            <select 
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-transparent text-sm font-semibold text-emerald-900 outline-none cursor-pointer w-full"
                            >
                                {LANGUAGES.map(lang => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.nativeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <a href="#features" className="hover:text-emerald-600 transition-colors">{t("navFeatures")}</a>
                        <Link to="/about" className="hover:text-emerald-600 transition-colors">{t("navAbout")}</Link>
                        <Link to="/login">
                            <Button variant="ghost" className="text-stone-700 hover:text-emerald-800 hover:bg-emerald-100/50">{t("navLogin")}</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200 px-6 rounded-full border-none">{t("navSignUp")}</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-emerald-200/40 rounded-l-[100px] blur-3xl opacity-60 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-2/3 bg-teal-200/30 rounded-r-full blur-3xl opacity-50 -translate-x-1/4" />
                
                <div className="container mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/80 backdrop-blur-sm text-emerald-800 rounded-full text-sm font-bold shadow-sm border border-emerald-200/50">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            {t("heroBadge")}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-stone-900 drop-shadow-sm">
                            {t("heroTitle1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{t("heroTitle2")}</span>{t("heroTitle3")}
                        </h1>
                        <p className="text-xl text-stone-600/90 max-w-xl leading-relaxed font-medium">
                            {t("heroDesc")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/signup">
                                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full px-10 py-7 text-lg h-auto flex items-center gap-2 shadow-xl shadow-emerald-200/50 transition-transform hover:-translate-y-1 border-none">
                                    {t("ctaGetStarted")} <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg" className="border-emerald-200/60 bg-white/50 backdrop-blur-sm hover:bg-white/80 rounded-full px-10 py-7 text-lg h-auto text-emerald-800 font-semibold shadow-sm transition-transform hover:-translate-y-1">
                                    {t("ctaViewDemo")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative group animate-in fade-in scale-in-95 duration-1000">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-300 to-amber-200 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="relative bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-4 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200"
                                alt="Farmer using technology"
                                className="rounded-3xl w-full h-[450px] object-cover shadow-inner"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-stone-900">{t("featuresTitle")}</h2>
                        <p className="text-lg text-stone-600 leading-relaxed font-medium">
                            {t("featuresDesc")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="border border-white/60 bg-white/60 backdrop-blur-lg shadow-xl shadow-emerald-100/40 hover:shadow-2xl hover:shadow-emerald-200/60 hover:-translate-y-2 transition-all duration-300 rounded-[2rem] overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardContent className="p-8 space-y-4">
                                    <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-800">{feature.title}</h3>
                                    <p className="text-stone-500 leading-relaxed font-medium">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative z-10 px-4 md:px-0">
                <div className="container mx-auto">
                    <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-900/40 border border-emerald-800/50">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
                        
                        <div className="relative z-10">
                            <div className="inline-flex p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/10 shadow-inner">
                                <Zap className="h-10 w-10 text-amber-400 drop-shadow-md animate-pulse" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-sm">{t("readyTitle")}</h2>
                            <p className="text-xl text-emerald-100/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                                {t("readyDesc")}
                            </p>
                            <Link to="/signup">
                                <Button size="lg" className="bg-white text-emerald-900 hover:bg-stone-50 rounded-full px-12 py-8 text-xl h-auto font-black shadow-xl shadow-emerald-950/50 hover:shadow-2xl transition-all hover:-translate-y-1">
                                    {t("readyBtn")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-emerald-200/50 bg-white/40 backdrop-blur-sm relative z-10">
                <div className="container mx-auto px-6 text-center text-emerald-900/60 font-semibold">
                    <p>{t("footerMadeWith")} © 2025 {t("brandName")}</p>
                </div>
            </footer>
        </div>
    );
}
