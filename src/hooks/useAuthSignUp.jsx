import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";

export const useAuthLogic = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Pendaftaran
  const handleRegister = async (emailAddress, password, username) => {
    if (!isLoaded) return;
    try {
      // Pastikan username dikirim dengan benar
      await signUp.create({
        emailAddress,
        password,
        username, // Clerk otomatis memetakan ini jika fitur username aktif
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setError("");
    } catch (err) {
      // Penanganan error yang lebih aman
      setError(err.errors?.[0]?.message || "Terjadi kesalahan saat mendaftar");
    }
  };

  // Google OAuth
  const signInWithGoogle = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithStrategy({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || "Gagal masuk dengan Google");
    }
  };

  // Step 2: Verifikasi OTP
  const handleVerify = async (code) => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        window.location.href = "/dashboard"; // Arahkan ke dashboard setelah sukses
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Kode verifikasi salah");
    }
  };

  return {
    handleRegister,
    handleVerify,
    signInWithGoogle,
    pendingVerification,
    setPendingVerification, // Tambahkan ini agar komponen UI bisa mereset state jika perlu
    error,
  };
};
