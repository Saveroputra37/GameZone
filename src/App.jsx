import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import Pages (Gunakan PascalCase untuk nama komponen)
import LayoutLogin from "./pages/login/layoutlogin"; // Sesuaikan jika nama file aslinya layoutlogin.jsx
import Home from "./pages/home/home";
import FAQPage from "./pages/FAQ/FormQuestion"; // Pastikan folder FAQ dan file FormQuestion ada

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Halaman Login & Signup (Gabungan) */}
        <Route path="/login" element={<LayoutLogin />} />

        {/* 2. Halaman Utama (Beranda) */}
        <Route path="/" element={<Home />} />

        {/* 3. Halaman Bantuan (FAQ & Contact) */}
        <Route path="/faq" element={<FAQPage />} />

        {/* 4. Catch-all: Jika user mengetik URL ngawur, arahkan ke Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
