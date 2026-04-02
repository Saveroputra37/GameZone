import React from "react";

const MainContentSkeleton = () => {
  return (
    /* Menghapus lg:ml-52 agar mengikuti flow flex-1 dari parent Home.js */
    <div className="animate-pulse space-y-12 w-full">
      {/* 1. Skeleton Slider - Sesuai dengan PromoSlider */}
      <div className="w-full h-40 sm:h-56 md:h-72 lg:h-80 bg-[#1e2036] rounded-3xl border border-white/5"></div>

      {/* 2. Skeleton Section: Game Terpopuler */}
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-gray-800 rounded-full"></div>
            <div className="h-6 bg-gray-800 rounded-lg w-40"></div>
          </div>
          <div className="h-4 bg-gray-800 rounded-md w-20"></div>
        </div>

        {/* Grid Game Terpopuler - Sesuaikan grid-cols dengan MainContent */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1e2036] rounded-2xl p-3 border border-white/5 space-y-4"
            >
              <div className="aspect-square w-full bg-[#0f101f] rounded-xl"></div>
              <div className="space-y-2 px-1">
                <div className="h-4 bg-gray-800 rounded-md w-3/4"></div>
                <div className="h-3 bg-gray-800 rounded-md w-1/2 opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Skeleton GameGridMini (Dua Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="bg-[#1e2036] py-5 px-4 rounded-2xl border border-white/5 space-y-6"
          >
            {/* Mini Header */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-gray-800 rounded-full"></div>
              <div className="h-4 bg-gray-800 rounded-md w-32"></div>
            </div>
            {/* Mini Grid Icons */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square max-w-16 bg-[#252841] rounded-2xl"></div>
                  <div className="h-2 bg-gray-800 rounded-full w-10"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Skeleton About */}
      <div className="pt-8 space-y-4">
        <div className="h-6 bg-gray-800 rounded-lg w-1/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded-full w-full"></div>
          <div className="h-3 bg-gray-800 rounded-full w-full"></div>
          <div className="h-3 bg-gray-800 rounded-full w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default MainContentSkeleton;
