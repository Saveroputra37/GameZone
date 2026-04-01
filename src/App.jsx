import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";


// Import Pages
import Layoutlogin from "./pages/login/layoutlogin";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route Publik: Bisa diakses siapa saja */}
        <Route path="/login" element={<Layoutlogin />} />

        {/* Route Terproteksi: Hanya untuk user yang sudah login */}
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Catch-all: Redirect ke home jika route tidak ada */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
