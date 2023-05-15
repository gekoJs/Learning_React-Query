import { useRouter } from "next/router";
import { useSuperHeroDataId } from "../../../hooks/index";

export default function Id() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data, isError, error } = useSuperHeroDataId(id);

  if (isLoading) return <div>LOADING...</div>;

  if (isError) return <div>ERROR...{error.message}</div>;

  return <div>{data.data.name}</div>;
}
