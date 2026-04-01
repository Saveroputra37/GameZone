import React from "react";
import PromoSlider from "../utils/Promoslider";
import GameGridMini from "./Indexgame";
import About from "../utils/About";

const MainContent = () => {
  const games = [
    {
      id: 1,
      name: "Mobile Legends",
      category: "Mobile",
      image:
        "https://asset.indosport.com/article/image/q/80/311815/logo_mobile_legends-169.jpg?w=750&h=423",
    },
    {
      id: 2,
      name: "Free Fire",
      category: "Mobile",
      image:
        "https://cdn.antaranews.com/cache/1200x800/2022/06/20/Logo-Baru-Free-Fire.jpg",
    },
    {
      id: 3,
      name: "Genshin Impact",
      category: "PC/Mobile",
      image:
        "https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png",
    },
    {
      id: 4,
      name: "Valorant",
      category: "PC",
      image:
        "https://gamebrott.com/wp-content/uploads/2025/04/Valorant-Mobile.webp",
    },
    {
      id: 5,
      name: "PUBG Mobile",
      category: "Mobile",
      image:
        "https://cdn-bgp.bluestacks.com/BGP/id/gametiles_com.tencent.ig.jpg",
    },
    {
      id: 6,
      name: "Honor of Kings",
      category: "Mobile",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Q4Yyu4l-mTci8GNCjUFy-p9KWBljpHjQ4Q&s",
    },
  ];

  return (
    /* PERBAIKAN: Hapus lg:ml-72 di sini karena sudah diatur di Home.jsx */
    <div className="w-full transition-all duration-300 lg:ml-52">
      <div className="space-y-10">
        {/* --- SECTION 1: BANNER PROMO --- */}
        <PromoSlider />

        {/* --- SECTION 2: GRID DAFTAR GAME --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
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

          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="group bg-[#1e2036] rounded-xl p-4 border border-white/5 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg"
              >
                <div className="aspect-square w-full bg-[#0f101f] rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-2 right-2 bg-orange-500 text-[8px] font-black px-2 py-1 rounded-md text-white">
                    PROMO
                  </div>
                </div>
                <h4 className="text-white font-bold text-sm truncate">
                  {game.name}
                </h4>
                <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest mt-1">
                  {game.category}
                </p>
              </div>
            ))}
          </div>
        </section>

        <GameGridMini />
        <About />
      </div>
    </div>
  );
};

export default MainContent;
