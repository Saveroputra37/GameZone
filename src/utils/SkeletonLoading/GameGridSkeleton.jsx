import React from "react";

// 1. Skeleton untuk satu ikon game kecil
export const GameSkeleton = () => (
  <div className="flex flex-col items-center gap-2 animate-pulse">
    {/* Kotak Ikon */}
    <div className="aspect-square w-full max-w-[54px] bg-white/5 rounded-2xl shadow-inner"></div>
    {/* Garis Nama Game */}
    <div className="h-1.5 w-10 bg-white/5 rounded-full mt-1"></div>
  </div>
);

// 2. Skeleton untuk satu seksi (Index All atau Popular)
export const SectionSkeleton = ({ title, highlight }) => (
  <section className="bg-[#1e2036] py-6 px-5 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
    {/* Header Skeleton */}
    <div className="flex flex-col gap-5 mb-8 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-4 bg-white/10 rounded-full"></div>
        <div className="h-3 w-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Filter Buttons Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-7 w-16 bg-white/5 rounded-xl border border-white/5"
          ></div>
        ))}
      </div>
    </div>

    {/* Grid Skeleton */}
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-5 xl:grid-cols-6 gap-4">
      {[...Array(12)].map((_, i) => (
        <GameSkeleton key={i} />
      ))}
    </div>
  </section>
);

// 3. Skeleton untuk Banner/PromoSlider (Opsional)
export const BannerSkeleton = () => (
  <div className="w-full aspect-[21/9] md:aspect-[3/1] bg-white/5 rounded-[2.5rem] animate-pulse border border-white/5"></div>
);
