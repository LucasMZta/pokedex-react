export type UrlType = {
    name: string;
    url: string;
}

export type PokemonType = {
    id: string;
    name: string;
    types: [{ type: { name: string } }];
    height: number;
    weight: number;
    base_experience: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        }
    };
    stats: [
        { base_stat: number; effort: number; stat: { name: string; } },
        { base_stat: number; effort: number; stat: { name: string; } },
        { base_stat: number; effort: number; stat: { name: string; } },
        { base_stat: number; effort: number; stat: { name: string; } },
        { base_stat: number; effort: number; stat: { name: string; } },
        { base_stat: number; effort: number; stat: { name: string; } }
    ]
}