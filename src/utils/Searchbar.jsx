import React from "react";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
      {/* Container Input */}
      <div className="relative w-full max-w-xl group">
        {/* Ikon Search */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search
            size={18}
            className="text-gray-500 group-focus-within:text-orange-500 transition-colors"
          />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Cari Apapun Disini"
          className="w-full bg-[#171938] text-sm text-gray-200 placeholder-gray-500 
                     rounded-full py-3 pl-12 pr-4 border border-transparent
                     focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 
                     transition-all duration-300 shadow-lg capitalize font-bold"
        />
      </div>

    </div>
  );
};

export default SearchInput;
