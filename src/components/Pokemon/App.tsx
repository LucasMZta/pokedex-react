import { useEffect, useState } from "react";
import { getPokemonInfo } from "../../data/api";
import { PokemonType } from "../../types/PokemonType";
import './styles.css'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

type Props = {
    url: string;
}

export const Pokemon = ({ url }: Props) => {
    const [pokeInfo, setPokeInfo] = useState<PokemonType>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPokemonDetail, setShowPokemonDetail] = useState(false);

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

    const handlePokeInfo = () => {
        setShowPokemonDetail(!showPokemonDetail);
    }

    return (
        <>
            {loading &&
                <div className="w-80 h-52 rounded-xl flex items-center justify-center bg-gradient-to-r from-zinc-900/90 to-zinc-950/70 animate-pulse "> Carregando... </div>
            }
            {!loading &&
                <div className={`p-3 rounded-xl h-full bg-poke bg-zinc-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`} onClick={handlePokeInfo} >
                    {error &&
                        <div>Erro. Tente novamente</div>
                    }
                    {!error && pokeInfo &&
                        <>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="flex p-3 h-ful">
                                        <div className="flex-1">
                                            <h4 className="text-2xl capitalize">{pokeInfo.name}</h4>
                                            <p className="capitalize text-white">
                                                {pokeInfo.types.map((type, key) => (
                                                    <span key={key} className={`block my-2 w-max rounded p-1 px-2 shadow-lg ${type.type.name} }`}>{type.type.name}</span>
                                                ))}
                                            </p>
                                            <p className="text-blue-800 font-semibold text-xl text-left">#{parseInt(pokeInfo.id)}</p>
                                        </div>
                                        <div className="w-36 sm:w-40 flex items-center justify-center">
                                            <img src={pokeInfo.sprites.other.dream_world.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] " />
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-800 text-white border-none w-80 sm:w-96 p-0 rounded overflow-hidden text-xl">
                                    <DialogHeader>
                                        <DialogTitle className={`flex flex-col py-6 items-center ${pokeInfo.types[0].type.name} rounded-b-3xl`}>
                                            <div className="flex justify-between w-full p-4 ">
                                                <h2 className="text-2xl capitalize">{pokeInfo.name}</h2>
                                                <span className="font-semibold text-xl">#{pokeInfo.id}</span>
                                            </div>
                                            <div className="w-full flex items-center justify-center px-4">
                                                <img src={pokeInfo.sprites.other.dream_world.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] w-36 sm:w-40" />
                                            </div>
                                        </DialogTitle>
                                        <DialogDescription className={`flex flex-col justify-center items-center`}>
                                            <p className="capitalize text-white bg-poke flex justify-around text-xl py-3">
                                                {pokeInfo.types.map((type, key) => (
                                                    <span key={key} className={`block my-2 w-max rounded-lg p-1 px-2 shadow-lg ${type.type.name} }`}>{type.type.name}</span>
                                                ))}
                                            </p>
                                            <div className="w-full flex justify-between px-4">
                                                <div className="flex-1 text-center border-r-2 border-zinc-600 ">
                                                    <p className="text-xl text-white py-2">{(pokeInfo.height / 10).toFixed(2).replace('.', ',')} m </p>
                                                    <span>Height</span>
                                                </div>
                                                <div className="flex-1 text-center border-r-2 border-zinc-600">
                                                    <p className="text-xl text-white py-2"> {(pokeInfo.weight / 10).toFixed(2).replace('.', ',')} kg </p>
                                                    <span>Weight</span>
                                                </div>
                                                <div className="flex-1 text-center">
                                                    <p className="text-xl text-white py-2">{pokeInfo.base_experience} </p>
                                                    <span>Exp base</span>
                                                </div>
                                            </div>
                                            <div className="w-full text-center px-4">
                                                <h3 className="text-xl text-white pt-6 py-2">Status Base</h3>
                                                <div className="flex items-center">
                                                    <span className="w-10 py-2 border-r-2 border-zinc-600">HP</span>
                                                    <span className="w-8 ml-3">{pokeInfo.stats[0].base_stat}</span>
                                                    <div className="flex-1 ml-3 bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-x-hidden">
                                                        <div className={`${pokeInfo.types[0].type.name} b h-3 rounded-full`} style={{ width: `${pokeInfo.stats[0].base_stat}%` }} ></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-10 py-2 border-r-2 border-zinc-600">ATK</span>
                                                    <span className="w-8 ml-3">{pokeInfo.stats[1].base_stat}</span>
                                                    <div className="flex-1 ml-3 bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-x-hidden">
                                                        <div className={`${pokeInfo.types[0].type.name} b h-3 rounded-full`} style={{ width: `${pokeInfo.stats[1].base_stat}%` }} ></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-10 py-2 border-r-2 border-zinc-600">DEF</span>
                                                    <span className="w-8 ml-3"> {pokeInfo.stats[2].base_stat} </span>
                                                    <div className="flex-1 ml-3 bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-x-hidden">
                                                        <div className={`${pokeInfo.types[0].type.name} b h-3 rounded-full`} style={{ width: `${pokeInfo.stats[2].base_stat}%` }} ></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-10 py-2 border-r-2 border-zinc-600">SPD</span>
                                                    <span className="w-8 ml-3">{pokeInfo.stats[5].base_stat}</span>
                                                    <div className="flex-1 ml-3 bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-x-hidden">
                                                        <div className={`${pokeInfo.types[0].type.name} b h-3 rounded-full`} style={{ width: `${pokeInfo.stats[5].base_stat}%` }} ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </>
                    }
                </div >
            }
        </>
    )
}