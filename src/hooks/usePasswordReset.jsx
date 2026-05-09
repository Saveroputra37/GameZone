import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

export const usePasswordReset = () => {
  const { isLoaded, signIn } = useSignIn();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleForgotPassword = async (email) => {
    if (!isLoaded) return;
    setIsResetting(true);
    setError("");
    setSuccess("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccess("Link reset password telah dikirim ke email Anda");
    } catch (err) {
      setError(err.errors[0]?.longMessage || "Gagal mengirim email reset password");
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetPassword = async (code, newPassword) => {
    if (!isLoaded) return;
    setIsResetting(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        setSuccess("Password berhasil diubah. Silakan login dengan password baru.");
        // Redirect to login after a delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      setError(err.errors[0]?.longMessage || "Gagal mengubah password");
    } finally {
      setIsResetting(false);
    }
  };

  return {
    handleForgotPassword,
    handleResetPassword,
    error,
    success,
    isResetting,
  };
};