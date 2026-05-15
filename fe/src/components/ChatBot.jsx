import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import api from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export function ChatBot() {
    const { t, language, currentLanguageObj } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Set initial greeting when language changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // eslint-disable-next-line
        setMessages([{ text: t("botGreeting"), isUser: false }]);
    }, [language, t]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await api.post('/gemini', { 
                message: userMessage, 
                languageName: currentLanguageObj.name 
            });
            const botMessage = res.data.reply;
            setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
        } catch (error) {
            console.error("ChatBot Error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Connection failed. Please try again.";
            setMessages(prev => [...prev, { text: `Error: ${errorMessage}`, isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-600/40 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50 group border-[3px] border-white/50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-20 animate-ping" />
                <MessageCircle className="h-7 w-7 relative z-10" />
                <Sparkles className="h-4 w-4 absolute top-3 right-3 text-emerald-200 animate-pulse" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-full max-w-[380px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/20 z-50 overflow-hidden border border-emerald-100/50 animate-in slide-in-from-bottom-12 fade-in duration-300 flex flex-col h-[550px] max-h-[85vh]">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 flex justify-between items-center text-white relative overflow-hidden shrink-0">
                        <div className="absolute -right-4 -top-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md shadow-inner border border-white/30 relative">
                                <Bot className="h-6 w-6 text-white drop-shadow-md" />
                                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-300 rounded-full border-2 border-emerald-600"></div>
                            </div>
                            <div>
                                <h3 className="font-black text-lg tracking-tight drop-shadow-sm">Kisan Assistant</h3>
                                <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-bold">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full text-white/90 transition-colors relative z-10">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-emerald-50/50 to-stone-50/80">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                {!msg.isUser && (
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shrink-0 mr-2 flex items-center justify-center border-2 border-white shadow-sm mt-auto">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[75%] p-4 rounded-[1.25rem] text-sm leading-relaxed shadow-sm ${msg.isUser
                                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-br-sm'
                                    : 'bg-white border border-emerald-100/60 text-stone-700 rounded-bl-sm font-medium'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shrink-0 mr-2 flex items-center justify-center border-2 border-white shadow-sm mt-auto">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                                <div className="bg-white border border-emerald-100/60 p-4 rounded-[1.25rem] rounded-bl-sm shadow-sm flex items-center gap-1.5 h-[52px]">
                                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce"></div>
                                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-1" />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white/90 backdrop-blur-md border-t border-emerald-100/50 flex gap-2 shrink-0">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t("botPlaceholder")}
                            className="flex-1 bg-stone-50/80 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm rounded-full px-5"
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" className="shrink-0 h-11 w-11 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-200/50 border-none transition-transform hover:scale-105 active:scale-95" disabled={isLoading || !input.trim()}>
                            <Send className="h-5 w-5 ml-0.5" />
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}
