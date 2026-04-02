import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/Maincontent";
import MainContentSkeleton from "../../utils/SkeletonLoading/MainContentSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f101f] overflow-x-hidden">
      {/* Sidebar - Pastikan di komponen Sidebar kamu menggunakan hidden lg:block atau mekanisme Drawer */}
      <Sidebar />

      {/* MAIN SECTION:
          1. lg:ml-60: Memberi ruang untuk Sidebar di desktop (sesuaikan dengan lebar sidebar-mu).
          2. flex-1: Mengambil sisa ruang yang ada.
          3. w-full: Memastikan lebar penuh di mobile.
      */}
      <main className="flex-1 lg:ml-60 transition-all duration-300 w-full">
        {/* INNER CONTAINER:
            - mx-auto: Menjaga konten tetap di tengah layar.
            - px-4: Padding kecil di mobile agar konten tidak mepet layar.
            - md:px-10: Padding lebih luas di tablet/desktop.
            - py-24: Memberi ruang untuk Navbar/Header mobile di bagian atas.
        */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-20 lg:py-10">
          {isLoading ? (
            <MainContentSkeleton />
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-700">
              <MainContent />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
