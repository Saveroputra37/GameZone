import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogIn,
  LayoutGrid,
  ShoppingCart,
  Tag,
  LogOut,
  HelpCircle,
  UserPen,
  Search,
} from "lucide-react";
import Logo from "../utils/Logo";
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";
import { useCategories } from "../hooks/useCategories";

const Sidebar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { data: allGames } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { openUserProfile } = useClerk();

  // Filter game untuk dropdown dengan memoisasi agar performa tetap terjaga
  const searchResults = React.useMemo(() => {
    if (!allGames || !searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return allGames.filter((game) => {
      const name = game?.name;
      return name && typeof name === "string"
        ? name.toLowerCase().includes(query)
        : false;
    });
  }, [allGames, searchQuery]);

  const menuItems = [
    { name: "Topup Games", href: "/", icon: <LayoutGrid size={22} /> },
    {
      name: "Cek Pesanan",
      href: "/cek-pesanan",
      icon: <ShoppingCart size={22} />,
    },
    { name: "Daftar Harga", href: "/harga", icon: <Tag size={22} /> },
    { name: "Pusat Bantuan", href: "/faq", icon: <HelpCircle size={22} /> },
  ];

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-[#1e2036] border-b border-white/5 px-6 py-5 flex justify-between items-center shadow-lg">
        <Logo className="scale-90" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 text-gray-400 hover:text-orange-500 bg-[#0f101f] rounded-xl transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- SIDEBAR CONTAINER (UKURAN DIPERBESAR) --- */}
      <aside
        className={`fixed left-0 top-0 h-screen z-50 bg-[#1e2036] border-r border-white/5 transition-all duration-500 ease-in-out
        ${isOpen ? "w-84 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-84"}
        flex flex-col p-8 shadow-2xl lg:shadow-[20px_0_50px_rgba(0,0,0,0.2)]`}
      >
        <div className="mb-12 hidden lg:block text-center transform hover:scale-105 transition-transform duration-300">
          <Logo />
        </div>

        {/* --- SEARCH SECTION --- */}
        <div className="mb-10 relative group">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search
                size={20}
                className={`transition-colors ${searchQuery ? "text-orange-500" : "text-gray-500"} group-focus-within:text-orange-500`}
              />
            </div>

            <input
              type="text"
              placeholder="Cari Game Favorit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f101f] text-[13px] text-gray-200 placeholder-gray-600 
                       rounded-2xl py-5 pl-14 pr-12 border border-white/5
                       focus:outline-none focus:border-orange-500/40 focus:ring-8 focus:ring-orange-500/5 
                       transition-all duration-300 shadow-inner font-bold tracking-wide"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-orange-500 transition-colors"
              >
                <X size={20} strokeWidth={3} />
              </button>
            )}
          </div>

          {/* DROPDOWN HASIL CARI */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute top-full left-0 w-full mt-3 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-999 overflow-hidden backdrop-blur-2xl bg-[#1e2036]/90"
              >
                {searchResults.length > 0 ? (
                  <div className="p-3 space-y-2 max-h-100 overflow-y-auto no-scrollbar">
                    {searchResults.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => {
                          navigate(`/topup/${game.slug}`);
                          setSearchQuery("");
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-4 w-full p-3 hover:bg-white/5 rounded-xl transition-all group border border-transparent hover:border-white/5"
                      >
                        <img
                          src={game.image_url}
                          className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-md"
                          alt=""
                        />
                        <div className="text-left overflow-hidden">
                          <p className="text-[13px] font-black text-gray-200 group-hover:text-orange-500 transition-colors truncate uppercase">
                            {game.name}
                          </p>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">
                            {game.category_type}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-[11px] text-gray-600 font-black uppercase tracking-[0.2em] italic">
                      Game Tidak Ditemukan
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- NAV LINKS --- */}
        <nav className="flex-1 space-y-3 overflow-y-auto no-scrollbar px-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-5 px-6 py-4.5 rounded-2xl transition-all duration-300 group relative
                ${isActive ? "bg-[#0f101f] text-white shadow-xl translate-x-2" : "text-gray-400 hover:bg-[#0f101f]/50 hover:text-gray-200 hover:translate-x-1"}
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1.5 h-8 bg-orange-500 rounded-r-full shadow-[4px_0_15px_rgba(249,115,22,0.5)]"
                    />
                  )}
                  <span
                    className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-orange-500" : "group-hover:text-orange-400"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[15px] font-black tracking-tight uppercase">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* --- USER PROFILE SECTION --- */}
        <div className="mt-auto pt-8 border-t border-white/5">
          {isSignedIn ? (
            <div className="space-y-3 relative">
              <div
                role="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-4 px-5 py-4 bg-linear-to-br from-orange-500 to-orange-700 cursor-pointer rounded-3xl shadow-[0_10px_25px_rgba(234,88,12,0.3)] border border-orange-400/30 transition-all duration-500 group ${isProfileOpen ? "ring-4 ring-orange-500/20" : "hover:scale-[1.02]"}`}
              >
                <div className="w-12 h-12 rounded-full border-2 border-white/80 overflow-hidden shrink-0 shadow-inner">
                  <img
                    src={user.imageUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden text-left flex-1">
                  <p className="text-sm font-black capitalize text-white truncate leading-tight tracking-tight">
                    {user.username || user.firstName}
                  </p>
                  <p className="text-[11px] font-bold text-orange-100/80 truncate mt-1">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-2 mt-2"
                  >
                    <button
                      onClick={() => openUserProfile()}
                      className="flex items-center gap-5 w-full px-6 py-4 rounded-xl text-gray-400 hover:bg-orange-500/10 hover:text-orange-500 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      <UserPen size={20} />
                      <span>Edit Profil</span>
                    </button>
                    <SignOutButton>
                      <button className="flex items-center gap-5 w-full px-6 py-4 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-widest">
                        <LogOut size={20} />
                        <span>Keluar Akun</span>
                      </button>
                    </SignOutButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-5 px-6 py-5 rounded-3xl bg-orange-600 hover:bg-orange-700 text-white shadow-2xl shadow-orange-900/20 transition-all duration-300 group active:scale-95"
            >
              <LogIn size={24} />
              <span className="text-md font-black uppercase tracking-tighter">
                Masuk Sekarang
              </span>
            </NavLink>
          )}
          <p className="text-[10px] text-center text-gray-600 mt-8 font-black tracking-[0.3em] uppercase italic opacity-40">
            v.1.0.2 Opiion App
          </p>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
