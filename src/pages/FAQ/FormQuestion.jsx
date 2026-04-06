import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import SupportSkeleton from "../../utils/SkeletonLoading/FaqSkeleton"; // Pastikan path benar
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const SupportPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulasi loading saat halaman pertama kali dibuka
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      q: "Bagaimana cara melakukan Top-Up?",
      a: "Pilih game favoritmu, masukkan User ID, pilih nominal, dan selesaikan pembayaran. Saldo otomatis masuk dalam hitungan detik!",
    },
    {
      q: "Metode pembayaran apa saja yang tersedia?",
      a: "Kami mendukung QRIS, ShopeePay, Dana, OVO, GoPay, Transfer Bank, dan Alfamart/Indomaret.",
    },
    {
      q: "Apakah transaksi di Opiion aman?",
      a: "Sangat aman! Kami bekerja sama langsung dengan provider resmi dan menggunakan enkripsi SSL untuk setiap transaksi.",
    },
  ];

  const faqsoption = [
    { option: "Kenapa Tidak Ada Game Yang Saya Inginkan Disini", id: "opt-1" },
    { option: "Cara Mengetahui Pesanan Saya Sudah Jadi", id: "opt-2" },
    { option: "Bagaimana Saya Ikut Andil Dalam Penjualan Disini", id: "opt-3" },
    {
      option: "Bagaimana Cara Saya Memberi Pesan Terhadap Penjual",
      id: "opt-4",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form setelah 5 detik
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex min-h-screen bg-[#0f101f]">
      {/* 1. SIDEBAR NAVIGASI */}
      <Sidebar />

      {/* 2. AREA KONTEN UTAMA */}
      <main className="flex-1 lg:ml-72 transition-all duration-300 font-['Merriweather_Sans',sans-serif]">
        <div className="px-6 py-24 lg:py-10 max-w-5xl mx-auto space-y-16">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SupportSkeleton key="skeleton" />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                {/* --- SECTION 1: HEADER & FAQ --- */}
                <section className="space-y-10">
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block p-4 bg-orange-500/10 rounded-3xl text-orange-500 mb-2"
                    >
                      <HelpCircle size={40} />
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                      PUSAT <span className="text-orange-500">BANTUAN</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">
                      Cari jawaban cepat untuk kendala Anda di bawah ini.
                    </p>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {faqs.map((faq, i) => (
                      <div key={i} className="group">
                        <button
                          onClick={() =>
                            setActiveIndex(activeIndex === i ? null : i)
                          }
                          className={`w-full flex items-center justify-between p-5 md:p-6 rounded-4xl border transition-all duration-300 
                            ${
                              activeIndex === i
                                ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/20"
                                : "bg-[#1e2036] border-white/5 hover:border-orange-500/50"
                            }`}
                        >
                          <span
                            className={`font-bold text-sm md:text-base ${activeIndex === i ? "text-white" : "text-gray-300"}`}
                          >
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: activeIndex === i ? 180 : 0 }}
                            className={
                              activeIndex === i
                                ? "text-white"
                                : "text-orange-500"
                            }
                          >
                            <ChevronDown size={24} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {activeIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 md:p-8 text-gray-400 text-sm leading-relaxed bg-[#1e2036]/30 mt-2 rounded-4xl border border-white/5 italic">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

                {/* --- SECTION 2: CONTACT FORM --- */}
                <section className="grid lg:grid-cols-3 gap-8 items-start pt-10 border-t border-white/5">
                  {/* Info Kontak */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1e2036] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                        Kontak <span className="text-orange-500">Kami</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:text-white transition-all">
                          <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                            <Phone size={18} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest">
                            +62 812-3456-7890
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:text-white transition-all">
                          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <Mail size={18} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest">
                            support@opiion.id
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Formulir */}
                  <div className="lg:col-span-2">
                    <form
                      onSubmit={handleSubmit}
                      className="bg-[#1e2036] border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitted ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center py-16 text-center space-y-4"
                          >
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-white text-xl font-bold uppercase italic tracking-tighter">
                              Pesan Terkirim!
                            </h3>
                            <p className="text-gray-500 text-xs">
                              Kami akan segera menghubungi Anda kembali.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-5"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              <input
                                required
                                type="text"
                                placeholder="Nama Anda"
                                className="w-full bg-[#0f101f] border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:border-orange-500 transition-all outline-none"
                              />
                              <input
                                required
                                type="email"
                                placeholder="Email Aktif"
                                className="w-full bg-[#0f101f] border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:border-orange-500 transition-all outline-none"
                              />
                            </div>

                            <div className="relative">
                              <select
                                className="w-full bg-[#0f101f] border border-white/5 rounded-2xl py-4 px-6 text-sm text-white appearance-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none cursor-pointer"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "right 1.5rem center",
                                  backgroundSize: "1rem",
                                }}
                              >
                                <option value="" className="bg-[#0f101f]">
                                  Tidak Ada Disini Kendala Anda?
                                </option>
                                {faqsoption.map((item) => (
                                  <option
                                    key={item.id}
                                    value={item.id}
                                    className="bg-[#0f101f] py-2"
                                  >
                                    {item.option}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <textarea
                              required
                              rows="4"
                              placeholder="Jelaskan kendala Anda..."
                              className="w-full bg-[#0f101f] border border-white/5 rounded-4xl py-4 px-6 text-sm text-white focus:border-orange-500 transition-all outline-none resize-none"
                            ></textarea>

                            <button
                              type="submit"
                              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                            >
                              <Send size={18} /> KIRIM PESAN SEKARANG
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
