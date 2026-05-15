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
        // Global / Nav
        brandName: "Kisan Sahayak",
        navFeatures: "Features",
        navAbout: "About",
        navLogin: "Login",
        navSignUp: "Sign Up",
        welcomeUser: "Welcome, {name}",
        logout: "Logout",
        selectLanguage: "Select Language",
        footerMadeWith: "Made with ❤️ for Indian Farmers.",
        footerEmpowering: "Empowering Farmers.",
        aboutUs: "About Us",

        // Login & Signup
        welcomeBack: "Welcome Back",
        signInAccount: "Sign in to your account",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        signInBtn: "Sign In",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
        joinAdvisory: "Join Crop Advisory",
        createAccount: "Create your account",
        namePlaceholder: "Full Name",
        pincodePlaceholder: "Pincode (for location)",
        hasAccount: "Already have an account?",
        signInLink: "Sign in",

        // Landing Page
        heroBadge: "Trusted by 10,000+ Farmers",
        heroTitle1: "Empowering ",
        heroTitle2: "Farmers",
        heroTitle3: " with Smart Advice",
        heroDesc: "Kisan Sahayak uses advanced AI to provide real-time agricultural insights, weather alerts, and market prices to help you farm smarter and earn more.",
        ctaGetStarted: "Get Started for Free",
        ctaViewDemo: "View Demo",
        featuresTitle: "Everything you need to succeed",
        featuresDesc: "We combine cutting-edge technology with traditional farming wisdom to provide the best possible support for your fields.",
        f1Title: "AI Crop Recommendation",
        f1Desc: "Get personalized crop suggestions based on your soil and local climate conditions.",
        f2Title: "Weather Insights",
        f2Desc: "Real-time weather updates and alerts to help you plan your farming activities better.",
        f3Title: "Mandi Prices",
        f3Desc: "Stay updated with the latest market rates from nearby mandis to get the best price for your produce.",
        f4Title: "AI Chatbot Support",
        f4Desc: "Instant answers to your farming queries from our intelligent AI assistant.",
        readyTitle: "Ready to grow your harvest?",
        readyDesc: "Join thousands of farmers who are already using Kisan Sahayak to make better decisions every day.",
        readyBtn: "Create Account Now",

        // Dashboard Shell
        dashHero1: "Smart Farming for a ",
        dashHero2: "Better Future",
        dashHeroDesc: "Get real-time weather updates, crop recommendations, and live mandi prices to maximize your profits.",

        // Advisory
        advTitle: "Crop Advisor",
        lblSeason: "Season",
        lblSoil: "Soil Type",
        lblWater: "Water Availability",
        lblLand: "Land Area (Acres)",
        optRabi: "Rabi (Winter)",
        optKharif: "Kharif (Monsoon)",
        optZaid: "Zaid (Summer)",
        optLoamy: "Loamy",
        optClay: "Clay",
        optSandy: "Sandy",
        optBlack: "Black Soil",
        optLow: "Low",
        optMedium: "Medium",
        optHigh: "High",
        btnAnalyzing: "Analyzing Soil...",
        btnGetRec: "Get Recommendations",
        bestMatch: "Best Match",
        goodMatch: "Good Match",
        expYield: "Exp. Yield",
        qPerAcre: "q/acre",
        estRevenue: "Est. Revenue",
        basedOnMarket: "Based on current market price",
        marketUnavailable: "Live market price unavailable",
        demand: "Demand",
        risk: "Risk",
        companionCrops: "Companion Crops (Intercropping)",
        fertSchedule: "Fertilizer Schedule",
        expertTip: "Expert Farmer Tip",
        hideDetails: "Hide Details",
        viewFullGuide: "View Full Guide",

        // Price Checker
        priceTitle: "Mandi Prices",
        pricePlaceholder: "Enter crop (e.g. Wheat, Rice)",
        btnChecking: "Checking...",
        cached: "Cached",
        estimated: "Estimated",
        perQuintal: "per quintal",
        updated: "Updated:",

        // Weather
        weatherUnavailable: "Weather Unavailable",
        humidity: "Humidity:",
        wind: "Wind:",

        // About
        aboutHeroTitle1: "About ",
        aboutHeroTitle2: "Kisan Sahayak",
        aboutHeroDesc: "We are a passionate team dedicated to empowering India's farmers with technology. Our mission is to provide accurate, timely, and actionable advice to maximize crop yields.",
        meetTeam: "Meet the Team",
        getInTouch: "Get in Touch",
        getInTouchDesc: "Have questions, suggestions, or just want to say hi? We'd love to hear from you. Drop us an email!",
        sendEmailBtn: "Send us an Email",

        // ChatBot
        botGreeting: "Namaste! I am Kisan Sahayak AI. Ask me anything about your crops.",
        botPlaceholder: "Ask about fertilizer, pests..."
    },
    hi: {
        // Global / Nav
        brandName: "किसान सहायक",
        navFeatures: "विशेषताएं",
        navAbout: "हमारे बारे में",
        navLogin: "लॉग इन",
        navSignUp: "साइन अप",
        welcomeUser: "स्वागत है, {name}",
        logout: "लॉग आउट",
        selectLanguage: "भाषा चुनें",
        footerMadeWith: "भारतीय किसानों के लिए ❤️ से बनाया गया।",
        footerEmpowering: "किसानों को सशक्त बनाना।",
        aboutUs: "हमारे बारे में",

        // Login & Signup
        welcomeBack: "वापसी पर स्वागत है",
        signInAccount: "अपने खाते में साइन इन करें",
        emailPlaceholder: "ईमेल",
        passwordPlaceholder: "पासवर्ड",
        signInBtn: "साइन इन करें",
        noAccount: "क्या आपके पास खाता नहीं है?",
        signUp: "साइन अप करें",
        joinAdvisory: "फसल सलाहकार से जुड़ें",
        createAccount: "अपना खाता बनाएं",
        namePlaceholder: "पूरा नाम",
        pincodePlaceholder: "पिनकोड (स्थान के लिए)",
        hasAccount: "क्या आपके पास पहले से खाता है?",
        signInLink: "साइन इन करें",

        // Landing Page
        heroBadge: "10,000+ किसानों द्वारा भरोसेमंद",
        heroTitle1: "स्मार्ट सलाह से ",
        heroTitle2: "किसानों",
        heroTitle3: " को सशक्त बनाना",
        heroDesc: "किसान सहायक उन्नत एआई का उपयोग करके वास्तविक समय की कृषि जानकारी, मौसम चेतावनी और बाजार की कीमतें प्रदान करता है।",
        ctaGetStarted: "मुफ्त में शुरू करें",
        ctaViewDemo: "डेमो देखें",
        featuresTitle: "सफल होने के लिए आपकी हर जरूरत",
        featuresDesc: "हम आपके खेतों के लिए सर्वोत्तम संभव सहायता प्रदान करने के लिए आधुनिक तकनीक को पारंपरिक खेती के ज्ञान के साथ जोड़ते हैं।",
        f1Title: "एआई फसल सिफारिश",
        f1Desc: "अपनी मिट्टी और स्थानीय जलवायु के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें।",
        f2Title: "मौसम की जानकारी",
        f2Desc: "आपकी खेती की योजना बनाने के लिए वास्तविक समय के मौसम अपडेट और अलर्ट।",
        f3Title: "मंडी की कीमतें",
        f3Desc: "अपनी उपज के लिए सर्वोत्तम मूल्य प्राप्त करने के लिए नजदीकी मंडियों की नवीनतम बाजार दरों के साथ अपडेट रहें।",
        f4Title: "एआई चैटबॉट सहायता",
        f4Desc: "हमारे बुद्धिमान एआई सहायक से खेती संबंधी आपके प्रश्नों के त्वरित उत्तर।",
        readyTitle: "क्या आप अपनी उपज बढ़ाने के लिए तैयार हैं?",
        readyDesc: "उन हजारों किसानों से जुड़ें जो पहले से ही किसान सहायक का उपयोग कर रहे हैं।",
        readyBtn: "अभी खाता बनाएं",

        // Dashboard Shell
        dashHero1: "बेहतर भविष्य के लिए ",
        dashHero2: "स्मार्ट खेती",
        dashHeroDesc: "अपने मुनाफे को अधिकतम करने के लिए वास्तविक समय के मौसम अपडेट, फसल की सिफारिशें और लाइव मंडी मूल्य प्राप्त करें।",

        // Advisory
        advTitle: "फसल सलाहकार",
        lblSeason: "मौसम",
        lblSoil: "मिट्टी का प्रकार",
        lblWater: "पानी की उपलब्धता",
        lblLand: "भूमि क्षेत्र (एकड़)",
        optRabi: "रबी (सर्दियां)",
        optKharif: "खरीफ (मानसून)",
        optZaid: "ज़ैद (गर्मियां)",
        optLoamy: "दोमट (Loamy)",
        optClay: "चिकनी (Clay)",
        optSandy: "बलुई (Sandy)",
        optBlack: "काली मिट्टी (Black Soil)",
        optLow: "कम",
        optMedium: "मध्यम",
        optHigh: "अधिक",
        btnAnalyzing: "मिट्टी का विश्लेषण...",
        btnGetRec: "सिफारिशें प्राप्त करें",
        bestMatch: "सर्वश्रेष्ठ मिलान",
        goodMatch: "अच्छा मिलान",
        expYield: "संभावित उपज",
        qPerAcre: "क्विंटल/एकड़",
        estRevenue: "अनुमानित आय",
        basedOnMarket: "वर्तमान बाजार मूल्य के आधार पर",
        marketUnavailable: "लाइव बाजार मूल्य अनुपलब्ध",
        demand: "मांग",
        risk: "जोखिम",
        companionCrops: "सहवर्ती फसलें (इंटरक्रॉपिंग)",
        fertSchedule: "उर्वरक अनुसूची",
        expertTip: "विशेषज्ञ किसान की सलाह",
        hideDetails: "विवरण छिपाएं",
        viewFullGuide: "पूरी मार्गदर्शिका देखें",

        // Price Checker
        priceTitle: "मंडी की कीमतें",
        pricePlaceholder: "फसल दर्ज करें (उदा. गेहूं, चावल)",
        btnChecking: "जांच की जा रही है...",
        cached: "कैश्ड",
        estimated: "अनुमानित",
        perQuintal: "प्रति क्विंटल",
        updated: "अपडेट:",

        // Weather
        weatherUnavailable: "मौसम की जानकारी अनुपलब्ध",
        humidity: "नमी:",
        wind: "हवा:",

        // About
        aboutHeroTitle1: "किसान सहायक ",
        aboutHeroTitle2: "के बारे में",
        aboutHeroDesc: "हम छात्रों की एक टीम हैं जो तकनीक के जरिए भारतीय किसानों को सशक्त बनाने के लिए समर्पित हैं।",
        meetTeam: "टीम से मिलें",
        getInTouch: "संपर्क करें",
        getInTouchDesc: "क्या आपके पास प्रश्न या सुझाव हैं? हमें आपसे सुनना अच्छा लगेगा। हमें एक ईमेल भेजें!",
        sendEmailBtn: "हमें ईमेल भेजें",

        // ChatBot
        botGreeting: "नमस्ते! मैं किसान सहायक एआई हूं। मुझसे अपनी फसलों के बारे में कुछ भी पूछें।",
        botPlaceholder: "उर्वरक, कीटों के बारे में पूछें..."
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

    const t = (key, params = {}) => {
        const langObj = translations[language] || translations.en;
        let str = langObj[key] || translations.en[key] || key;
        
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
