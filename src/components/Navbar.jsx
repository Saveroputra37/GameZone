import { useState } from "react";
import {
  Menu,
  X,
  LogIn,
  LayoutGrid,
  ShoppingCart,
  Tag,
  BookOpen,
  Phone,
  UserPen,
  LogOut,
  HelpCircle,
} from "lucide-react";
import Logo from "../utils/Logo";
import SearchInput from "../utils/searchbar";
import { useUser, SignOutButton,useClerk } from "@clerk/clerk-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { openUserProfile } = useClerk();
const [isProfileOpen, setIsProfileOpen] = useState(false);


console.log(user);


  const menuItems = [
    {
      name: "Topup Games",
      href: "/",
      icon: <LayoutGrid size={20} />,
      active: true,
    },
    {
      name: "Cek Pesanan",
      href: "/cek-pesanan",
      icon: <ShoppingCart size={20} />,
    },
    { name: "Daftar Harga", href: "/harga", icon: <Tag size={20} /> },
    { name: "Panduan", href: "/panduan", icon: <BookOpen size={20} /> },
    { name: "Kontak Kami", href: "/kontak", icon: <Phone size={20} /> },
    { name: "Pertanyaan Umum", href: "/faq", icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* --- MOBILE HEADER (Hanya muncul di HP) --- */}
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
        {/* Logo Section */}
        <div className="mb-10 hidden lg:block">
          <Logo />
        </div>

        {/* Tombol Close di Mobile Sidebar */}
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

        {/* Search di dalam Sidebar (Mobile & Desktop) */}
        <div className="mb-8">
          <SearchInput />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${
                  item.active
                    ? "bg-[#0f101f] text-white border-l-4 border-orange-500 shadow-lg"
                    : "text-gray-400 hover:bg-[#0f101f] hover:text-white"
                }`}
            >
              <span
                className={`${item.active ? "text-orange-500" : "group-hover:text-orange-500"}`}
              >
                {item.icon}
              </span>
              <span className="text-sm font-semibold tracking-wide">
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Login/User Action di Bagian Bawah */}
        <div className="mt-auto pt-6 border-t border-white/5">
          {isSignedIn ? (
            /* --- TAMPILAN SAAT SUDAH LOGIN --- */
            <div className="space-y-2 relative">
              {/* --- TOMBOL PROFIL (TRIGGER) --- */}
              <div
                role="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 px-4 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 cursor-pointer rounded-2xl shadow-lg shadow-orange-500/30 border border-orange-400/50 transition-all duration-300 group active:scale-95 ${isProfileOpen ? "ring-4 ring-orange-500/20" : ""}`}
              >
                <div className="w-11 h-11 rounded-full border-2 border-white/80 overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:rotate-6">
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
                  <p className="text-[10px] font-bold text-orange-100 truncate mt-0.5 opacity-90 italic">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>

                {/* Ikon Panah Animasi */}
                <div
                  className={`text-white/70 transition-transform duration-300 ${isProfileOpen ? "rotate-90" : "rotate-0"}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* --- ISI DROPDOWN (ANIMATED) --- */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out space-y-1 ${isProfileOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
              >
                {/* Opsi Edit Profil (Opsional) */}
                <button
                  onClick={() => openUserProfile()}
                  className="flex items-center gap-4 w-full px-5 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 capitalize hover:text-red-500 transition-all group">
                  <UserPen
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span className="text-xs font-bold tracking-wide">
                    {user.emailAddresses[0].emailAddress.split("@")[0]}
                  </span>
                </button>

                {/* Tombol Logout */}
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
            /* --- TAMPILAN SAAT BELUM LOGIN --- */
            <a
              href="/login"
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 transition-all duration-300 group active:scale-95"
            >
              <LogIn
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span className="text-sm font-bold tracking-wide">
                Masuk Sekarang
              </span>
            </a>
          )}

          <p className="text-[10px] text-center text-gray-600 mt-6 font-bold tracking-widest uppercase">
            v.1.0.2 Opiion App
          </p>
        </div>
      </aside>

      {/* --- OVERLAY (Muncul saat sidebar terbuka di HP) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
