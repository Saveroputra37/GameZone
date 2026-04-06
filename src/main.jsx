import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Tambahkan import ini
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clients = new QueryClient();

if (!key) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={clients}>
      <ClerkProvider publishableKey={key}>
        {/* BrowserRouter harus membungkus App agar useLocation bekerja */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
