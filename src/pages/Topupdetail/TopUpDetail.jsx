import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProduct";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Clock,
  Shield,
  Star,
  ChevronRight,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";

const TopUpDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: categories } = useCategories();
  const game = categories?.find((g) => g.slug === slug);
  const { data: products, isLoading: productsLoading } = useProducts(game?.id);

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [lastPaymentTime, setLastPaymentTime] = useState(null);

  // Data metode pembayaran dengan kompatibilitas produk
  const paymentMethods = [
    {
      id: "bca",
      name: "BCA Transfer",
      type: "bank",
      icon: <Building2 size={20} />,
      fee: 0,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      supportedProducts: ["all"], // Mendukung semua produk
      minAmount: 10000,
      maxAmount: 10000000,
      processingTime: "1-3 menit",
      securityLevel: "high",
    },
    {
      id: "mandiri",
      name: "Mandiri Transfer",
      type: "bank",
      icon: <Building2 size={20} />,
      fee: 0,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      supportedProducts: ["all"],
      minAmount: 10000,
      maxAmount: 10000000,
      processingTime: "1-3 menit",
      securityLevel: "high",
    },
    {
      id: "gopay",
      name: "GoPay",
      type: "ewallet",
      icon: <Smartphone size={20} />,
      fee: 1500,
      color: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      supportedProducts: ["mobile", "diamond"], // Khusus untuk mobile games
      minAmount: 5000,
      maxAmount: 2000000,
      processingTime: "Instant",
      securityLevel: "medium",
    },
    {
      id: "ovo",
      name: "OVO",
      type: "ewallet",
      icon: <Smartphone size={20} />,
      fee: 1500,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      supportedProducts: ["mobile", "diamond"],
      minAmount: 5000,
      maxAmount: 2000000,
      processingTime: "Instant",
      securityLevel: "medium",
    },
    {
      id: "dana",
      name: "DANA",
      type: "ewallet",
      icon: <Smartphone size={20} />,
      fee: 1500,
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-600/10",
      borderColor: "border-blue-600/30",
      supportedProducts: ["mobile", "diamond"],
      minAmount: 5000,
      maxAmount: 2000000,
      processingTime: "Instant",
      securityLevel: "medium",
    },
  ];

  // Fungsi untuk mendapatkan metode pembayaran yang kompatibel dengan produk
  const getCompatiblePaymentMethods = () => {
    if (!selectedProduct) return paymentMethods;

    return paymentMethods
      .filter((method) => {
        // Jika produk mendukung semua metode
        if (method.supportedProducts.includes("all")) return true;

        // Cek kompatibilitas berdasarkan kategori game
        const gameCategory = game?.category_type?.toLowerCase();
        if (method.supportedProducts.includes(gameCategory)) return true;

        // Cek berdasarkan tipe produk
        const productType = selectedProduct?.name?.toLowerCase();
        if (
          method.supportedProducts.some((type) => productType?.includes(type))
        )
          return true;

        return false;
      })
      .filter((method) => {
        // Filter berdasarkan jumlah minimal dan maksimal
        const totalAmount = selectedProduct?.price + method.fee;
        return (
          totalAmount >= method.minAmount && totalAmount <= method.maxAmount
        );
      });
  };

  // Fungsi validasi keamanan
  const validateSecurity = () => {
    const now = Date.now();
    const timeSinceLastPayment = lastPaymentTime
      ? now - lastPaymentTime
      : Infinity;

    // Rate limiting: maksimal 3 percobaan dalam 5 menit
    if (paymentAttempts >= 3 && timeSinceLastPayment < 300000) {
      // 5 menit
      return {
        valid: false,
        error: "Terlalu banyak percobaan pembayaran. Silakan tunggu 5 menit.",
      };
    }

    // Validasi input sanitization
    if (userId && /[<>\"'&]/.test(userId)) {
      return {
        valid: false,
        error: "User ID mengandung karakter yang tidak valid.",
      };
    }

    if (zoneId && /[<>\"'&]/.test(zoneId)) {
      return {
        valid: false,
        error: "Zone ID mengandung karakter yang tidak valid.",
      };
    }

    // Validasi panjang input
    if (userId && userId.length > 20) {
      return {
        valid: false,
        error: "User ID terlalu panjang (maksimal 20 karakter).",
      };
    }

    if (zoneId && zoneId.length > 10) {
      return {
        valid: false,
        error: "Zone ID terlalu panjang (maksimal 10 karakter).",
      };
    }

    return { valid: true };
  };

  // Validasi input dengan keamanan tambahan
  const validateInputs = () => {
    const newErrors = {};

    // Validasi keamanan terlebih dahulu
    const securityCheck = validateSecurity();
    if (!securityCheck.valid) {
      newErrors.security = securityCheck.error;
      setErrors(newErrors);
      return false;
    }

    if (!userId.trim()) {
      newErrors.userId = "User ID wajib diisi";
    } else if (!/^\d+$/.test(userId.trim())) {
      newErrors.userId = "User ID harus berupa angka";
    }

    if (
      game?.category_type?.toLowerCase().includes("mobile") &&
      !zoneId.trim()
    ) {
      newErrors.zoneId = "Zone ID wajib diisi untuk game mobile";
    }

    if (!selectedProduct) {
      newErrors.product = "Pilih produk terlebih dahulu";
    }

    if (!selectedPayment) {
      newErrors.payment = "Pilih metode pembayaran";
    } else {
      // Validasi kompatibilitas metode pembayaran dengan produk
      const compatibleMethods = getCompatiblePaymentMethods();
      const isCompatible = compatibleMethods.some(
        (method) => method.id === selectedPayment.id,
      );

      if (!isCompatible) {
        newErrors.payment =
          "Metode pembayaran ini tidak kompatibel dengan produk yang dipilih";
        setSelectedPayment(null); // Reset pilihan pembayaran
      }

      // Validasi batas jumlah
      const totalAmount = selectedProduct?.price + selectedPayment.fee;
      if (totalAmount < selectedPayment.minAmount) {
        newErrors.payment = `Minimal pembayaran Rp ${selectedPayment.minAmount.toLocaleString()}`;
      } else if (totalAmount > selectedPayment.maxAmount) {
        newErrors.payment = `Maksimal pembayaran Rp ${selectedPayment.maxAmount.toLocaleString()}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle proses pembayaran dengan keamanan tambahan
  const handlePayment = async () => {
    if (!validateInputs()) return;

    // Rate limiting check
    const now = Date.now();
    if (
      paymentAttempts >= 3 &&
      lastPaymentTime &&
      now - lastPaymentTime < 300000
    ) {
      setErrors({
        security:
          "Terlalu banyak percobaan. Silakan tunggu sebelum mencoba lagi.",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentAttempts((prev) => prev + 1);
    setLastPaymentTime(now);

    try {
      // Simulasi API call dengan timeout
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Timeout")), 30000); // 30 detik timeout

        // Simulasi pemrosesan
        setTimeout(() => {
          clearTimeout(timeout);
          resolve();
        }, 2000);
      });

      // Generate unique transaction ID untuk keamanan
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Redirect ke halaman sukses dengan data yang aman
      navigate(`/payment-success/${transactionId}`, {
        state: {
          game: game,
          product: selectedProduct,
          payment: selectedPayment,
          userId: userId.trim(),
          zoneId: zoneId.trim(),
          transactionId,
          timestamp: now,
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      setErrors({
        payment:
          error.message === "Timeout"
            ? "Pembayaran timeout. Silakan coba lagi."
            : "Pembayaran gagal. Silakan coba lagi atau hubungi support.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset payment method when product changes
  useEffect(() => {
    if (selectedProduct && selectedPayment) {
      const compatibleMethods = getCompatiblePaymentMethods();
      const isCompatible = compatibleMethods.some(
        (method) => method.id === selectedPayment.id,
      );
      if (!isCompatible) {
        setSelectedPayment(null);
        setErrors((prev) => ({
          ...prev,
          payment:
            "Metode pembayaran sebelumnya tidak kompatibel dengan produk baru",
        }));
      }
    }
  }, [selectedProduct]);

  // Generate CSRF token simulation
  const [csrfToken] = useState(
    () => `csrf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  );

  // Enhanced copy to clipboard with security
  const copyToClipboard = (text) => {
    if (!text || typeof text !== "string") return;

    // Sanitize text before copying
    const sanitizedText = text.replace(/[<>\"'&]/g, "");
    navigator.clipboard.writeText(sanitizedText);

    // Log copy action for security monitoring
    console.log(`Copied to clipboard: ${sanitizedText.substring(0, 10)}...`);
  };

  if (!game && !categories) return null;

  return (
    <div className="min-h-screen bg-[#0b0c14] text-slate-200 selection:bg-orange-500/30">
      {/* Tombol Back Minimalis */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all group"
      >
        <svg
          xmlns="http://w3.org"
          className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Hero Banner Area */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={game?.image_url}
          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          alt=""
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0c14] via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: PROFIL GAME */}
          <div className="lg:col-span-4 lg:sticky lg:top-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/3 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative"
            >
              {/* Aksen Cahaya di Background agar tidak sepi */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full" />

              <div className="flex flex-row  items-center lg:items-start gap-5">
                {/* GAMBAR UKURAN KECIL & ESTETIK */}
                <div className="relative flex-none">
                  <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transform lg:-rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    {game?.image_url ? (
                      <img
                        src={game.image_url}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Placeholder jika gambar kosong */
                      <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center text-2xl font-black text-white/20">
                        {game?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  {/* Badge Online Kecil */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#1e2036]" />
                </div>

                {/* TEXT INFO */}
                <div className="flex-1">
                  <h1 className="text-display text-xl lg:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
                    {game?.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-accent text-[9px] bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded-lg font-semibold uppercase tracking-wider border border-orange-500/30">
                      Verified
                    </span>
                    <span className="text-accent text-[9px] bg-white/5 text-slate-400 px-2.5 py-1 rounded-lg font-semibold uppercase tracking-wider border border-white/10">
                      {game?.category_type || "Game"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
                <p className="text-body text-xs md:text-sm text-slate-400 leading-relaxed italic">
                  "
                  {game?.description ||
                    "Layanan top up instan dan terpercaya. Pastikan ID akun sudah benar sebelum melakukan transaksi."}
                  "
                </p>
              </div>
            </motion.div>
          </div>

          {/* SISI KANAN: FLOW TOPUP */}
          <div className="lg:col-span-8 space-y-8">
            {/* STEP 1: AKUN */}
            <section className="bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex-none w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-accent font-black text-black shadow-lg shadow-orange-500/20">
                  01
                </span>
                <h2 className="text-heading text-xl font-bold text-white tracking-tight">
                  Detail Akun
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-accent text-xs font-semibold text-slate-500 ml-1  uppercase tracking-widest">
                    User ID
                  </label>
                  <input
                    type="text"
                    placeholder="Pastikan USER_ID sesuai"
                    className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-700 font-mono mt-5"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-accent text-xs font-semibold text-slate-500 ml-1 uppercase tracking-widest">
                    Zone ID
                  </label>
                  <input
                    type="text"
                    placeholder="Pastikan Zone_ID sesuai"
                    className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-700 font-mono mt-5"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                  />
                </div>
              </div>

              {/* Panduan Cara Dapatkan ID */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <p className="font-semibold text-blue-300 mb-2">
                      Cara Mendapatkan User ID & Zone ID:
                    </p>
                    <ul className="space-y-1 text-slate-400">
                      <li>• Masuk ke dalam game</li>
                      <li>• Pergi ke menu profil/akun</li>
                      <li>• Copy User ID dan Zone ID (jika ada)</li>
                      <li>• Pastikan ID sudah benar sebelum top up</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Error Messages */}
              {(errors.userId || errors.zoneId) && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle size={14} />
                    <span>{errors.userId || errors.zoneId}</span>
                  </div>
                </div>
              )}
            </section>

            {/* STEP 2: NOMINAL */}
            <section className="bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex-none w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-accent font-black text-black shadow-lg shadow-orange-500/20">
                  02
                </span>
                <h2 className="text-heading text-xl font-bold text-white tracking-tight">
                  Pilih Produk
                </h2>
              </div>

              {productsLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-pulse">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-white/5 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols- sm:grid-cols-3 gap-3 md:gap-4">
                  {products?.map((item) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={item.id}
                      onClick={() => setSelectedProduct(item)}
                      className={`relative group p-4 rounded-4xl border-2 transition-all cursor-pointer flex flex-col justify-center items-center text-center overflow-hidden ${
                        selectedProduct?.id === item.id
                          ? "bg-orange-500/10 border-orange-500 shadow-xl shadow-orange-500/10"
                          : "bg-white/3 border-white/5 hover:border-white/10"
                      }`}
                    >
                      {/* ICON CURRENCY KECIL */}
                      <div className="flex items-center justify-center gap-x-3">
                        <span className="text-xl mb-2 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                          <img
                            src={item.currency_icon}
                            alt="gambar"
                            className="size-8"
                          />
                        </span>
                        <div>
                          <p
                            className={`font-bold text-[13px] mb-1 transition-colors ${selectedProduct?.id === item.id ? "text-orange-400" : "text-slate-300"}`}
                          >
                            {item.name}
                          </p>

                          <p className="text-[10px] font-black text-slate-500 tracking-wider">
                            Rp {Number(item.price).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      {selectedProduct?.id === item.id && (
                        <motion.div
                          layoutId="active-dot"
                          className="absolute top-3 right-3 w-1.5 h-1.5 bg-orange-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* STEP 3: METODE PEMBAYARAN */}
            <section className="bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex-none w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-accent font-black text-black shadow-lg shadow-orange-500/20">
                  03
                </span>
                <h2 className="text-heading text-xl font-bold text-white tracking-tight">
                  Pilih Pembayaran
                </h2>
              </div>

              {/* Info kompatibilitas pembayaran */}
              {selectedProduct && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
                    <div className="text-body text-xs text-slate-300">
                      <p className="text-accent font-semibold text-blue-300 mb-2">
                        Metode Pembayaran untuk {selectedProduct.name}:
                      </p>
                      <p className="text-slate-400">
                        Hanya menampilkan metode pembayaran yang kompatibel
                        dengan produk ini. Total pembayaran: Rp{" "}
                        {selectedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getCompatiblePaymentMethods().map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedPayment(method);
                      // Clear payment error when selecting new method
                      if (errors.payment) {
                        setErrors((prev) => ({ ...prev, payment: null }));
                      }
                    }}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${
                      selectedPayment?.id === method.id
                        ? `${method.bgColor} ${method.borderColor} shadow-xl`
                        : "bg-white/3 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl ${method.bgColor} border ${method.borderColor}`}
                        >
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">
                            {method.name}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {method.fee === 0
                              ? "Gratis"
                              : `Biaya: Rp ${method.fee.toLocaleString()}`}
                          </p>
                          <p className="text-xs text-slate-500">
                            {method.processingTime}
                          </p>
                        </div>
                      </div>

                      {selectedPayment?.id === method.id && (
                        <motion.div
                          layoutId="payment-active"
                          className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle size={12} className="text-white" />
                        </motion.div>
                      )}
                    </div>

                    {selectedPayment?.id === method.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-white/10"
                      >
                        <div className="text-xs text-slate-400 space-y-1">
                          <p>• Proses: {method.processingTime}</p>
                          <p>
                            • Keamanan:{" "}
                            {method.securityLevel === "high"
                              ? "Tinggi"
                              : "Sedang"}
                          </p>
                          <p>
                            • Limit: Rp {method.minAmount.toLocaleString()} - Rp{" "}
                            {method.maxAmount.toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pesan jika tidak ada metode pembayaran kompatibel */}
              {selectedProduct &&
                getCompatiblePaymentMethods().length === 0 && (
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <div className="flex items-center gap-2 text-yellow-400 text-sm">
                      <AlertCircle size={16} />
                      <span>
                        Tidak ada metode pembayaran yang kompatibel untuk produk
                        ini
                      </span>
                    </div>
                  </div>
                )}

              {errors.payment && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle size={14} />
                    <span>{errors.payment}</span>
                  </div>
                </div>
              )}

              {errors.security && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <Shield size={14} />
                    <span>{errors.security}</span>
                  </div>
                </div>
              )}
            </section>

            {/* ACTION BAR (Sticky Mobile) */}
            <div className="sticky bottom-6 lg:relative">
              <button
                onClick={() => {
                  if (validateInputs()) {
                    setShowConfirmModal(true);
                  }
                }}
                disabled={
                  !userId ||
                  !selectedProduct ||
                  !selectedPayment ||
                  errors.security
                }
                className={`group w-full py-5 rounded-4xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-3 overflow-hidden relative ${
                  userId &&
                  selectedProduct &&
                  selectedPayment &&
                  !errors.security
                    ? "bg-linear-to-r from-orange-400 to-orange-600 text-black hover:shadow-orange-500/40"
                    : "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
                }`}
              >
                <span className="relative z-10">
                  {errors.security
                    ? "Keamanan Tidak Valid"
                    : "Konfirmasi Pesanan"}
                </span>
                {userId &&
                  selectedProduct &&
                  selectedPayment &&
                  !errors.security && (
                    <ChevronRight
                      size={20}
                      className="relative z-10 group-hover:translate-x-1 transition-transform"
                    />
                  )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL KONFIRMASI PESANAN */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e2036] rounded-[2.5rem] border border-white/10 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">
                    Konfirmasi Pesanan
                  </h3>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Game Info */}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                  <img
                    src={game?.image_url}
                    alt={game?.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white">{game?.name}</h4>
                    <p className="text-sm text-slate-400">Top Up Game</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">User ID</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white">{userId}</span>
                      <button
                        onClick={() => copyToClipboard(userId)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Copy size={14} className="text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {zoneId && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400">Zone ID</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white">{zoneId}</span>
                        <button
                          onClick={() => copyToClipboard(zoneId)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Copy size={14} className="text-slate-400" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Produk</span>
                    <span className="text-white font-medium">
                      {selectedProduct?.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Pembayaran</span>
                    <span className="text-white font-medium">
                      {selectedPayment?.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Biaya Admin</span>
                    <span className="text-white">
                      {selectedPayment?.fee === 0
                        ? "Gratis"
                        : `Rp ${selectedPayment?.fee.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b-2 border-orange-500/30">
                    <span className="text-lg font-bold text-white">
                      Total Bayar
                    </span>
                    <span className="text-xl font-black text-orange-400">
                      Rp{" "}
                      {(
                        selectedProduct?.price + (selectedPayment?.fee || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Info & Warnings */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <Clock
                      size={16}
                      className="text-blue-400 mt-0.5 shrink-0"
                    />
                    <div className="text-xs text-blue-300">
                      <p className="font-semibold mb-1">Estimasi Proses</p>
                      <p>
                        Top up akan diproses dalam{" "}
                        {selectedPayment?.processingTime || "1-5 menit"} setelah
                        pembayaran dikonfirmasi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <Shield
                      size={16}
                      className="text-green-400 mt-0.5 shrink-0"
                    />
                    <div className="text-xs text-green-300">
                      <p className="font-semibold mb-1">Keamanan Transaksi</p>
                      <p>
                        Transaksi dilindungi dengan enkripsi end-to-end. Tingkat
                        keamanan:{" "}
                        {selectedPayment?.securityLevel === "high"
                          ? "Tinggi"
                          : "Sedang"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <AlertCircle
                      size={16}
                      className="text-yellow-400 mt-0.5 shrink-0"
                    />
                    <div className="text-xs text-yellow-300">
                      <p className="font-semibold mb-1">Penting!</p>
                      <p>
                        Pastikan User ID sudah benar. Top up yang sudah diproses
                        tidak dapat dibatalkan. Rate limit: maksimal 3 percobaan
                        per 5 menit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} />
                        Bayar Sekarang
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopUpDetail;
