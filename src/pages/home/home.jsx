import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/Maincontent";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-[#0f101f]">
      {/* Sidebar hanya dipanggil SATU KALI di sini */}
      <div className="fixed inset-y-0 z-100">
        <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Main Content dengan margin-left agar tidak tertutup Sidebar */}
      <main className="flex-1 lg:ml-72 w-full overflow-x-hidden">
        <MainContent />
      </main>

    </div>
  );
};

export default Home;
