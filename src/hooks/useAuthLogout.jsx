import { useClerk } from "@clerk/clerk-react";

export const useAuthLogout = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
};