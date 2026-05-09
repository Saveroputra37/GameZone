import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  User,
  Bot,
  Sparkles,
  LogIn,
  Crown,
  History,
  Trash2,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import {
  useSupabaseUser,
  useCreateSupabaseUser,
} from "../../hooks/useSupabaseUser";
import {
  useChatHistory,
  useSaveChatMessage,
  useClearChatHistory,
} from "../../hooks/useChatHistory";
import { AnimatePresence, motion } from "framer-motion";

const TanyaAI = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const { data: supabaseUser } = useSupabaseUser();
  const createUser = useCreateSupabaseUser();

  // Konfigurasi Quick Options
  const QUICK_OPTIONS = [
    {
      label: "Cara Top Up",
      query: "Bagaimana cara melakukan top up game di sini?",
    },
    {
      label: "Daftar Game",
      query: "Apa saja game yang tersedia untuk top up?",
    },
    {
      label: "Cek Riwayat",
      query: "Bagaimana cara melihat riwayat transaksi saya?",
    },
    { label: "V-SOCIAL", query: "Bisa jelaskan tentang fitur V-SOCIAL?" },
  ];

  useEffect(() => {
    if (clerkUser?.id && !supabaseUser) {
      createUser.mutate();
    }
  }, [clerkUser?.id, supabaseUser, createUser]);

  const { data: chatHistory } = useChatHistory();
  const saveMessage = useSaveChatMessage();
  const clearHistory = useClearChatHistory();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! Ada yang bisa saya bantu?" },
  ]);

  useEffect(() => {
    if (chatHistory && chatHistory.length > 0) {
      const formattedMessages = chatHistory.map((chat) => ({
        role: chat.role,
        text: chat.message,
      }));
      setMessages(formattedMessages);
    }
  }, [chatHistory]);

  const scrollRef = useRef(null);

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
      if (!clerkUser?.id) throw new Error("User tidak terautentikasi");

      const response = await fetch(
        "https://wnpcegixvunjystqarqs.supabase.co/functions/v1/Tanya-ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: newMessage,
            clerk_id: clerkUser.id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari AI");
      }
      return response.json();
    },
    onSuccess: (data) => {
      const botMsg = {
        role: "bot",
        text: data.answer || "Maaf, ada kendala teknis.",
      };
      setMessages((prev) => [...prev, botMsg]);
      saveMessage.mutate({ message: botMsg.text, role: "bot" });
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Error: ${error.message}` },
      ]);
    },
  });

  const handleSend = (e, customQuery = null) => {
    if (e) e.preventDefault();

    const finalInput = customQuery || input;
    if (!clerkUser || !finalInput.trim() || mutation.isPending) return;

    const userMsg = { role: "user", text: finalInput.trim() };
    setMessages((prev) => [...prev, userMsg]);

    saveMessage.mutate({ message: finalInput.trim(), role: "user" });
    mutation.mutate(finalInput.trim());
    setInput("");
  };

  if (!isLoaded) return <div className="h-full bg-[#0f101f]" />;

  if (!clerkUser) {
    return (
      <div className="flex flex-col h-full bg-[#0f101f] items-center justify-center text-center px-6">
        <div className="w-16 h-16 bg-[#1e2036] border border-white/5 rounded-2xl flex items-center justify-center mb-4">
          <LogIn size={32} className="text-orange-500" />
        </div>
        <h2 className="text-white text-lg font-semibold mb-2">
          Login Diperlukan
        </h2>
        <p className="text-gray-400 text-sm">
          Silakan login untuk menggunakan Tanya AI.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0f101f] font-primary">
      {/* Header */}
      {supabaseUser && (
        <div className="px-5 py-3 border-b border-white/5 bg-[#1e2036]/30 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={supabaseUser.avatar_url || clerkUser?.imageUrl}
              className="w-8 h-8 rounded-full border-2 border-orange-500/30 shadow-lg shadow-orange-500/10"
              alt="Avatar"
            />
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm">
                {supabaseUser.full_name}
              </span>
              <span className="text-xs text-gray-400">
                Top Up: Rp {(supabaseUser.total_topup || 0).toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={() =>
              window.confirm("Hapus riwayat?") && clearHistory.mutate()
            }
            className="p-2 hover:bg-white/5 rounded-xl transition-colors group"
          >
            <Trash2
              size={16}
              className="text-gray-500 group-hover:text-red-400"
            />
          </button>
        </div>
      )}

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white rounded-tr-none"
                    : "bg-[#1e2036] text-gray-300 rounded-tl-none border border-white/5"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {mutation.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-[#1e2036] border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                  AI Thinking...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area + Quick Options */}
      <div className="p-5 border-t border-white/5 bg-[#1e2036]/50 backdrop-blur-md">
        {/* Quick Options Row - Muncul saat baru mulai chat */}
        {!mutation.isPending && messages.length <= 2 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {QUICK_OPTIONS.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(null, opt.query)}
                className="shrink-0 px-4 py-2 bg-[#0f101f] border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 text-[11px] font-medium rounded-xl transition-all shadow-sm"
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSend}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pertanyaan..."
            className="w-full bg-[#0f101f] border border-white/5 text-white p-4 pr-14 rounded-2xl outline-none focus:border-orange-500/50 text-sm transition-all placeholder:text-gray-600"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !input.trim()}
            className="absolute right-2 p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>

        <div className="mt-3 flex items-center justify-center gap-1.5 opacity-20">
          <Sparkles size={10} className="text-orange-500" />
          <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white italic">
            Opiion Smart AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default TanyaAI;
