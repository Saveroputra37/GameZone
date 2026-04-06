import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

const TanyaAIContent = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! Ada yang bisa saya bantu?" },
  ]);

  // Tambahkan scrollRef agar auto-scroll bekerja
  const scrollRef = useRef(null);

  // Auto-scroll setiap ada pesan baru atau saat AI sedang berpikir
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
    
const mutation = useMutation({
  mutationFn: async (newMessage) => {
    const response = await fetch(
      "https://wnpcegixvunjystqarqs.supabase.co/functions/v1/Tanya-ai",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: newMessage,
          // Samakan dengan nama kolom di database Anda
          clerk_id: user?.id,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Gagal mengambil data dari AI");
    }
    return response.json();
  },
});

  const handleSend = (e) => {
    e.preventDefault();
    // Gunakan mutation.isPending sebagai pengganti isTyping
    if (!input.trim() || mutation.isPending) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    mutation.mutate(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0f101f] font-['Merriweather_Sans',sans-serif]">
      {/* 1. CHAT AREA */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-[#1e2036] border border-white/5 text-orange-500"
                  }`}
                >
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`p-4 rounded-3xl text-sm leading-relaxed shadow-xl ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-tr-none"
                      : "bg-[#1e2036] border border-white/5 text-gray-300 rounded-tl-none border-l-2 border-l-orange-500/30"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Gunakan mutation.isPending di sini */}
          {mutation.isPending && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 items-center bg-[#1e2036] border border-white/5 p-4 rounded-3xl rounded-tl-none">
                <div className="flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: dot * 0.1,
                      }}
                      className="w-1 h-1 bg-orange-500 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[9px] uppercase font-black tracking-widest text-gray-500">
                  AI Thinking...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. INPUT AREA */}
      <div className="p-5 border-t border-white/5 bg-[#1e2036]/50 backdrop-blur-md">
        <form
          onSubmit={handleSend}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan Anda..."
            className="w-full bg-[#0f101f] border border-white/5 text-white p-4 pr-14 rounded-2xl outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-gray-600"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !input.trim()}
            className={`absolute right-2 p-3 bg-orange-500 text-white rounded-xl shadow-lg transition-all active:scale-90 ${
              mutation.isPending || !input.trim()
                ? "opacity-30 grayscale"
                : "hover:bg-orange-600"
            }`}
          >
            <Send size={18} />
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-4 opacity-30">
          <Sparkles size={10} className="text-orange-500" />
          <p className="text-[8px] uppercase font-black tracking-[0.3em] text-white italic">
            Opiion Smart Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default TanyaAIContent;
