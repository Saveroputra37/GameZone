import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Tanpa BrowserRouter di sini
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

// Import Pages & Assets
import LayoutLogin from "./pages/login/layoutlogin";
import Home from "./pages/home/home";
import FAQPage from "./pages/FAQ/FormQuestion";
import TopUpDetail from "./pages/Topupdetail/TopUpDetail";
import ChatModal from "./utils/Chatmodal";
import SupportIcon from "./assets/customer-service.png";

function App() {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sembunyikan di login
  const hideAiIn = ["/login"];
  const isAiHidden = hideAiIn.includes(location.pathname);

  return (
    <div className="h-full relative font-['Merriweather_Sans',sans-serif]">
      {/* Bungkus langsung dengan Routes */}
      <Routes>
        <Route path="/login" element={<LayoutLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/topup/:slug" element={<TopUpDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* --- FLOATING INTERACTIVE AI TRIGGER --- */}
      {!isAiHidden && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative flex items-center justify-center group outline-none"
          >
            <span className="absolute inline-flex h-full w-full rounded-2xl bg-orange-500 opacity-20 animate-ping"></span>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-20 bg-[#1e2036] border border-white/10 text-white text-[10px] font-black px-4 py-2 rounded-xl whitespace-nowrap uppercase tracking-[0.2em] pointer-events-none shadow-2xl"
            >
              Tanya <span className="text-orange-500">AI Opiion</span>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: -5,
                boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              className="relative bg-white p-4 rounded-2xl shadow-2xl transition-colors group-hover:bg-orange-600"
            >
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </div>

              <img
                src={SupportIcon}
                alt="AI Support"
                className="w-8 h-8 invert group-hover:rotate-12 transition-transform duration-300"
              />
            </motion.div>
          </button>
        </div>
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
