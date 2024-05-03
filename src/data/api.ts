import axios from 'axios';

const http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export const getAllPokemons = async () => {
    const response = await http.get(`/pokemon`, { params: { offset: 0, limit: 1302 } });

    return response.data.results;
}

export const getPokemonInfo = async (id: string) => {
    const response = await http.get(`/pokemon/${id}`);

    if (!response.data) return false;

    return response.data;
}

export const getEvolves = async (id: string) => {
    const evolveUrl = await http.get(`/pokemon-species/${id}/`);

    if (!evolveUrl.data.evolution_chain.url) return false;

    const response = await axios.get(evolveUrl.data.evolution_chain.url);

    if (!response.data) return false;

    return response.data;
}

export const getPokemonPicture = async (name: string) => {
    const response = await http.get(`/pokemon-form/${name}`);

    if (!response.data) return false;

    return response.data;


}