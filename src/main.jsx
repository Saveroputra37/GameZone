import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
// Import QueryClientProvider di sini
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clients = new QueryClient();

if (!key) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Gunakan QueryClientProvider, bukan QueryClient langsung */}
    <QueryClientProvider client={clients}>
      <ClerkProvider publishableKey={key}>
        <App />
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
