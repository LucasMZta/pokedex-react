import { useEffect, useState } from 'react';
import './App.css'
import { getAllPokemons } from './data/api'
import { UrlType } from './types/PokemonType';
import { Pokemon } from './components/Pokemon/App';
// import { Pokemon } from './components/Pokemon';


function App() {

  const [pokemons, setPokemons] = useState<UrlType[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<UrlType[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [initial, setInitial] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    loadPokemons();
  }, [filteredPokemons])

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const json = await getAllPokemons();
      setLoading(false);
      setPokemons(json);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  const handleLoadMorePokemon = () => {
    // setOffset(offset + limit);
    setLimit(limit + 50);
    loadPokemons();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredPokemons = [];
    // if (e.target.value) {
    for (const i in pokemons) {
      if (pokemons[i].name.includes(e.target.value.toLowerCase().trim())) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setSearch(e.target.value);
    setFilteredPokemons(filteredPokemons);
  }

  return (
    <div className='bg-zinc-950/90 min-h-screen text-white'>
      <div className='mx-auto px-6 lg:px-16 min-h-screen'>
        <header className='flex justify-between items-center py-8'>
          <h2 className='text-4xl py-5'>Pokedex</h2>
          <div className='w-72 lg:w-86'>
            <input type="text" placeholder='Buscar Pokemon' className='bg-zinc-950 w-full p-3 px-5 focus:outline-double outline-blue-600 border-none rounded-md' value={search} onChange={handleSearch} />
          </div>
        </header>

        {/* <button className='bg-red-600 p-3' onClick={loadPokemons}>Carregar</button> */}
        {loading && //enquanto loading = true
          <div className="flex-1 flex justify-center items-center text-5xl">

          </div>
        }
        {!loading &&
          <>
            {!error &&
              <>
                {pokemons.length === 0 &&
                  <div className='flex-1 flex justify-center items-center text-5xl'>
                    Não há Pokemons para exibir!
                  </div>
                }
                <div className='poke-area grid place-items-center gap-6'>
                  {!search &&
                    <>
                      {pokemons.slice(initial, limit).map((pokemon, key) => (
                        <Pokemon key={key} url={pokemon.url} />
                      ))}
                    </>
                  }
                  {search &&
                    <>
                      {filteredPokemons.slice(0, 20).map((pokemon, key) => (
                        <Pokemon key={key} url={pokemon.url} />
                      ))}
                    </>
                  }
                  {search && filteredPokemons.length === 0 &&
                    <div className='flex-1 flex justify-center items-center text-5xl'>
                      Sem resultados!
                    </div>
                  }
                </div>
                {!search &&
                  <div className='w-full my-10 flex items-center justify-center'>
                    <button className='bg-zinc-900 p-3 px-6 shadow-lg rounded hover:bg-zinc-800 transition-all duration-300' onClick={handleLoadMorePokemon} >Carregar Mais</button>
                  </div>
                }
              </>

            }
            {error &&
              <div className='flex-1 flex justify-center items-center text-5xl'>
                Erro...tente novamente mais tarde!
              </div>
            }
          </>
        }


        {!error && // caso não tenha error
          <>
            {!loading &&
              <>
                {/* <p className="py-4">Total de Posts: {posts.length} </p> */}



              </>
            }
          </>
        }
      </div>

      <footer className='mx-auto py-6'>
        <p>Desenvolvido por Lucas Martins. </p>
      </footer>
    </div>
  )
}

export default App;
