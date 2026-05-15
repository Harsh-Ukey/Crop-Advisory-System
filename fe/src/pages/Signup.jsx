import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import api from "../lib/api";
import { Leaf } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Signup() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        pincode: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/signup", {
                ...formData,
                pincode: formData.pincode
            });
            navigate("/login");
        } catch (err) {
            if (err.response?.data?.errors) {
                const errorMsg = err.response.data.errors.map(e => e.message).join(", ");
                setError(errorMsg);
            } else {
                setError(err.response?.data?.message || "Signup failed");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 p-4">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-[120px] opacity-40 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full blur-[120px] opacity-40 mix-blend-multiply" />
            
            <Card className="w-full max-w-md relative z-10 border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="text-center pt-8 pb-4">
                    <Link to="/" className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 transition-colors border border-white shadow-sm">
                        <Leaf className="h-7 w-7 text-emerald-600" />
                    </Link>
                    <CardTitle className="text-2xl font-black text-stone-800 tracking-tight">{t("joinAdvisory")}</CardTitle>
                    <p className="text-sm font-medium text-stone-500">{t("createAccount")}</p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <Input
                                className="bg-white/60 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-xl"
                                placeholder={t("namePlaceholder")}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                type="email"
                                className="bg-white/60 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-xl"
                                placeholder={t("emailPlaceholder")}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Input
                                type="password"
                                className="bg-white/60 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-xl"
                                placeholder={t("passwordPlaceholder")}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <Input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                className="bg-white/60 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-xl"
                                placeholder={t("pincodePlaceholder")}
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                                required
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 break-words">{error}</p>}
                        
                        <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-6 shadow-xl shadow-emerald-200/50 transition-transform hover:-translate-y-0.5 border-none font-bold text-lg">
                            {t("signUp")}
                        </Button>
                        
                        <p className="text-center text-sm font-medium text-stone-500 pt-2">
                            {t("hasAccount")}{" "}
                            <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline underline-offset-4">
                                {t("signInLink")}
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
