import React,{ useState, useEffect } from "react";
import { getAllPokemon, getPokemon} from "./pokemon";


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

  const loadingPokemon = async (data) => { //Funcion de carga
    let _pokemon = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))
    setPokemonData(_pokemon)
  };


  return (
    <div className="App">
      {loading ? <h1>Cargando...</h1> : 
        <h1>Obteniendo datos</h1>
      }
    </div>
  );
}

export default App;
