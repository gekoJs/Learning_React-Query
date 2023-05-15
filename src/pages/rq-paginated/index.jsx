import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export default function Index() {
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);

  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    keepPreviousData: true
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
          {data?.data.map((e, i) => {
            return (
              <div key={i}>
                <h3>
                  {e.id}. {e.label}
                </h3>
              </div>
            );
          })}
          <button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            prev
          </button>
          <button
            disabled={pageNumber === 4}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            next
          </button>
        </div>
      }
      {isFetching && !isLoading && <h1 style={{color: "orange"}}>FETCHING DATA...</h1>}
    </div>
  );
}
