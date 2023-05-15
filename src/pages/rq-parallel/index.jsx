import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

// this is in case that we want to fetch different things in the same page

export default function ParallelQueriesPage() {
  const { data: superHeroes, isLoading: loadingHeroes } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes
  );

  const { data: friends, isLoading: loadingFriends } = useQuery(
    ["friends"],
    fetchFriends
  );

  return (
    <div>
      {!loadingFriends ? (
        <div>
          <h1>FRIENDS</h1>
          <div>
            {friends?.data.map((e) => {
              return (
                <p>
                  {e.id}
                  {e.name}
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>LOADING FRIENDS...</h1>
      )}
      {!loadingHeroes ? (
        <div>
          <h1>HEROES</h1>
          <div>
            {superHeroes?.data.map((e) => {
              return (
                <p>
                  {e.id}
                  {e.name}
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>LOADING HEROES...</h1>
      )}
    </div>
  );
}
