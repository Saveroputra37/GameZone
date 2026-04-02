import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PopularGame = ({ allGames = [] }) => {
  const navigate = useNavigate();

  if (allGames.length === 0) return null;

  return (
    /* Hapus section wrapper dan ganti dengan div biasa agar tidak merusak spacing */
    <div className="w-full">
      {/* Container Scroll: Pastikan no-scrollbar agar desain tetap sleek seperti di Gambar 11 */}
      <div className="flex overflow-x-auto gap-5 md:gap-7 pb-8 px-2 no-scrollbar snap-x scroll-smooth">
        {" "}
        {allGames.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
            /* Navigasi menggunakan slug sesuai rute di App.jsx */
            onClick={() => navigate(`/topup/${game.slug || game.id}`)}
            className="flex-none w-35 sm:w-40 md:w-45 group relative bg-[#1e2036] rounded-4xl p-3 border border-white/5 cursor-pointer snap-start transition-all duration-500 hover:border-orange-500/40"
          >
            {/* Card Image */}
            <div className="aspect-square w-full  rounded-3xl mb-3 overflow-hidden relative border border-white/5 shadow-inner">
              <img
                src={game.image_url}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              {/* Badge HOT sesuai Screenshot 17 */}
              <div className="absolute top-2 right-2 bg-orange-500 text-[7px] font-black px-2 py-1 rounded-lg text-white shadow-lg">
                HOT
              </div>
            </div>

            {/* Title & Info */}
            <div className="px-1 text-center sm:text-left">
              <h4 className="text-white font-bold text-[12px] sm:text-sm truncate uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                {game.name}
              </h4>
              <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest mt-1 opacity-60">
                {game.category_type}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularGame;
