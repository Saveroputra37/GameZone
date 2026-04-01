import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
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
      {/* Sidebar tetap Fixed di kiri */}
      <Navbar />

      {/* 
          GUNAKAN pl (Padding Left) saja untuk memberi ruang Sidebar.
          PASTIKAN lebar pl sama dengan lebar Sidebar (w-72 = 288px).
      */}
      <main className="flex-1 lg:pl-72 transition-all duration-300">
        <div className="px-6 py-24 lg:py-10 max-w-6xl">
          {/* Hapus mx-auto jika ingin mepet ke kiri dekat sidebar, 
              Gunakan mx-auto jika ingin konten tetap di tengah setelah sidebar */}

          {isLoading ? (
            <MainContentSkeleton />
          ) : (
            <div className="animate-in fade-in duration-700">
              <MainContent />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
