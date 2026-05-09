import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./lib/SupabaseConfig";
import { useUser } from "@clerk/clerk-react";

export const useChatHistory = () => {
  const { user: clerkUser } = useUser();

  return useQuery({
    queryKey: ["chat-history", clerkUser?.id],
    queryFn: async () => {
      if (!clerkUser?.id) throw new Error("User tidak terautentikasi");

      const { data, error } = await supabase
        .from("chat_history")
        .select("*")
        .eq("clerk_id", clerkUser.id)
        .order("created_at", { ascending: true }) // Diubah ke ascending agar urutan chat natural (bawah ke atas)
        .limit(100);

      if (error) throw error;
      return data || [];
    },
    enabled: !!clerkUser?.id,
  });
};

export const useSaveChatMessage = () => {
  const queryClient = useQueryClient();
  const { user: clerkUser } = useUser();

  return useMutation({
    mutationFn: async ({ message, role }) => {
      if (!clerkUser?.id) throw new Error("User tidak terautentikasi");

      const { data, error } = await supabase
        .from("chat_history")
        .insert([
          {
            clerk_id: clerkUser.id,
            message: message,
            role: role, // Harus 'user' atau 'bot' sesuai constraint SQL
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Database Error:", error.message);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chat-history", clerkUser?.id]);
    },
  });
};

export const useClearChatHistory = () => {
  const queryClient = useQueryClient();
  const { user: clerkUser } = useUser();

  return useMutation({
    mutationFn: async () => {
      if (!clerkUser?.id) throw new Error("User tidak terautentikasi");

      const { error } = await supabase
        .from("chat_history")
        .delete()
        .eq("clerk_id", clerkUser.id);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chat-history", clerkUser?.id]);
    },
  });
};
