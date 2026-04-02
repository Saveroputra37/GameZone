import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

export const useAuthSignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    if (!isLoaded) return;
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.errors[0].longMessage || "Email atau password salah.");
    }
  };

  const signInWithGoogle = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithStrategy({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  return { handleLogin, signInWithGoogle, error };
};
