/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "ur", name: "Urdu", nativeName: "اردو" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
    { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
    { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
    { code: "mai", name: "Maithili", nativeName: "मैथिली" },
    { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ" },
    { code: "ks", name: "Kashmiri", nativeName: "کٲشُر" },
    { code: "ne", name: "Nepali", nativeName: "नेपाली" },
    { code: "sd", name: "Sindhi", nativeName: "سنڌي" },
    { code: "doi", name: "Dogri", nativeName: "डोगरी" },
    { code: "kok", name: "Konkani", nativeName: "कोंकणी" },
    { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্" },
    { code: "bo", name: "Bodo", nativeName: "बड़ो" },
    { code: "sa", name: "Sanskrit", nativeName: "संस्कृत" }
];

const translations = {
    en: {
        welcomeBack: "Welcome Back",
        signInAccount: "Sign in to your account",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        signInBtn: "Sign In",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
        selectLanguage: "Select Language",
        brandName: "Kisan Sahayak",
        welcomeUser: "Welcome, {name}",
        logout: "Logout",
        heroTitle1: "Smart Farming for a ",
        heroTitle2: "Better Future",
        heroDesc: "Get real-time weather updates, crop recommendations, and live mandi prices to maximize your profits.",
        footerEmpowering: "Empowering Farmers.",
        aboutUs: "About Us",
        botGreeting: "Namaste! I am Kisan Sahayak AI. Ask me anything about your crops.",
        botPlaceholder: "Ask about fertilizer, pests..."
    },
    hi: {
        welcomeBack: "वापसी पर स्वागत है",
        signInAccount: "अपने खाते में साइन इन करें",
        emailPlaceholder: "ईमेल",
        passwordPlaceholder: "पासवर्ड",
        signInBtn: "साइन इन करें",
        noAccount: "क्या आपके पास खाता नहीं है?",
        signUp: "साइन अप करें",
        selectLanguage: "भाषा चुनें",
        brandName: "किसान सहायक",
        welcomeUser: "स्वागत है, {name}",
        logout: "लॉग आउट",
        heroTitle1: "बेहतर भविष्य के लिए ",
        heroTitle2: "स्मार्ट खेती",
        heroDesc: "अपने मुनाफे को अधिकतम करने के लिए वास्तविक समय के मौसम अपडेट, फसल की सिफारिशें और लाइव मंडी मूल्य प्राप्त करें।",
        footerEmpowering: "किसानों को सशक्त बनाना।",
        aboutUs: "हमारे बारे में",
        botGreeting: "नमस्ते! मैं किसान सहायक एआई हूं। मुझसे अपनी फसलों के बारे में कुछ भी पूछें।",
        botPlaceholder: "उर्वरक, कीटों के बारे में पूछें..."
    },
    pa: {
        welcomeBack: "ਵਾਪਸੀ ਤੇ ਸੁਆਗਤ ਹੈ",
        signInAccount: "ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ",
        emailPlaceholder: "ਈਮੇਲ",
        passwordPlaceholder: "ਪਾਸਵਰਡ",
        signInBtn: "ਸਾਈਨ ਇਨ ਕਰੋ",
        noAccount: "ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਕੋਈ ਖਾਤਾ ਨਹੀਂ ਹੈ?",
        signUp: "ਸਾਈਨ ਅੱਪ ਕਰੋ",
        selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
        brandName: "ਕਿਸਾਨ ਸਹਾਇਕ",
        welcomeUser: "ਸੁਆਗਤ ਹੈ, {name}",
        logout: "ਲੌਗ ਆਉਟ",
        heroTitle1: "ਬਿਹਤਰ ਭਵਿੱਖ ਲਈ ",
        heroTitle2: "ਸਮਾਰਟ ਖੇਤੀ",
        heroDesc: "ਆਪਣੇ ਮੁਨਾਫੇ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਕਰਨ ਲਈ ਅਸਲ-ਸਮੇਂ ਦੇ ਮੌਸਮ ਦੇ ਅਪਡੇਟ, ਫਸਲ ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ, ਅਤੇ ਲਾਈਵ ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
        footerEmpowering: "ਕਿਸਾਨਾਂ ਦਾ ਸਸ਼ਕਤੀਕਰਨ।",
        aboutUs: "ਸਾਡੇ ਬਾਰੇ",
        botGreeting: "ਨਮਸਤੇ! ਮੈਂ ਕਿਸਾਨ ਸਹਾਇਕ ਏਆਈ ਹਾਂ। ਮੈਨੂੰ ਆਪਣੀਆਂ ਫਸਲਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।",
        botPlaceholder: "ਖਾਦ, ਕੀੜਿਆਂ ਬਾਰੇ ਪੁੱਛੋ..."
    },
    gu: {
        welcomeBack: "ફરીથી સ્વાગત છે",
        signInAccount: "તમારા ખાતામાં સાઇન ઇન કરો",
        emailPlaceholder: "ઇમેઇલ",
        passwordPlaceholder: "પાસવર્ડ",
        signInBtn: "સાઇન ઇન કરો",
        noAccount: "શું તમારી પાસે ખાતું નથી?",
        signUp: "સાઇન અપ કરો",
        selectLanguage: "ભાષા પસંદ કરો",
        brandName: "કિસાન સહાયક",
        welcomeUser: "સ્વાગત છે, {name}",
        logout: "લૉગ આઉટ",
        heroTitle1: "સારા ભવિષ્ય માટે ",
        heroTitle2: "સ્માર્ટ ફાર્મિંગ",
        heroDesc: "તમારા નફાને વધારવા માટે રીઅલ-ટાઇમ હવામાન અપડેટ્સ, પાક ભલામણો અને લાઇવ મંડી કિંમતો મેળવો.",
        footerEmpowering: "ખેડૂતોનું સશક્તિકરણ.",
        aboutUs: "અમારા વિશે",
        botGreeting: "નમસ્તે! હું કિસાન સહાયક AI છું. મને તમારા પાક વિશે કંઈપણ પૂછો.",
        botPlaceholder: "ખાતર, જીવાતો વિશે પૂછો..."
    },
    mr: {
        welcomeBack: "पुन्हा स्वागत आहे",
        signInAccount: "तुमच्या खात्यात साइन इन करा",
        emailPlaceholder: "ईमेल",
        passwordPlaceholder: "पासवर्ड",
        signInBtn: "साइन इन करा",
        noAccount: "तुमचे खाते नाही का?",
        signUp: "साइन अप करा",
        selectLanguage: "भाषा निवडा",
        brandName: "किसान सहाय्यक",
        welcomeUser: "स्वागत आहे, {name}",
        logout: "लॉग आउट",
        heroTitle1: "उज्ज्वल भविष्यासाठी ",
        heroTitle2: "स्मार्ट शेती",
        heroDesc: "तुमचा नफा वाढवण्यासाठी रिअल-टाइम हवामान अपडेट्स, पीक शिफारसी आणि थेट बाजार भाव मिळवा.",
        footerEmpowering: "शेतकऱ्यांचे सक्षमीकरण.",
        aboutUs: "आमच्याबद्दल",
        botGreeting: "नमस्ते! मी किसान सहाय्यक एआय आहे. मला तुमच्या पिकांबद्दल काहीही विचारा.",
        botPlaceholder: "खते, कीड याबद्दल विचारा..."
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem("kisan_lang") || "en";
    });

    const setLanguage = (langCode) => {
        setLanguageState(langCode);
        localStorage.setItem("kisan_lang", langCode);
    };

    // Helper to get translated string
    const t = (key, params = {}) => {
        // Fallback to English if translation missing
        const langObj = translations[language] || translations.en;
        let str = langObj[key] || translations.en[key] || key;
        
        // Replace params (e.g. {name})
        Object.keys(params).forEach(p => {
            str = str.replace(`{${p}}`, params[p]);
        });
        
        return str;
    };

    const currentLanguageObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguageObj }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
