import React from "react";
import { motion } from "framer-motion"; // Import motion
import { ShieldCheck, Zap, Headphones, Trophy } from "lucide-react";
import Logo from "../utils/Logo";

const About = () => {
  // Variabel Animasi untuk Stagger (berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const stats = [
    {
      label: "Pengguna Aktif",
      value: "100K+",
      icon: <ShieldCheck className="text-orange-500" size={24} />,
    },
    {
      label: "Transaksi Berhasil",
      value: "1M+",
      icon: <Zap className="text-yellow-500" size={24} />,
    },
    {
      label: "Game Terdaftar",
      value: "50+",
      icon: <Trophy className="text-blue-500" size={24} />,
    },
    {
      label: "Dukungan 24/7",
      value: "Online",
      icon: <Headphones className="text-green-500" size={24} />,
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-12 pb-20">
      {/* --- HERO SECTION WITH HOVER EFFECT --- */}
      <motion.section
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="relative w-full rounded-[2.5rem] bg-[#1e2036] border border-white/5 p-8 md:p-16 overflow-hidden shadow-2xl group"
      >
        {/* Animasi Cahaya yang Bergerak */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600 rounded-full blur-[100px]"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <Logo className="scale-150 origin-left" />
            <motion.h1
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              className="text-3xl md:text-5xl font-black italic text-white tracking-tighter leading-tight"
            >
              TEMPAT TOPUP{" "}
              <span className="text-orange-500 underline decoration-white/10">
                PALING AMAN
              </span>{" "}
              & TERPERCAYA
            </motion.h1>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl font-medium">
              Opiion hadir sebagai solusi utama bagi para gamers...
            </p>
          </div>

          {/* Lingkaran Logo dengan Animasi Putar & Floating */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block w-72 h-72 bg-gradient-to-br from-orange-500 to-red-600 rounded-full p-1 shadow-[0_0_50px_rgba(249,115,22,0.2)]"
          >
            <div className="w-full h-full bg-[#0f101f] rounded-full flex items-center justify-center border-8 border-[#1e2036]">
              <span className="text-6xl font-black italic text-white tracking-tighter uppercase">
                Op
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- STATS GRID WITH STAGGER ANIMATION --- */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, borderColor: "rgba(249, 115, 22, 0.5)" }}
            className="bg-[#1e2036] border border-white/5 p-6 rounded-4xl flex flex-col items-center text-center transition-colors duration-300"
          >
            <div className="mb-4 p-3 bg-[#0f101f] rounded-2xl">{stat.icon}</div>
            <h4 className="text-2xl font-black text-white italic tracking-tighter">
              {stat.value}
            </h4>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* --- CONTENT SECTION WITH FADE IN UP --- */}
      <div className="grid md:grid-cols-2 gap-10">
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="relative bg-[#1e2036]/50 border border-white/5 p-8 md:p-10 rounded-[2.5rem] space-y-6 overflow-hidden group transition-all duration-500"
        >
          {/* Dekorasi Background Interior Section */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <Trophy size={28} />
            </div>
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">
              Visi <span className="text-orange-500">Kami</span>
            </h3>
          </div>

          <div className="space-y-4 relative z-10">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
              Menjadi ekosistem layanan digital game{" "}
              <span className="text-white font-bold">
                nomor satu di Indonesia
              </span>{" "}
              yang mengedepankan kemudahan akses dan kenyamanan transaksi bagi
              seluruh lapisan masyarakat gamers.
            </p>

            {/* Poin Detail Visi dengan Animasi Muncul Berurutan */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                "Inovasi teknologi transaksi otomatis",
                "Ekosistem gaming yang inklusif",
                "Standar keamanan global",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-widest"
                >
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"></div>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="relative bg-[#1e2036]/50 border border-white/5 p-8 md:p-10 rounded-[2.5rem] space-y-6 overflow-hidden group transition-all duration-500"
        >
          {/* Dekorasi Background Interior Section (Biru untuk kontras Misi) */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">
              Misi <span className="text-blue-500">Kami</span>
            </h3>
          </div>

          <div className="space-y-4 relative z-10">
            <ul className="space-y-4">
              {[
                {
                  title: "Layanan 24/7 Otomatis",
                  desc: "Sistem top-up instan yang bekerja tanpa henti setiap harinya.",
                },
                {
                  title: "Keamanan Akun Terjamin",
                  desc: "Perlindungan data enkripsi tinggi untuk kenyamanan transaksi.",
                },
                {
                  title: "Harga Paling Kompetitif",
                  desc: "Memberikan penawaran harga terbaik dan promo eksklusif mingguan.",
                },
              ].map((misi, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="group/item flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6] shrink-0"></div>
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-1">
                      {misi.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      {misi.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;
