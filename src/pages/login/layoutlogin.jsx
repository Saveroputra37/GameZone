import React, { useState } from "react";
import Signup from "../../layouts/Signup";
import Signin from "../../layouts/Signin";
import { motion, AnimatePresence } from "framer-motion";

function LayoutLogin() {
  // State untuk menentukan form mana yang aktif
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0f101f] flex flex-col items-center justify-center p-4">
      {/* Container dengan Animasi Perpindahan */}
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Signin />
              {/* Tombol Pindah ke Register */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Belum punya akun?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-orange-500 font-bold hover:underline underline-offset-4"
                  >
                    Daftar Gratis
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Signup />
              {/* Tombol Pindah ke Login */}
              <div className="-mt-15 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Sudah punya akun?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-orange-500 font-bold hover:underline underline-offset-4"
                  >
                    Masuk Sekarang
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Tambahan */}
      <p className="mt-10 text-[10px] text-gray-600 font-bold tracking-widest uppercase">
        © 2024 Opiion App • Secure Payment
      </p>
    </div>
  );
}

export default LayoutLogin;
