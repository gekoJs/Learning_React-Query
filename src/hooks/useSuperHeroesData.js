import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  return await axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError, enabled) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    enabled,
    onSuccess,
    onError,
  });
};
//**********************************************/

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
  // return request({ url: "/superheroes", method: "post", data: hero });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */

    //   /** Handling Mutation Response Start */
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    //   /** Handling Mutation Response Start */
    // },
    /**Optimistic Update Start */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    /**Optimistic Update End */
  });
};

// POSIBLE VALUES TO CONFIG USEQUERY
//     {
//     // if we navigate to another page the cache only lasts 5 seconds but if we go back again between those 5 seconds we dont see de loading
//     // we allow this if we know that the data is changing constantly
//     // its default value is of 5 minutes or 5000000
//       cacheTime: 5000,
//   }

// you cant use cacheTime and staleTime at the same time

// {
//   //the default value is 0, what this does is to do a background fetching every time we refresh or go to the page so if we increase the number we are saying that we dont want to do a refetch till that time pass
//   staleTime: 5000,
// }

// {
//   //default vehavior is true so the fetch take effect whenever its mounted
//   refetchOnMount: false,
// }

// {
//   // default value its true, what it does its to refetch the data when coming back to the app
//   refetchOnWindowFocus: true,
// }

// {
//   // automatically is set to false  what it does is to refetch a query when a certain time has passed out, receives a number in miliseconds or false
//   refetchInterval,
//   // if its accompained by the previous property the refetch its going to take effect even if the user is not focus in the page
//   //boolean values
//   refetchIntervalInBackground: false,
//       onSuccess,
//       onError
// }

// {
//   //by doing that we get sure that the fetching soent take effect till we throw an action, and for that we need to destructure the refetch prop of the useQuery and pass it to an event like onClick or  whatever
//   enabled: false,
// }

// {
//     // allows us tu us launch a function depending on the case
//     onSuccess,
//     onError
// }
