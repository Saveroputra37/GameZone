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
    // Hapus firstName karena menyebabkan error 422
    await signUp.create({
      emailAddress,
      password,
      username,
      unsafeMetadata: {
        role: "free_user",
      },
    });

    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    setPendingVerification(true);
    setError("");
  } catch (err) {
    console.error("Clerk Error Details:", err);
    // Menampilkan pesan error yang lebih jelas dari Clerk
    setError(
      err.errors?.[0]?.longMessage || "Gagal mendaftar. Silakan cek data Anda.",
    );
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
