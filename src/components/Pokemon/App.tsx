import { useEffect, useState } from "react";
import { getEvolves, getPokemonInfo } from "../../data/api";
import { PokemonType } from "../../types/PokemonType";
import './styles.css'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PokemonEvolves } from "@/types/PokemonEvolves";
// import { PokemonEvolvesImg } from "@/types/PokemonEvolvesImg";
import { FormatEvolution } from "@/utils/FormatEvolution";
import { StatusBase } from "../StatusBase";

type Props = {
    url: string;
}

export const Pokemon = ({ url }: Props) => {
    const [pokeInfo, setPokeInfo] = useState<PokemonType>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPokemonDetail, setShowPokemonDetail] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentEvolve, setCurrentEvolte] = useState<PokemonEvolves>();
    // const [currentImage, setCurrentImage] = useState<PokemonEvolvesImg>()

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

    const loadEvolution = async (fullURL: string) => {
        if (open) {
            const id = fullURL.substring(34, 39).replace('/', '');
            const json = await getEvolves(id);
            console.log(json);
            setCurrentEvolte(json);
        }
    }

    useEffect(() => {
        LoadPokemon(url);
    }, []);

    useEffect(() => {
        loadEvolution(url)
    }, [open])

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
                            <Dialog open={open} onOpenChange={setOpen} >
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
                                            {pokeInfo.sprites.other.dream_world.front_default &&
                                                <img src={pokeInfo.sprites.other.dream_world.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] " />
                                            }
                                            {!pokeInfo.sprites.other.dream_world.front_default &&
                                                <img src={pokeInfo.sprites.other.home.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] " />
                                            }
                                            {!pokeInfo.sprites.other.dream_world.front_default && !pokeInfo.sprites.other.home.front_default &&
                                                <img src={pokeInfo.sprites.other["official-artwork"].front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] " />
                                            }
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-800 text-white border-none max-h-[calc(100vh-4rem)] my-3 overflow-y-auto w-11/12 sm:w-2/3 p-0 rounded text-xl">
                                    <DialogHeader>
                                        <DialogTitle className={`flex flex-col pt-6 items-center rounded-b-3xl`}>
                                            <div className="flex justify-between w-full pt-6 p-4 ">
                                                <h2 className="text-2xl capitalize">{pokeInfo.name}</h2>
                                                <span className="font-semibold text-xl">#{pokeInfo.id}</span>
                                            </div>
                                            <div className="w-full flex items-center justify-center px-4 max-h-40">
                                                {pokeInfo.sprites.other.dream_world.front_default &&
                                                    <img src={pokeInfo.sprites.other.dream_world.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] max-w-36 sm:max-w-40" />
                                                }
                                                {!pokeInfo.sprites.other.dream_world.front_default &&
                                                    <img src={pokeInfo.sprites.other.home.front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] max-w-36 sm:max-w-40" />
                                                }
                                                {!pokeInfo.sprites.other.dream_world.front_default && !pokeInfo.sprites.other.home.front_default &&
                                                    <img src={pokeInfo.sprites.other["official-artwork"].front_default} className="drop-shadow-[2px_6px_1px_rgba(0,0,0,0.3)] max-w-36 sm:max-w-40" />
                                                }
                                            </div>
                                        </DialogTitle>
                                        <DialogDescription asChild className={`flex flex-col justify-center items-center`}>
                                            <div>
                                                <p className="capitalize text-white bg-poke flex justify-around text-xl pb-3">
                                                    {pokeInfo.types.map((type, key) => (
                                                        <span key={key} className={`block my-2 w-max rounded-lg p-1 px-2 shadow-lg ${type.type.name} }`}>{type.type.name}</span>
                                                    ))}
                                                </p>
                                                <div className="w-full flex justify-between px-4">
                                                    <div className="flex-1 text-center border-r-2 border-zinc-600 ">
                                                        <p className="text-xl text-white py-2">{(pokeInfo.height / 10).toFixed(1).replace('.', ',')} m </p>
                                                        <span>Height</span>
                                                    </div>
                                                    <div className="flex-1 text-center border-r-2 border-zinc-600">
                                                        <p className="text-xl text-white py-2"> {(pokeInfo.weight / 10).toFixed(1).replace('.', ',')} kg </p>
                                                        <span>Weight</span>
                                                    </div>
                                                    <div className="flex-1 text-center">
                                                        <p className="text-xl text-white py-2">{pokeInfo.base_experience} </p>
                                                        <span>Exp base</span>
                                                    </div>
                                                </div>
                                                <div className="w-full text-center px-4">
                                                    <h3 className="text-xl text-white pt-6 py-2">Status Base</h3>
                                                    <StatusBase title={'HP'} baseStat={pokeInfo.stats[0].base_stat} nameType={pokeInfo.types[0].type.name} />
                                                    <StatusBase title={'ATK'} baseStat={pokeInfo.stats[1].base_stat} nameType={pokeInfo.types[0].type.name} />
                                                    <StatusBase title={'DEF'} baseStat={pokeInfo.stats[2].base_stat} nameType={pokeInfo.types[0].type.name} />
                                                    <StatusBase title={'SPD'} baseStat={pokeInfo.stats[5].base_stat} nameType={pokeInfo.types[0].type.name} />
                                                </div>
                                                {currentEvolve &&
                                                    <>
                                                        <h3 className="text-xl text-white pt-6 py-2">Evolution</h3>
                                                        <div className="w-full text-white text-center px-4 pt-4 pb-8 flex flex-wrap gap-2 justify-around text-base md:text-xl">
                                                            <>
                                                                <div className="flex flex-col items-center justify-between">
                                                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentEvolve.chain.species.url.substring(42, 47).replace('/', '')}.svg`} className="h-14" />
                                                                    <h4 className="capitalize">{currentEvolve.chain.species.name}</h4>
                                                                    <span> #{currentEvolve.chain.species.url.substring(42, 47).replace('/', '')} </span>
                                                                </div>
                                                                {currentEvolve.chain.evolves_to.length > 0 &&
                                                                    currentEvolve.chain.evolves_to.map((evol1, key) => (
                                                                        <>
                                                                            {evol1.evolution_details.length > 0 &&
                                                                                evol1.evolution_details.map((ev, key) => (
                                                                                    <FormatEvolution key={key} data={ev} />
                                                                                ))
                                                                            }
                                                                            <div key={key} className="flex flex-col items-center justify-between">
                                                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evol1.species.url.substring(42, 47).replace('/', '')}.svg`} className="h-14" />
                                                                                <h4 className="capitalize">{evol1.species.name}</h4>
                                                                                <span>#{evol1.species.url.substring(42, 47).replace('/', '')}</span>
                                                                            </div>
                                                                            {evol1.evolves_to.length > 0 &&
                                                                                evol1.evolves_to.map((evol2, key) => (
                                                                                    <>
                                                                                        <FormatEvolution data={evol2.evolution_details[key]} />
                                                                                        <div key={key} className="flex flex-col items-center justify-between">
                                                                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evol2.species.url.substring(42, 47).replace('/', '')}.svg`} className="h-14" />
                                                                                            <h4 className="capitalize py-1">{evol2.species.name}</h4>
                                                                                            <span>#{evol2.species.url.substring(42, 47).replace('/', '')}</span>
                                                                                        </div >
                                                                                    </>
                                                                                ))
                                                                            }
                                                                        </>

                                                                    ))
                                                                }
                                                            </>
                                                        </div>
                                                    </>
                                                }
                                                {!currentEvolve &&
                                                    <div className="w-full text-center px-4">
                                                        <h3 className="text-xl text-white pt-6 py-2">No Evolutions</h3>
                                                    </div>
                                                }
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