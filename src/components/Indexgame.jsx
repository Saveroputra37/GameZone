import React from "react";

const GameGridMini = () => {
  const games = [
    {
      id: 1,
      name: "MLBB",
      category: "Mobile",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F2024109%2Frcks2r0xntbibkh7gf72p.png&w=96&q=75",
    },
    {
      id: 2,
      name: "Free Fire",
      category: "Mobile",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F2024711%2F93cu2pbsceeiior5v9yc2q.png&w=96&q=75",
    },
    {
      id: 3,
      name: "Honkai Star Rail",
      category: "Turn-based",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F20231123%2Fnh1ml0rql8nxa0w41l267q.jpg&w=96&q=75",
    },
    {
      id: 4,
      name: "Valorant",
      category: "PC",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F2025912%2F86mt5fachnjxmtgoj1dtt.png&w=96&q=75",
    },
    {
      id: 5,
      name: "PUBGM",
      category: "Battle",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F2025912%2Fsvscgp90f1nhgyysqa4ox4.png&w=64&q=75",
    },
    {
      id: 6,
      name: "HOK",
      category: "MOBA",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F202434%2Fimhgilj9toq9myw6mc0jo.jpg&w=64&q=75",
    },
    {
      id: 7,
      name: "Wild Rift",
      category: "MOBA",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F20231122%2F6iixx4bcqfy724vcvdpzbj.jpg&w=64&q=75",
    },
    {
      id: 8,
      name: "Roblox",
      category: "Sandbox",
      image:
        "https://d1x91p7vw3vuq8.cloudfront.net/game/2025124/37ydaoih1ejcankaj8qxr7.svg",
    },
    {
      id: 9,
      name: "magic chess go go",
      category: "Strategy",
      image:
        "https://imgop.itemku.com/?url=https%3A%2F%2Fd1x91p7vw3vuq8.cloudfront.net%2Fgame%2F202536%2Fyr315dhbf9mr91hu8hq8e.jpg&w=96&q=75",
    },
  ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5 ">
        <section className="space-y-4 bg-[#1e2036] py-5 px-2 rounded-lg uppercase tracking-wider">
          {/* Header Kecil */}
          <div className="flex items-center gap-2 px-2 mb-5">
            <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
            <h3 className="text-[1rem] font-black text-gray-400 uppercase tracking-[0.2em]">
              Index All <span className="text-white">Games</span>
            </h3>
          </div>

          {/* Grid Ikon Kecil */}
          {/* Di HP muat 4 kolom, di Desktop muat hingga 8 kolom */}
          <div className="grid grid-cols-6 md:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
              >
                {/* Wadah Ikon Bulat/Rounded */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#1e2036] rounded-2xl border border-white/5 group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Badge Mini */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-[#1e2036]"></div>
                </div>

                {/* Nama Game Singkat */}
                <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors truncate w-full text-center tracking-tight">
                  {game.name}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4 bg-[#1e2036] py-5 px-2 rounded-lg uppercase tracking-wider">
          {/* Header Kecil */}
          <div className="flex items-center gap-2 px-2 mb-5">
            <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
            <h3 className="text-[1rem] font-black text-gray-400 uppercase tracking-[0.2em]">
              Index All <span className="text-white">Games</span>
            </h3>
          </div>

          {/* Grid Ikon Kecil */}
          {/* Di HP muat 4 kolom, di Desktop muat hingga 8 kolom */}
          <div className="grid grid-cols-6 md:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
              >
                {/* Wadah Ikon Bulat/Rounded */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#1e2036] rounded-2xl border border-white/5 group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Badge Mini */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-[#1e2036]"></div>
                </div>

                {/* Nama Game Singkat */}
                <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors truncate w-full text-center tracking-tight">
                  {game.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
};

export default GameGridMini;
