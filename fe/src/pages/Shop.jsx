import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Search, Filter, Star, Plus, Minus, Trash2, CheckCircle, ExternalLink, ShieldCheck, Truck, Sprout } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

const PRODUCTS = [
    // Seeds
    { id: 1, name: "HD-2967 High Yield Wheat Seeds (10kg)", category: "Seeds", price: 650, rating: 4.8, reviews: 142, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80", bestFor: "Wheat", seller: "National Seeds Corp" },
    { id: 2, name: "Pusa Basmati 1121 Rice Seeds (5kg)", category: "Seeds", price: 850, rating: 4.9, reviews: 310, image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=500&q=80", bestFor: "Rice", seller: "AgriBazaar" },
    { id: 3, name: "Hybrid Maize Ganga-5 Seeds (5kg)", category: "Seeds", price: 480, rating: 4.7, reviews: 89, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80", bestFor: "Maize", seller: "Kisan Seeds" },
    { id: 4, name: "Bt Cotton Seeds BG-II (450g packet)", category: "Seeds", price: 810, rating: 4.6, reviews: 205, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=500&q=80", bestFor: "Cotton", seller: "Mahyco" },
    { id: 5, name: "Pusa Bold Mustard Seeds (2kg)", category: "Seeds", price: 340, rating: 4.8, reviews: 76, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80", bestFor: "Mustard", seller: "IFFCO Bazar" },
    
    // Fertilizers
    { id: 6, name: "IFFCO Nano Urea Liquid (500ml)", category: "Fertilizers", price: 240, rating: 4.9, reviews: 520, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=80", bestFor: "All Crops", seller: "IFFCO Bazar" },
    { id: 7, name: "IFFCO DAP Di-Ammonium Phosphate (50kg)", category: "Fertilizers", price: 1350, rating: 4.8, reviews: 410, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80", bestFor: "All Crops", seller: "IFFCO Bazar" },
    { id: 8, name: "Organic Neem Coated Urea (45kg)", category: "Fertilizers", price: 266, rating: 4.7, reviews: 290, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80", bestFor: "Wheat, Rice", seller: "Kribhco" },
    { id: 9, name: "MOP Muriate of Potash 60% (50kg)", category: "Fertilizers", price: 1700, rating: 4.6, reviews: 115, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80", bestFor: "Potato, Sugarcane", seller: "Coromandel" },
    { id: 10, name: "Vermicompost Pure Organic Bio-Fertilizer (25kg)", category: "Fertilizers", price: 450, rating: 4.9, reviews: 630, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80", bestFor: "Vegetables", seller: "Organic India" },

    // Equipment & Tools
    { id: 11, name: "Heavy Duty 7 HP Petrol Power Weeder / Tiller", category: "Equipment", price: 28500, rating: 4.8, reviews: 64, image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=500&q=80", bestFor: "All Crops", seller: "Mahindra Farm" },
    { id: 12, name: "Battery Operated 16L Knapsack Sprayer Pump", category: "Equipment", price: 2400, rating: 4.7, reviews: 340, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=80", bestFor: "All Crops", seller: "Neptune Farming" },
    { id: 13, name: "Traditional Iron Khurpi & Sickle Hand Tool Set", category: "Tools", price: 320, rating: 4.6, reviews: 180, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=80", bestFor: "Weeding", seller: "Tata Agrico" },
    { id: 14, name: "Digital Soil pH and Moisture Meter 3-in-1 Tester", category: "Tools", price: 650, rating: 4.5, reviews: 210, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80", bestFor: "Soil Testing", seller: "AgriTech India" },

    // Pumps & Irrigation
    { id: 15, name: "Solar Submersible Water Pump 3 HP Kit", category: "Pumps", price: 45000, rating: 4.9, reviews: 42, image: "https://images.unsplash.com/photo-1509391365360-fa0ba1dc6fd2?auto=format&fit=crop&w=500&q=80", bestFor: "Irrigation", seller: "Tata Power Solar" },
    { id: 16, name: "Drip Irrigation Complete Kit for 1 Acre", category: "Pumps", price: 12500, rating: 4.8, reviews: 98, image: "https://images.unsplash.com/photo-1516253593875-bd7bad95d8eb?auto=format&fit=crop&w=500&q=80", bestFor: "Vegetables, Cotton", seller: "Jain Irrigation" },
    { id: 17, name: "Rain Gun Sprinkler Irrigation System (1.5 inch)", category: "Pumps", price: 3200, rating: 4.7, reviews: 150, image: "https://images.unsplash.com/photo-1516253593875-bd7bad95d8eb?auto=format&fit=crop&w=500&q=80", bestFor: "Wheat, Maize", seller: "Kisan Irrigation" },

    // Pesticides & Protective
    { id: 18, name: "Neem Oil 10000 PPM Organic Insecticide (1 Litre)", category: "Pesticides", price: 550, rating: 4.8, reviews: 280, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=80", bestFor: "Organic Farming", seller: "Bayer CropScience" },
    { id: 19, name: "Chlorpyrifos 20% EC Termite and Pest Control (1L)", category: "Pesticides", price: 680, rating: 4.7, reviews: 190, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80", bestFor: "Pest Control", seller: "Dhanuka Agritech" },
    { id: 20, name: "Farmer Heavy Duty Safety Goggles & Chemical Mask", category: "Protective", price: 450, rating: 4.6, reviews: 110, image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=500&q=80", bestFor: "Spraying Safety", seller: "3M India" }
];

const CATEGORIES = ["All", "Seeds", "Fertilizers", "Equipment", "Pumps", "Pesticides", "Tools", "Protective"];

export default function Shop() {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const cropQuery = searchParams.get("crop") || "";

    const [selectedCat, setSelectedCat] = useState("All");
    const [searchQuery, setSearchQuery] = useState(cropQuery);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchesCat = selectedCat === "All" || p.category === selectedCat;
            const matchesSearch = !searchQuery || 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [selectedCat, searchQuery]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQty = (id, delta) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQty = item.qty + delta;
                    return newQty > 0 ? { ...item, qty: newQty } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    const handleCheckout = () => {
        setCheckoutSuccess(true);
        setCart([]);
        setTimeout(() => {
            setCheckoutSuccess(false);
            setIsCartOpen(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-emerald-100/60 bg-white/80 backdrop-blur-xl shadow-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="flex items-center text-stone-600 hover:text-emerald-700 transition-colors font-bold text-sm">
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                        </Link>
                        <div className="h-4 w-px bg-stone-200 hidden sm:block" />
                        <div className="flex items-center gap-2 font-black text-lg text-emerald-800">
                            <ShoppingBag className="h-5 w-5 text-emerald-600" />
                            <span>{t("shopTitle") || "Farmer's Marketplace"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSelector />
                        <Button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl px-4 py-2 shadow-md border-none flex items-center gap-2"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span className="hidden sm:inline font-bold">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white py-12 px-4 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-emerald-300 border border-white/10">
                            <ShieldCheck className="h-3.5 w-3.5" /> 100% Genuine Agri Supplies & Subsidy Ready
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight">{t("shopTitle") || "Farmer's Marketplace"}</h1>
                        <p className="text-emerald-100/90 text-sm md:text-base font-medium leading-relaxed">
                            {t("shopDesc") || "High quality seeds, fertilizers, pumps, and agricultural equipment at affordable prices."}
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center min-w-[120px]">
                            <Truck className="h-6 w-6 text-amber-400 mx-auto mb-1" />
                            <div className="text-xs font-bold text-stone-200">Free Delivery</div>
                            <div className="text-[10px] text-emerald-300">On seeds & manure</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center min-w-[120px]">
                            <Sprout className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                            <div className="text-xs font-bold text-stone-200">Certified Quality</div>
                            <div className="text-[10px] text-emerald-300">Govt Approved</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto max-w-7xl px-4 mt-8 space-y-6">
                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80">
                    {/* Categories */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                        <Filter className="h-4 w-4 text-stone-400 shrink-0 mr-1 hidden sm:block" />
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCat(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    selectedCat === cat 
                                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                                        : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80 shrink-0">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                        <Input
                            type="text"
                            placeholder="Search seeds, urea, pumps, crop..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-xl border-stone-200 bg-stone-50/50 focus:bg-white text-sm"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {cropQuery && (
                    <div className="bg-amber-50 border border-amber-200/80 px-4 py-3 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-900 font-medium text-sm">
                            <span className="font-bold">Showing recommended supplies for:</span> 
                            <span className="bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-lg text-xs">{cropQuery}</span>
                        </div>
                        <button onClick={() => setSearchQuery("")} className="text-xs font-bold text-amber-700 hover:underline">
                            Show All Supplies
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                            <Search className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-bold text-stone-700">No agricultural supplies found</h3>
                        <p className="text-sm text-stone-500 max-w-md mx-auto">We couldn't find anything matching your search "{searchQuery}" in category "{selectedCat}".</p>
                        <Button onClick={() => { setSelectedCat("All"); setSearchQuery(""); }} variant="outline" size="sm" className="mt-2 font-bold">
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <Card key={product.id} className="border border-stone-200/80 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-emerald-800 shadow-sm">
                                        {product.category}
                                    </span>
                                    <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm">
                                        <Star className="h-3 w-3 fill-amber-300 text-amber-300" /> {product.rating}
                                    </span>
                                </div>

                                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-1.5">
                                        <div className="text-[11px] font-bold text-stone-400 flex items-center justify-between">
                                            <span>By {product.seller}</span>
                                            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Best for {product.bestFor}</span>
                                        </div>
                                        <h3 className="font-bold text-stone-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                                        <div>
                                            <div className="text-[10px] font-medium text-stone-400 uppercase">Price</div>
                                            <div className="text-xl font-black text-stone-900">₹{product.price.toLocaleString()}</div>
                                        </div>
                                        <Button
                                            onClick={() => addToCart(product)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 border-none"
                                        >
                                            <Plus className="h-3.5 w-3.5" /> {t("addToCart") || "Add to Cart"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            {/* Cart Slide-over / Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
                    
                    <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                            <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
                                <div className="flex items-center gap-2 font-black text-lg">
                                    <ShoppingBag className="h-5 w-5 text-emerald-300" />
                                    <span>{t("cartTitle") || "Your Cart"} ({cartCount})</span>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="text-stone-300 hover:text-white font-bold text-sm">
                                    Close ✕
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {checkoutSuccess ? (
                                    <div className="text-center py-16 space-y-4 animate-in zoom-in-95 duration-300">
                                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                            <CheckCircle className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-xl font-black text-stone-800">Order Placed Successfully!</h3>
                                        <p className="text-sm text-stone-600 max-w-xs mx-auto font-medium">
                                            Your order has been forwarded to the nearest Agri-dealer. You will receive an SMS confirmation shortly.
                                        </p>
                                    </div>
                                ) : cart.length === 0 ? (
                                    <div className="text-center py-20 text-stone-400 space-y-3">
                                        <ShoppingBag className="h-12 w-12 mx-auto stroke-1" />
                                        <p className="font-semibold text-sm">Your cart is empty.</p>
                                        <Button onClick={() => setIsCartOpen(false)} variant="outline" size="sm" className="font-bold">
                                            Browse Products
                                        </Button>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/60 items-center">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-xs text-stone-800 truncate">{item.name}</h4>
                                                <div className="text-sm font-black text-emerald-700 mt-1">₹{(item.price * item.qty).toLocaleString()}</div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold text-xs">
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-xs font-bold text-stone-800 w-4 text-center">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold text-xs">
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-stone-400 hover:text-rose-600 p-2">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && !checkoutSuccess && (
                                <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
                                    <div className="space-y-1.5 text-sm">
                                        <div className="flex justify-between text-stone-500 font-medium">
                                            <span>Subtotal</span>
                                            <span>₹{cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-emerald-600 font-bold text-xs">
                                            <span>Farmer Subsidy Discount</span>
                                            <span>- ₹0 (Applied at seller)</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-black text-stone-900 pt-2 border-t border-stone-200">
                                            <span>Total Amount</span>
                                            <span className="text-emerald-700">₹{cartTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleCheckout}
                                        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 border-none flex items-center justify-center gap-2 text-base"
                                    >
                                        <CheckCircle className="h-5 w-5" /> {t("checkout") || "Buy Now"} (₹{cartTotal.toLocaleString()})
                                    </Button>
                                    <div className="text-[11px] text-center text-stone-400 font-medium flex items-center justify-center gap-1">
                                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Secure checkout via Agri-Partner portal
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
