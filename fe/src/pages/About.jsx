import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Users, Leaf } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
    const { t } = useLanguage();
    
    const team = [
        { name: "Jatin", role: "Lead Developer", quote: "Innovating for farmers." },
        { name: "Harsh", role: "DevOps Engineer", quote: "Deploying dreams, one pipeline at a time." }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-100 font-sans">
            {/* Header for navigation back */}
            <header className="sticky top-0 z-50 w-full border-b border-emerald-100/50 bg-white/70 backdrop-blur-xl shadow-sm">
                <div className="container mx-auto flex h-16 items-center px-4">
                    <Link to="/" className="flex items-center text-stone-600 hover:text-emerald-700 transition-colors font-semibold">
                        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16 max-w-4xl relative">
                <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200/50 rounded-full blur-[80px] -z-10" />
                <div className="absolute top-40 right-10 w-64 h-64 bg-teal-200/50 rounded-full blur-[80px] -z-10" />

                <section className="text-center mb-20 space-y-6">
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl mb-4 shadow-sm border border-emerald-200">
                        <Leaf className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight drop-shadow-sm">
                        {t("aboutHeroTitle1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{t("aboutHeroTitle2")}</span>
                    </h1>
                    <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t("aboutHeroDesc")}
                    </p>
                </section>

                {/* Team Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-10 justify-center">
                        <Users className="h-8 w-8 text-emerald-500" />
                        <h2 className="text-3xl font-bold text-stone-800">{t("meetTeam")}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {team.map((member, idx) => (
                            <Card key={idx} className="text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/60 bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden group">
                                <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardContent className="pt-10 pb-10">
                                    <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black text-stone-400 shadow-inner">
                                        {member.name[0]}
                                    </div>
                                    <h3 className="text-2xl font-black text-stone-900 tracking-tight">{member.name}</h3>
                                    <p className="text-emerald-600 font-bold text-sm mb-4 tracking-wide uppercase mt-1">{member.role}</p>
                                    <p className="text-stone-500 text-sm italic font-medium">"{member.quote}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="text-center bg-gradient-to-br from-stone-900 to-stone-800 text-stone-50 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-[60px]" />
                    <Mail className="h-12 w-12 mx-auto text-amber-400 mb-6 drop-shadow-md" />
                    <h2 className="text-4xl font-bold mb-4">{t("getInTouch")}</h2>
                    <p className="text-stone-300 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                        {t("getInTouchDesc")}
                    </p>
                    <a href="mailto:yshake1004@gmail.com">
                        <Button size="lg" className="bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 hover:from-amber-300 hover:to-amber-400 font-bold px-10 py-7 rounded-full text-lg shadow-xl shadow-amber-900/50 transition-transform hover:-translate-y-1 border-none">
                            {t("sendEmailBtn")}
                        </Button>
                    </a>
                </section>

                <footer className="mt-16 text-center text-stone-400 font-medium">
                    <p>{t("footerMadeWith")} © 2025 {t("brandName")}</p>
                </footer>
            </main>
        </div>
    );
}
