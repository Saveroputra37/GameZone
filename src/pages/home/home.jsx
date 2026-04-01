import React from "react";
import Navbar from "../../components/Navbar";
import MainContent from "../../components/Maincontent";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-[#0f101f]">
      {/* Navigasi Sidebar */}
      <Navbar />

      {/* Konten Halaman */}
      <MainContent />
    </div>
  );
};

export default Home;
