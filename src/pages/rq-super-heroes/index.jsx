import Link from "next/link";
import { useSuperHeroesData } from "../../hooks/index";

export default function RQSuperHeroes() {
  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      <button onClick={refetch}>Fetch heroes</button>

      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link href={`/rq-super-heroes/${hero.id}`}>
              {hero.id} {hero.name}
            </Link>
          </div>
        );
      })}
    </>
  );
}
