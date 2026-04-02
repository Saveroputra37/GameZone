import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";

// PERBAIKAN: Gunakan kurung kurawal { } dan return ( ) agar hook bisa dipanggil
const GameSection = ({ title, highlight, games = [] }) => {
  const navigate = useNavigate(); // Hook harus di dalam body fungsi komponen

  return (
    <section className="bg-[#1e2036] py-5 px-4 rounded-2xl border border-white/5 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
        <h3 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-[0.15em]">
          {title} <span className="text-white">{highlight}</span>
        </h3>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/topup/${game.slug}`)} // Sekarang navigasi akan bekerja
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="relative aspect-square w-full max-w-[64px] bg-[#252841] rounded-2xl border border-white/5 group-hover:border-orange-500/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
              <img
                src={game.image_url}
                alt={game.name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-[#1e2036]"></div>
            </div>
            <span className="text-[9px] md:text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors truncate w-full text-center tracking-tighter px-0.5">
              {game.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const GameGridMini = () => {
  const { data: allGames = [], isLoading, isError } = useCategories();

  if (isLoading)
    return <div className="text-center py-10 text-gray-400">Memuat...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Gagal memuat data</div>
    );

  const gamesIndexAll = allGames.filter((game) => !game.is_popular);
  const gamesPopular = allGames.filter((game) => game.is_popular);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GameSection
          title="Index All"
          highlight="Games"
          games={gamesIndexAll}
        />
        <GameSection title="Popular" highlight="Top Up" games={gamesPopular} />
      </div>
    </div>
  );
};

export default GameGridMini;
