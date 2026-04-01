import React from "react";
import PromoSlider from "../utils/Promoslider";
import GameGridMini from "./Indexgame";

const MainContent = () => {
  // Contoh data game (Bisa ditarik dari API nantinya)
  const games = [
    {
      id: 1,
      name: "Mobile Legends",
      category: "Mobile",
      image:
        "https://asset.indosport.com/article/image/q/80/311815/logo_mobile_legends-169.jpg?w=750&h=423",
      price: 1500, // Harga mulai dari
      discount: 10, // Persentase diskon
    },
    {
      id: 2,
      name: "Free Fire",
      category: "Mobile",
      image:
        "https://cdn.antaranews.com/cache/1200x800/2022/06/20/Logo-Baru-Free-Fire.jpg",
      price: 1500, // Harga mulai dari
      discount: 10, // Persentase diskon
    },
    {
      id: 3,
      name: "Genshin Impact",
      category: "PC/Mobile",
      image:
        "https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png",
      price: 1500, // Harga mulai dari
      discount: 10, // Persentase diskon
    },
    {
      id: 4,
      name: "Valorant",
      category: "PC",
      image:
        "https://gamebrott.com/wp-content/uploads/2025/04/Valorant-Mobile.webp",
      price: 1500, // Harga mulai dari
      discount: 10, // Persentase diskon
    },
    {
      id: 5,
      name: "PUBG Mobile",
      category: "Mobile",
      image:
        "https://cdn-bgp.bluestacks.com/BGP/id/gametiles_com.tencent.ig.jpg",
      price: 1500, // Harga mulai dari
      discount: 10, // Persentase diskon
    },
    {
      id: 6,
      name: "Honor of Kings",
      category: "Mobile",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Q4Yyu4l-mTci8GNCjUFy-p9KWBljpHjQ4Q&s",
      price: 1500, // Harga mulai dari
      discount: 10, // Persentase diskon
    },
  ];

  return (
    <main className="flex-1 w-full lg:ml-72 transition-all duration-300">
      <div className="px-6 py-24 lg:py-10 max-w-7xl mx-auto space-y-10">
        <PromoSlider />

        <section className="space-y-6">
          {/* Header Section Tetap Sama */}

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
                  {/* Badge Diskon */}
                  {game.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-[10px] font-black px-2 py-1 rounded-md text-white shadow-lg">
                      -{game.discount}%
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-orange-500 text-[8px] font-black px-2 py-1 rounded-md text-white">
                    PROMO
                  </div>
                </div>

                <h4 className="text-white font-bold text-sm truncate">
                  {game.name}
                </h4>

                {/* 2. Tampilan Harga */}
                <div className="mt-2">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">
                    Mulai dari
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-orange-500 font-black text-sm">
                      Rp {game.price.toLocaleString("id-ID")}
                    </span>
                    {/* Harga asli jika ada diskon */}
                    {game.discount > 0 && (
                      <span className="text-gray-600 text-[10px] line-through decoration-red-500/50">
                        Rp {(game.price * 1.2).toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <GameGridMini />
      </div>
    </main>
  );
};

export default MainContent;
