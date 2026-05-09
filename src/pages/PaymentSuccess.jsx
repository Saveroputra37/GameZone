import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home, Receipt, Clock } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const { game, product, payment, userId, zoneId } = orderData;

  return (
    <div className="min-h-screen bg-[#0f101f] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#1e2036] rounded-[2.5rem] border border-white/10 shadow-2xl p-8 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-green-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-black text-white mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Top up Anda sedang diproses. Item akan masuk dalam 1-5 menit.
        </p>

        {/* Order Details */}
        <div className="bg-white/5 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={game.image_url}
              alt={game.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="text-left flex-1">
              <p className="font-bold text-white text-sm">{game.name}</p>
              <p className="text-xs text-slate-400">{product.name}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">User ID:</span>
              <span className="text-white font-mono">{userId}</span>
            </div>
            {zoneId && (
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Zone ID:</span>
                <span className="text-white font-mono">{zoneId}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Pembayaran:</span>
              <span className="text-white">{payment.name}</span>
            </div>
            <div className="flex justify-between text-xs font-bold border-t border-white/10 pt-2 mt-2">
              <span className="text-slate-400">Total:</span>
              <span className="text-orange-400">
                Rp {(product.price + payment.fee).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-blue-400 mt-0.5 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-semibold text-blue-300 mb-1">
                Estimasi Waktu Proses
              </p>
              <p className="text-xs text-blue-200">
                1-5 menit untuk transfer bank, 1-15 menit untuk e-wallet
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Kembali ke Beranda
          </button>

          <button
            onClick={() => navigate("/cek-pesanan")}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Receipt size={18} />
            Cek Status Pesanan
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500 mt-6">
          Terima kasih telah menggunakan layanan kami!
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;