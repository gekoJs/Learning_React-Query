import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSuperHeroesData } from "../../hooks";

const addSuperHero = async (hero) => {
  return await axios.post("http://localhost:4000/superheroes", hero);
};

export default function index() {
  const [inputValues, setInputValues] = useState({
    name: "",
    alterEgo: "",
  });

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useSuperHeroesData();

  const addSuperHeroData = useMutation({
    mutationFn: addSuperHero, //function that returns a promise
    onSuccess: (data) => {
      // queryClient.invalidateQueries("products"); //this allows to refetch
      queryClient.setQueryData("super-heroes", (oldData) => {
        //with this way we dont refetch but still are able to see the changes
        return {
          ...oldData,
          data: [...oldData, data.data],
        };
      });
    },
  });

  const {
    isSuccess,
    isLoading: postLoading,
    isError: postError,
    error,
  } = addSuperHeroData;

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("aa");
    addSuperHeroData.mutate(inputValues);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="alterEgo" onChange={handleChange} />
        <button type="submit">{!postLoading ? "POST" : "CARGANDO"}</button>
      </form>

      {postError && <h1>POST ERROR...{error.message}</h1>}

      {isLoading ? (
        <h1>LOADING DATA...</h1>
      ) : isError ? (
        <h1>DATA ERROR...</h1>
      ) : null}
      {data?.data.map((e, i) => (
        <div key={i}>
          <h2>
            {e.id}
            {e.name}
          </h2>
        </div>
      ))}
    </div>
  );
}
