import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSelector() {
    const { language, setLanguage, LANGUAGES } = useLanguage();

    return (
        <div className="relative inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm hover:border-emerald-300 transition-colors">
            <Globe className="h-4 w-4 text-emerald-600 shrink-0" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold text-stone-700 focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-stone-800 bg-white font-medium py-1">
                        {lang.nativeName} ({lang.name})
                    </option>
                ))}
            </select>
        </div>
    );
}
