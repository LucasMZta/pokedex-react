import { PokemonType } from "./PokemonType"

export type PokemonEvolves = PokemonType & {
    chain: {
        evolves_to: [{
            evolution_details: [{
                item: { name: string; }
                min_happiness: string;
                min_level: string;
                trigger: { name: string }
            }];
            evolves_to: [{
                evolution_details: [{
                    item: { name: string; }
                    min_happiness: string;
                    min_level: string;
                    trigger: { name: string }
                }];
                // evolves_to: []:
                is_baby: boolean;
                species: { name: string; url: string; }
            }]
            is_baby: boolean;
            species: { name: string; url: string; }
        }];
        is_baby: boolean;
        species: { name: string; url: string; }
    };
    id: number;
}