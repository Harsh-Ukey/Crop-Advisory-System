import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import api from "../lib/api";
import { Leaf, Globe } from "lucide-react";
import { useLanguage, LANGUAGES } from "../context/LanguageContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { language, setLanguage, t } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/signin", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-[120px] opacity-40 mix-blend-multiply" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-[120px] opacity-40 mix-blend-multiply" />

            {/* Language Selector Component */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/5 border border-white/60 z-20 hover:bg-white/90 transition-all hover:-translate-y-0.5">
                <Globe className="h-4 w-4 text-emerald-600" />
                <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-sm font-bold text-stone-700 outline-none cursor-pointer w-full"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code} className="font-medium">
                            {lang.nativeName} ({lang.name})
                        </option>
                    ))}
                </select>
            </div>

            <Card className="w-full max-w-md relative z-10 border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="text-center pt-8 pb-4">
                    <Link to="/" className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 transition-colors border border-white shadow-sm">
                        <Leaf className="h-7 w-7 text-emerald-600" />
                    </Link>
                    <CardTitle className="text-2xl font-black text-stone-800 tracking-tight">{t("welcomeBack")}</CardTitle>
                    <p className="text-sm font-medium text-stone-500">{t("signInAccount")}</p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <Input
                                type="email"
                                className="bg-white/60 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-xl py-5"
                                placeholder={t("emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                className="bg-white/60 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-xl py-5"
                                placeholder={t("passwordPlaceholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 break-words font-medium">{error}</p>}
                        
                        <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-6 shadow-xl shadow-emerald-200/50 transition-transform hover:-translate-y-0.5 border-none font-bold text-lg">
                            {t("signInBtn")}
                        </Button>
                        
                        <p className="text-center text-sm font-medium text-stone-500 pt-2">
                            {t("noAccount")}{" "}
                            <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline underline-offset-4">
                                {t("signUp")}
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
