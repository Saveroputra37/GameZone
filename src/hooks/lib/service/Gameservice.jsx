import { supabase } from "../SupabaseConfig";

export const fetchCategories = async () => {
  // Kita ambil dari tabel 'categories' karena datanya ada di situ
  const { data, error } = await supabase
    .from("categories")
    .select("*") // Mengambil id, name, image_url, slug, category_type, is_popular, description
    .order("name", { ascending: true });

  if (error) {
    console.error("Supabase Error:", error.message);
    throw new Error(error.message);
  }

  return data || [];
};;
