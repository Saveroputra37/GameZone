import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./lib/service/Gameservice";

export const useCategories = () => {
  return useQuery({
    // Kita cukup gunakan key "categories" secara global
    // Karena kita akan mengambil semua data game sekaligus, lalu memfilternya di React
    queryKey: ["categories"],

    queryFn: fetchCategories,

    // Data dianggap "fresh" selama 5 menit
    // Ini sangat bagus karena jika user pindah halaman dan balik lagi,
    // data langsung muncul tanpa loading spinner.
    staleTime: 1000 * 60 * 5,

    // Menjaga data lama tetap tampil saat sedang mengambil data baru di background
    keepPreviousData: true,
  });
};
