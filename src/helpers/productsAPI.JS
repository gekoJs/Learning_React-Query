import axios from "axios";

const productsAPI =axios.create({
    baseURL: 'http://localhost:4000'
})

export const getProducts = async () =>{
    const {data} = productsAPI.get('/superheroes')
    return data
}