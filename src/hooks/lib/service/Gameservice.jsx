import { supabase } from "../SupabaseConfig";

// Fungsi murni untuk ambil data
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true }); // Opsional: urutkan abjad

  if (error) throw new Error(error.message);
  return data;
};

// Kamu bisa tambah fungsi lain di sini nanti, misal: fetchProductsByGame(id)
