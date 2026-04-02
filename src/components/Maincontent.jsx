import React from "react";
import PromoSlider from "../utils/Promoslider";
import GameGridMini from "./Indexgame";
import About from "../utils/About";
// 1. Import hook yang sudah dibuat
import { useCategories } from "../hooks/useCategories";

const MainContent = () => {
  // 2. Ambil data dari database
  const { data: allGames, isLoading, isError } = useCategories();

  // 3. Filter game yang is_popular = true untuk section "Terpopuler"
  const popularGames =
    allGames?.filter((game) => game.is_popular === true) || [];

  if (isLoading) {
    return (
      <div className="w-full text-center py-20 text-gray-400">
        Memuat konten...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-center py-20 text-red-500">
        Gagal memuat data.
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-6 px-4 md:px-8">
      <div className="w-full max-w-6xl space-y-12">
        {/* --- SECTION 1: BANNER --- */}
        <div className="w-full">
          <PromoSlider />
        </div>

        {/* --- SECTION 2: GRID DAFTAR GAME --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-white italic tracking-tighter flex items-center gap-2">
              <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
              GAME <span className="text-orange-500 uppercase">Terpopuler</span>
            </h3>
            <a
              href="#"
              className="text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              Lihat Semua
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {/* 4. Gunakan popularGames hasil filter database */}
            {popularGames.map((game) => (
              <div
                key={game.id}
                className="group bg-[#1e2036] rounded-2xl p-3 border border-white/5 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg"
              >
                <div className="aspect-square w-full bg-[#0f101f] rounded-xl mb-4 overflow-hidden relative">
                  <img
                    src={game.image_url} // Sesuaikan dengan kolom DB
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-2 right-2 bg-orange-500 text-[8px] font-black px-2 py-1 rounded-md text-white shadow-lg">
                    PROMO
                  </div>
                </div>
                <div className="px-1">
                  <h4 className="text-white font-bold text-sm truncate">
                    {game.name}
                  </h4>
                  <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest mt-1">
                    {game.category_type} {/* Sesuaikan dengan kolom DB */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: GAME GRID MINI --- */}
        <div className="w-full">
          <GameGridMini />
        </div>

        {/* --- SECTION 4: ABOUT --- */}
        <div className="w-full pt-8">
          <About />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
