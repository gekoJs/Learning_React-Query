import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async (id) => {
  return await axios.get(`http://localhost:4000/superheroes/${id}`);
};

const useSuperHeroDataId = (id) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["super-hero", id],
    queryFn: async () => await fetchSuperHeroes(id),
    initialData: () => {
      const hero = queryClient
        .getQueryData(["super-heroes"])
        ?.data.find((hero) => hero.id === parseInt(id));
      if (hero) {
        return {
          data: hero,
        };
      }
      return undefined
     },
  });
};

export default useSuperHeroDataId;
