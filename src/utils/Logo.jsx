import React from "react";

const Logo = ({ className = "h-10" }) => {
  return (
    <div
      className={`flex items-center gap-2 group cursor-pointer ${className}`}
    >
      {/* Icon Group */}
      <div className="relative flex items-center justify-center">
        {/* Lingkaran Oranye Utama */}
        <div className="w-9 h-9 bg-[#f44336] rounded-full flex items-center justify-center shadow-lg shadow-red-500/20">
          {/* Ikon Controller Putih (SVG) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-white"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 12h.01M9 12h.01M15 12h.01M18 12h.01" />
            <path d="M11.47 10.13a2.5 2.5 0 1 0-2.94 2.94l.53 2.1a1 1 0 0 0 .97.76h4.1a1 1 0 0 0 .97-.76l.53-2.1a2.5 2.5 0 1 0-2.94-2.94" />
          </svg>
        </div>
      </div>

      {/* Teks Logo */}
      <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
        GAMEZONE<span className="text-orange-500 font-mono">.ID</span>
      </span>
    </div>
  );
};

export default Logo;
