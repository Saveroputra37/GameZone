import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../hooks/lib/service/Productservice";

export const useProducts = (categoryId) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId, // Hanya jalankan jika categoryId ada
  });
};
