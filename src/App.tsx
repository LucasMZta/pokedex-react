import { useEffect, useState } from 'react';
import './App.css'
import { getAllPokemons } from './data/api'
import { UrlType } from './types/PokemonType';
import { Pokemon } from './components/Pokemon/App';
import { Wifi, WifiOff, X } from 'lucide-react';

function App() {


  const wrapperOffline = document.querySelector('.wrapper.offline');
  const wrapperOnline = document.querySelector('.wrapper.online');

  window.onload = () => {
    function ajax() {
      const xhr = new XMLHttpRequest(); //creating new XML Object
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true); //sendind get request on this url
      xhr.onload = () => {
        //if status is equal to 200 or less than 300 that mean user is getting data from that privided utl
        //if response status is 200 that means is online
        if (xhr.status === 200 && xhr.status < 300) {
          const hide = wrapperOffline?.classList.contains('hide');

          if (!hide) {
            wrapperOnline?.classList.remove('hide');
          }

          setTimeout(() => {
            wrapperOffline?.classList.add('hide');
            wrapperOnline?.classList.add('hide');
          }, 5000);

        } else {
          offline();
        }
      }
      xhr.onerror = () => {
        offline();
      }
      xhr.send();
    }

    const offline = () => {
      wrapperOffline?.classList.remove('hide');
    }

    setInterval(() => {
      ajax();
    }, 100);

  }




  const [pokemons, setPokemons] = useState<UrlType[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<UrlType[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const initial = 0;
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
    setLimit(limit + 50);
    loadPokemons();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredPokemons = [];
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


      <div className={`wrapper offline hide`}>
        <div className="toast offline">
          <div className="content">
            <div className="icon"> <WifiOff /> </div>
            <div className="details text-zinc-500">
              <span> Você está offline </span>
              <p>Conexão perdida</p>
            </div>
            <div className="close-icon"> <X /></div>
          </div>
        </div>
      </div>

      <div className={`wrapper online hide`}>
        <div className="toast">
          <div className="content">
            <div className="icon"> <Wifi /> </div>
            <div className="details text-zinc-500">
              <span> Você está online </span>
              <p>Conexão reestabelecida</p>
            </div>
            <div className="close-icon"> <X /> </div>
          </div>
        </div>
      </div>



      <div className='mx-auto px-6 lg:px-16 min-h-screen'>
        <header className='flex flex-col md:flex-row justify-between items-center py-8'>
          <h2 className='text-4xl py-5'>Pokedex</h2>
          <div className='w-full md:w-96 '>
            <input type="text" placeholder='Buscar Pokemon' className='bg-zinc-950 w-full p-3 px-5 focus:outline-double outline-blue-600 border-none rounded-md' value={search} onChange={handleSearch} />
          </div>
        </header>
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
      </div>

      <footer className='mx-auto py-6 px-6 lg:px-16'>
        <p> Desenvolvido por <a href='https://lucasdevs.com' className='text-blue-600' target='_blank'>Lucas Martins</a> | © 2024 - Todos os direitos reservados. </p>

      </footer>
    </div>
  )
}

export default App;
