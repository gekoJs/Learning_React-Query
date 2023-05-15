import axios from "axios";
import { useQueries } from "@tanstack/react-query"; //instead of useQuery
// import { useSuperHeroDataId } from "../../hooks"; //this dont work, i dont know why

const fetchSuperHeroes = async (id) => {
  return await axios.get(`http://localhost:4000/superheroes/${id}`);
};

// this is in case that we want to fetch data for multiple heroes like a logic filter
export default function Index({ heroIds = [1, 3] }) {
  const queryResults = useQueries({
    queries: heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHeroes(id),
      };
    }),
  });

  return (
    <div>
      {queryResults?.map((e, i) => {
        return (
          <div key={i}>
            {e.status === "loading" ? (
              <h1 style={{color: "orange"}}>Loading...</h1>
            ) : e.status === "error" ? (
              <h1 style={{color: "red"}}>Error</h1>
            ) : e.status === "success" ? (
              <div key={i}>
                {e.data?.data.id}
                {e.data?.data.name}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
