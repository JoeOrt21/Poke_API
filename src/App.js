import React,{ useState, useEffect } from "react";
import { getAllPokemon, getPokemon} from "./pokemon";
import Card from "./Card";
import Navbar from "./Navbar";
import './App.css';

function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'


  useEffect (() => {
    async function fetchData(){
      let response = await getAllPokemon(initialUrl);// Funcion para obetener los pokemones de la API
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  },[]);

  const next = async () => {
    setLoading(true);
    let data=await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl)return;
    setLoading(true);
    let data=await getAllPokemon(prevUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => { //Funcion de carga
    let _pokemon = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))
    setPokemonData(_pokemon)
  };


  return (
    <div>
      {
        loading ? <h1>Cargando...</h1> : (
          <>
          <Navbar/>
          <div className='btn'>
          <button onClick={prev}>Anterior</button>
          <button onClick={next}>Siguiente</button>
          </div>

          <div className="grid-container">
            
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}/>
            })}
            </div>

            <div className='btn'>
            <button onClick={prev}>Anterior</button>
            <button onClick={next}>Siguiente</button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
