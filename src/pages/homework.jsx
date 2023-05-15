import useSuperHeroData from "../hooks/useSuperHeroesData"

export default function homework () {
    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroData({enabled: false})
    
    // const handleClick = () =>{}
    console.log(data)
    return(
        <div> 
            <button onClick={refetch}>Fetch</button>
            {data?.data.map(e=>{
                return(
                <div>{e.name}</div>
                )
            })}
        </div>
    )
}