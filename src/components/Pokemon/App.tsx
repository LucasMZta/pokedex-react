import { useEffect, useState } from "react";
import { getPokemonInfo } from "../../data/api";
import { PokemonType } from "../../types/PokemonType";
import './styles.css'

type Props = {
    url: string;
}

export const Pokemon = ({ url }: Props) => {
    const [pokeInfo, setPokeInfo] = useState<PokemonType>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const LoadPokemon = async (fullURL: string) => {
        setLoading(true);
        const id = fullURL.substring(34, 39).replace('/', '');
        const json = await getPokemonInfo(id);

        setTimeout(() => {
            //timeout to loading
            setLoading(false);
        }, 1000);

        if (!json) setError(true);

        setPokeInfo(json);
    }

    useEffect(() => {
        LoadPokemon(url);
    }, []);

    return (
        <>
            {loading &&
                <div className="w-80 h-52 rounded-xl flex items-center justify-center bg-gradient-to-r from-zinc-900/90 to-zinc-950/70 animate-pulse "> Carregando... </div>
            }
            {!loading &&
                <div className={`p-3 rounded-xl h-full bg-poke bg-zinc-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer `}>
                    {error &&
                        <div>Erro. Tente novamente</div>
                    }
                    {!error && pokeInfo &&
                        <div className="flex p-3 h-ful">
                            <div className="flex-1">
                                <h4 className="text-2xl capitalize">{pokeInfo.name}</h4>
                                <p className="capitalize text-white">
                                    {pokeInfo.types.map((type, key) => (
                                        <span key={key} className={`block my-2 w-max rounded p-1 px-2 shadow-lg ${type.type.name} }`}>{type.type.name}</span>
                                    ))}
                                </p>
                                <p className="text-blue-800 font-semibold text-xl">#{parseInt(pokeInfo.id)}</p>
                            </div>
                            <div className="w-36 sm:w-40 flex items-center justify-center">
                                <img src={pokeInfo.sprites.other.dream_world.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] " />
                            </div>

                        </div>
                    }
                </div >
            }
        </>
    )
}