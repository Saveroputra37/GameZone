import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// Perhatikan perubahan di bawah ini:
import { ClerkProvider } from "@clerk/clerk-react";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!key) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={key}>
      <App />
    </ClerkProvider>
  </StrictMode>,
);
