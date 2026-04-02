import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProduct";
import { motion, AnimatePresence } from "framer-motion"; // Pastikan sudah install framer-motion

const TopUpDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const game = categories?.find((g) => g.slug === slug);
  const { data: products, isLoading: productsLoading } = useProducts(game?.id);

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!game && !categories) return null; // Menghindari flash UI saat loading

  return (
    <div className="min-h-screen bg-[#0b0c14] text-slate-200 selection:bg-orange-500/30">
      {/* Tombol Back Minimalis */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all group"
      >
        <svg
          xmlns="http://w3.org"
          className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Hero Banner Area */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={game?.image_url}
          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c14] via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: PROFIL GAME */}
          <div className="lg:col-span-4 lg:sticky lg:top-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.03] backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative"
            >
              {/* Aksen Cahaya di Background agar tidak sepi */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full" />

              <div className="flex flex-row lg:flex-col items-center lg:items-start gap-5">
                {/* GAMBAR UKURAN KECIL & ESTETIK */}
                <div className="relative flex-none">
                  <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transform lg:-rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    {game?.image_url ? (
                      <img
                        src={game.image_url}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Placeholder jika gambar kosong */
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-2xl font-black text-white/20">
                        {game?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  {/* Badge Online Kecil */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#1e2036]" />
                </div>

                {/* TEXT INFO */}
                <div className="flex-1">
                  <h1 className="text-xl lg:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
                    {game?.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[9px] bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border border-orange-500/30">
                      Verified
                    </span>
                    <span className="text-[9px] bg-white/5 text-slate-400 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border border-white/10">
                      {game?.category_type || "Game"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="hidden lg:block text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-5 mt-5 italic">
                "Layanan pengisian instan 24 jam. Pastikan data akun sudah
                sesuai sebelum melakukan pembayaran."
              </p>
            </motion.div>
          </div>

          {/* SISI KANAN: FLOW TOPUP */}
          <div className="lg:col-span-8 space-y-8">
            {/* STEP 1: AKUN */}
            <section className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex-none w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center font-black text-black shadow-lg shadow-orange-500/20">
                  01
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Detail Akun
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">
                    User ID
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-700 font-mono"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">
                    Zone ID
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-700 font-mono"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* STEP 2: NOMINAL */}
            <section className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex-none w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center font-black text-black shadow-lg shadow-orange-500/20">
                  02
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Pilih Produk
                </h2>
              </div>

              {productsLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-pulse">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-white/5 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {products?.map((item) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={item.id}
                      onClick={() => setSelectedProduct(item)}
                      className={`relative group p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-center items-center text-center overflow-hidden ${
                        selectedProduct?.id === item.id
                          ? "bg-orange-500/10 border-orange-500 shadow-xl shadow-orange-500/10"
                          : "bg-white/[0.03] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <p
                        className={`font-bold text-sm mb-1 transition-colors ${selectedProduct?.id === item.id ? "text-orange-400" : "text-slate-300"}`}
                      >
                        {item.name}
                      </p>
                      <p className="text-[11px] font-black text-slate-500 tracking-wider">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                      </p>

                      {selectedProduct?.id === item.id && (
                        <motion.div
                          layoutId="active-bg"
                          className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* ACTION BAR (Sticky Mobile) */}
            <div className="sticky bottom-6 lg:relative">
              <button
                disabled={!userId || !selectedProduct}
                className={`group w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-3 overflow-hidden relative ${
                  userId && selectedProduct
                    ? "bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:shadow-orange-500/40"
                    : "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
                }`}
              >
                <span className="relative z-10">Bayar Sekarang</span>
                {userId && selectedProduct && (
                  <svg
                    xmlns="http://w3.org"
                    className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpDetail;
