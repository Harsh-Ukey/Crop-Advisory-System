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
        <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4 relative">
            {/* Language Selector Component */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-stone-200 z-10 hover:shadow-md transition-shadow">
                <Globe className="h-4 w-4 text-green-600" />
                <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-sm font-medium text-stone-700 outline-none cursor-pointer w-full"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>
                            {lang.nativeName} ({lang.name})
                        </option>
                    ))}
                </select>
            </div>

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <Link to="/" className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors border border-green-100">
                        <Leaf className="h-6 w-6 text-green-700" />
                    </Link>
                    <CardTitle>{t("welcomeBack")}</CardTitle>
                    <p className="text-sm text-stone-500">{t("signInAccount")}</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder={t("passwordPlaceholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">
                            {t("signInBtn")}
                        </Button>
                        <p className="text-center text-sm text-stone-500">
                            {t("noAccount")}{" "}
                            <Link to="/signup" className="text-green-600 hover:underline">
                                {t("signUp")}
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
