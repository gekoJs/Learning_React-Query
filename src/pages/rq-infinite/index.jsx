import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export default function Index() {
  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) return pages.length + 1;
      else return undefined;
    },
  });

  return (
    <div>
      {isLoading ? (
        <h1 style={{ color: "orange" }}>LOADING COLORS...</h1>
      ) : isError ? (
        <h1 style={{ color: "red" }}>ERROR...</h1>
      ) : null}
      {
        <div>
          {data?.pages.map((group, i) => {
            return (
              <Fragment key={i}>
                {group?.data.map((e) => {
                  return (
                    <h3 key={e.id}>
                      {e.id}. {e.label}
                    </h3>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      }
      {isFetchingNextPage && (
        <h1 style={{ color: "orange" }}>FETCHING...</h1>
      )}
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          LOAD MORE
        </button>
      </div>
    </div>
  );
}
