import { useState } from "react";
import { NavLink } from "react-router-dom"; // Tambahkan ini
import { motion } from "framer-motion"; // Tambahkan ini
import {
  Menu,
  X,
  LogIn,
  LayoutGrid,
  ShoppingCart,
  Tag,
  BookOpen,
  User,
  LogOut,
  HelpCircle,
  UserPen,
} from "lucide-react";
import Logo from "../utils/Logo";
import SearchInput from "../utils/searchbar";
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { openUserProfile } = useClerk();

  const menuItems = [
    { name: "Topup Games", href: "/", icon: <LayoutGrid size={20} /> },
    {
      name: "Cek Pesanan",
      href: "/cek-pesanan",
      icon: <ShoppingCart size={20} />,
    },
    { name: "Daftar Harga", href: "/harga", icon: <Tag size={20} /> },
    { name: "Tentang Kami", href: "/about", icon: <User size={20} /> },
    { name: "Pusat Bantuan", href: "/faq", icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-[#1e2036] border-b border-white/5 px-4 py-4 flex justify-between items-center">
        <Logo className="scale-75" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-orange-500 bg-[#0f101f] rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={`fixed left-0 top-0 h-screen z-50 bg-[#1e2036] border-r border-white/5 transition-all duration-300 ease-in-out
        ${isOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-72"}
        flex flex-col p-6 shadow-2xl lg:shadow-none`}
      >
        <div className="mb-10 hidden lg:block">
          <Logo />
        </div>

        <div className="lg:hidden flex justify-between items-center mb-8">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            Menu Navigasi
          </span>
          <X
            size={20}
            className="text-gray-400"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="mb-8">
          <SearchInput />
        </div>

        {/* --- INTERACTIVE NAV LINKS --- */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)} // Tutup sidebar di mobile saat link diklik
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                ${
                  isActive
                    ? "bg-[#0f101f] text-white shadow-lg"
                    : "text-gray-400 hover:bg-[#0f101f]/50 hover:text-gray-200"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full"
                    />
                  )}

                  <span
                    className={`transition-colors duration-300 ${isActive ? "text-orange-500" : "group-hover:text-orange-400"}`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-sm font-bold tracking-wide ${isActive ? "opacity-100" : "opacity-80"}`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* --- USER ACTION / DROPDOWN --- */}
        <div className="mt-auto pt-6 border-t border-white/5">
          {isSignedIn ? (
            <div className="space-y-2 relative">
              <div
                role="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 px-4 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 cursor-pointer rounded-2xl shadow-lg border border-orange-400/50 transition-all duration-300 group active:scale-95 ${isProfileOpen ? "ring-4 ring-orange-500/20" : ""}`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:rotate-6">
                  <img
                    src={user.imageUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="overflow-hidden text-left flex-1">
                  <p className="text-xs font-black capitalize text-white truncate leading-tight">
                    {user.username || user.firstName}
                  </p>
                  <p className="text-[10px] font-bold text-orange-100 truncate mt-0.5 opacity-80">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>

                <div
                  className={`text-white/70 transition-transform duration-300 ${isProfileOpen ? "rotate-90" : ""}`}
                >
                  <Menu size={14} /> {/* Atau ikon panah */}
                </div>
              </div>

              {/* DROPDOWN MENU */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out space-y-1 ${isProfileOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
              >
                <button
                  onClick={() => openUserProfile()}
                  className="flex items-center gap-4 w-full px-5 py-3 rounded-xl text-gray-400 hover:bg-orange-500/10 hover:text-orange-500 transition-all group"
                >
                  <UserPen
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span className="text-xs font-bold tracking-wide">
                    Edit Profil
                  </span>
                </button>

                <SignOutButton>
                  <button className="flex items-center gap-4 w-full px-5 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all group">
                    <LogOut
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    <span className="text-xs font-bold tracking-wide">
                      Keluar Akun
                    </span>
                  </button>
                </SignOutButton>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all duration-300 group active:scale-95"
            >
              <LogIn
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span className="text-sm font-bold tracking-wide">
                Masuk Sekarang
              </span>
            </NavLink>
          )}
          <p className="text-[10px] text-center text-gray-600 mt-6 font-bold tracking-widest uppercase">
            v.1.0.2 Opiion App
          </p>
        </div>
      </aside>

      {/* --- OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
