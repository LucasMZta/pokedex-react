import axios from 'axios';
// import { Pokemon } from '../types/Pokemon';

const http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export const getAllPokemons = async () => {
    const response = await http.get(`/pokemon`, { params: { offset: 0, limit: 1302 } });
    // const response = await http.get(`/pokemon`);
    console.log(response);
    return response.data.results;
}

export const getPokemonInfo = async (id: string) => {
    const response = await http.get(`/pokemon/${id}`);

    if (!response.data) return false;

    return response.data;
}