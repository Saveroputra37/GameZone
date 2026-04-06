import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import TanyaAIContent from "../pages/TanyaAi/TanyaAI"; // Pindahkan isi chat ke file terpisah

const ChatModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-end justify-end p-4 md:p-8 pointer-events-none">
        {/* Backdrop - Opsional jika ingin menutup saat klik luar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative w-full max-w-lg h-[80vh] bg-[#0f101f] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
        >
          {/* Header Modal */}
          <div className="p-5 border-b border-white/5 bg-[#1e2036] flex justify-between items-center">
            <h3 className="font-black italic uppercase text-orange-500 tracking-tighter">
              GAMEZONE
              <span className="text-white pl-1">AI</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Area Chat (Gunakan isi TanyaAI yang lama di sini) */}
          <div className="flex-1 overflow-hidden">
            <TanyaAIContent />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body, // Target Portal
  );
};

export default ChatModal;
