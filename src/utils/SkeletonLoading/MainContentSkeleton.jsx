import React from "react";

const MainContentSkeleton = () => {
  return (
    <div className="animate-pulse space-y-10 w-full lg:ml-52">
      {/* Skeleton Slider - Pastikan tinggi & radius sama dengan PromoSlider */}
      <div className="w-full h-48 md:h-72 lg:h-80 bg-[#1e2036] rounded-[2.5rem] border border-white/5"></div>

      {/* Skeleton Grid Games */}
      <div className="space-y-6">
        <div className="h-8 bg-gray-800 rounded-xl w-48"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1e2036] rounded-[2rem] p-5 border border-white/5 space-y-4"
            >
              <div className="aspect-square w-full bg-[#0f101f] rounded-2xl"></div>
              <div className="h-4 bg-gray-800 rounded-lg w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContentSkeleton;
