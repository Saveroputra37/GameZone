import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./lib/SupabaseConfig";
import { useUser } from "@clerk/clerk-react";

// 1. Hook untuk mengambil data user
export const useSupabaseUser = () => {
  const { user: clerkUser } = useUser();

  return useQuery({
    queryKey: ["supabase-user", clerkUser?.id],
    queryFn: async () => {
      if (!clerkUser?.id) {
        throw new Error("User tidak terautentikasi");
      }

      // PERBAIKAN: Menggunakan tabel "profiles" dan menggunakan .maybeSingle()
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_id", clerkUser.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data; // Akan bernilai null jika user belum terdaftar di profiles
    },
    enabled: !!clerkUser?.id,
    staleTime: 5 * 60 * 1000, // 5 menit
    gcTime: 10 * 60 * 1000,   // TanStack Query v5 menggunakan gcTime (sebelumnya cacheTime)
  });
};

// 2. Hook untuk membuat user baru (Diubah menjadi useMutation)
export const useCreateSupabaseUser = () => {
  const { user: clerkUser } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!clerkUser?.id) {
        throw new Error("User tidak terautentikasi");
      }

      // Cek apakah user sudah ada di tabel "profiles"
      const { data: existingUser, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_id", clerkUser.id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (existingUser) return existingUser;

      // Jika belum ada, buat user baru sesuai skema kolom tabel "profiles"
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            clerk_id: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            full_name: clerkUser.username || clerkUser.firstName || "User",
            avatar_url: clerkUser.imageUrl,
            role: "free_user",
            bio: null,
            bg_color: "#0f172a", // dark slate background
            text_color: "#ffffff", // white text
            total_topup: 0,
            last_active: new Date().toISOString(),
            last_active_timestamp: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supabase-user", clerkUser?.id] });
    },
  });
};