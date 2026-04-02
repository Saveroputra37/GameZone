import React from "react";
import PromoSlider from "../utils/Promoslider";
import About from "../utils/About";
import GameGridMini from "./Indexgame";
import PopularGames from "../utils/PopularGame";
import MainContentSkeleton from "../utils/SkeletonLoading/MainContentSkeleton";
import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
const MainContent = ({ searchQuery = "" }) => {
  const navigate = useNavigate();
  // 1. Ambil data dari TanStack Query (Tabel 'categories' sesuai screenshot kamu)
  const { data: allGames, isLoading, isError } = useCategories();

  // 2. Logika Filter Pencarian Berdasarkan Nama
  const filteredResults =
    allGames?.filter((game) =>
      game?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || ""),
    ) || [];
  // 3. Filter khusus untuk Section "Terpopuler" (is_popular === true)
  const popularResults = filteredResults.filter(
    (game) => game.is_popular === true,
  );

  // --- STATE: LOADING ---
  if (isLoading)
    return (
      <div className="w-full flex justify-center py-6 px-4 md:px-8">
        <div className="w-full max-w-6xl">
          <MainContentSkeleton />
        </div>
      </div>
    );

  // --- STATE: ERROR ---
  if (isError)
    return (
      <div className="text-center py-20 text-red-400">Gagal memuat data.</div>
    );

  return (
    <div className="w-full flex justify-center py-6 px-4 md:px-8">
      <div className="w-full max-w-6xl space-y-12 md:space-y-16 animate-in fade-in duration-700">
        <PromoSlider />

        {/* --- SECTION 1: GAME TERPOPULER --- */}
        {popularResults.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-white italic tracking-tighter flex items-center gap-2">
                <div className="w-2 h-6 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                GAME{" "}
                <span className="text-orange-500 uppercase">Terpopuler</span>
              </h3>
              <button className="text-[10px] font-black text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-[0.2em] border-b border-transparent hover:border-orange-500/50 pb-1">
                Lihat Semua
              </button>
            </div>

            {/* HAPUS class grid-cols di sini agar slider bisa berfungsi normal */}
            <div className="w-full">
              <PopularGames allGames={popularResults} />
            </div>
          </section>
        )}
        {/* --- SECTION 2: SEMUA GAME (HASIL FILTER/SEARCH) --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1.5 h-6 bg-gray-500 rounded-full"></div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
              {searchQuery ? `Hasil Pencarian: ${searchQuery}` : "Semua Game"}
            </h3>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-20 bg-[#1e2036] rounded-3xl border border-dashed border-white/10">
              <p className="text-gray-500 italic">Game tidak ditemukan...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredResults.map((game) => (
                <div
                  key={game.id}
                  // Mengarahkan ke rute detail sesuai App.jsx menggunakan slug game
                  onClick={() => {
                    console.log("Navigasi ke:", game.slug); // Cek apakah ini muncul di console
                    navigate(`/topup/${game.slug}`);
                  }}
                  className="group bg-[#1e2036] rounded-2xl p-3 border border-white/5 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                >
                  {/* Container Gambar */}
                  <div className="aspect-square w-full bg-[#0f101f] rounded-xl overflow-hidden relative shadow-inner">
                    <img
                      src={game.image_url}
                      alt={game.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                    {/* Badge Populer jika ada */}
                    {game.is_popular && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-[8px] font-black px-2 py-1 rounded-md text-white shadow-lg">
                        POPULER
                      </div>
                    )}
                  </div>

                  {/* Info Game */}
                  <div className="mt-3 px-1 text-center sm:text-left">
                    <h4 className="text-white font-bold text-sm truncate tracking-tight group-hover:text-orange-500 transition-colors">
                      {game.name}
                    </h4>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-0.5 opacity-60">
                      {game.category_type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- SECTION 3: INDEX MINI --- */}
        <div className="space-y-6">
          <GameGridMini allGames={filteredResults} />
        </div>

        <About />
      </div>
    </div>
  );
};

export default MainContent;
