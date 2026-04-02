import { supabase } from "../SupabaseConfig";

export const fetchProductsByCategory = async (categoryId) => {
  if (!categoryId) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("price", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};
