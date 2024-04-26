export type UrlType = {
    name: string;
    url: string;
}

export type PokemonType = {
    id: string;
    name: string;
    types: [{ type: { name: string } }]
    // url: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        }
    }
}