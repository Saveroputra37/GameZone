import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import Pages
import LayoutLogin from "./pages/login/layoutlogin";
import Home from "./pages/home/home";
import FAQPage from "./pages/FAQ/FormQuestion";
import TopUpDetail from "./pages/Topupdetail/TopUpDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Halaman Login & Signup */}
        <Route path="/login" element={<LayoutLogin />} />

        {/* 2. Halaman Utama (Beranda) */}
        {/* Di dalam komponen Home ini nanti kita kelola searchQuery */}
        <Route path="/" element={<Home />} />

        {/* 3. Halaman Bantuan (FAQ & Contact) */}
        <Route path="/faq" element={<FAQPage />} />

        {/* 4. Halaman Detail Topup berdasarkan Slug */}
        <Route path="/topup/:slug" element={<TopUpDetail />} />

        {/* 5. Catch-all: Proteksi URL Salah */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
