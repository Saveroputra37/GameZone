import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./lib/service/Gameservice";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // Data dianggap "fresh" selama 5 menit
  });
};
