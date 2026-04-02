import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- KOMPONEN ANAK (DENGAN FILTER MANDIRI) ---
const GameSection = ({ title, highlight, allGames = [] }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Semua");

  // Opsi filter disesuaikan dengan data 'category_type' di screenshot database kamu
  const filterOptions = ["Semua", "Mobile", "PC", "Voucher"];

  // Logika filter internal berdasarkan category_type dari database
  const filteredGames = allGames.filter(
    (game) => activeFilter === "Semua" || game.category_type === activeFilter,
  );

  return (
    <section className="bg-[#1e2036] py-6 px-5 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden h-full">
      {/* HEADER & FILTER BAR */}
      <div className="flex flex-col gap-5 mb-8">
        <div className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-4 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
          <h3 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            {title} <span className="text-white">{highlight}</span>
          </h3>
        </div>

        {/* Tombol Filter Mini */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {filterOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-4 py-1.5 rounded-xl cursor-pointer text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeFilter === cat
                  ? "text-black"
                  : "text-gray-500 hover:text-white bg-white/5"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeFilter === cat && (
                <motion.div
                  layoutId={`activeTab-${title}`} // Menjaga ID unik agar tidak tabrakan antar seksi
                  className="absolute inset-0 bg-orange-500 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* GRID GAME DENGAN ANIMASI */}
      <motion.div
        layout
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredGames.map((game) => (
            <motion.div
              layout
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/topup/${game.slug}`)}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="relative aspect-square w-full max-w-16 bg-[#0f101f] rounded-2xl border border-white/5 group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all duration-300 overflow-hidden shadow-inner">
                <img
                  src={game.image_url}
                  alt={game.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              {/* Nama Game Mini */}
              <span className="text-[8px] md:text-[9px] font-bold text-gray-500 group-hover:text-white truncate w-full text-center uppercase tracking-tight">
                {game.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Tampilan Jika Kosong */}
      {filteredGames.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest italic font-bold">
            Belum ada game kategori {activeFilter}
          </p>
        </div>
      )}
    </section>
  );
};

// --- KOMPONEN INDUK ---
const GameGridMini = ({ allGames = [] }) => {
  // Membagi data berdasarkan status populer dari Supabase
  const popularData = allGames.filter((game) => game.is_popular);
  const indexAllData = allGames.filter((game) => !game.is_popular);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Seksi Kiri: Menampilkan Game Non-Populer */}
      <GameSection
        title="Index All"
        highlight="Games"
        allGames={indexAllData}
      />

      {/* Seksi Kanan: Menampilkan Game Populer */}
      <GameSection title="Popular" highlight="Top Up" allGames={popularData} />
    </div>
  );
};

export default GameGridMini;
