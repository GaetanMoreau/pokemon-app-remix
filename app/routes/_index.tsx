import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { getRandomPosition } from "../utils/getRandomPosition";
import { getRandomPokemon } from "../utils/getRandomPokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Pokemon = {
  sprites: {
    front_default: string;
  };
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchNewPokemons = () => {
    const newPokemons = [
      getRandomPokemon(),
      getRandomPokemon(),
      getRandomPokemon(),
    ];
    setPokemons(newPokemons);
  };

  useEffect(() => {
    const divClass = "wild__pokemon";

    const intervalId = setInterval(() => {
      fetchNewPokemons();
      getRandomPosition(divClass);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCapture = (pokemon:Pokemon) =>{
    console.log(pokemon)
  }

  return (
    <>
      <Header />
      <section className="home__container">
        <h1>Attrape les pokemons et complète ton Pokedex !</h1>
      </section>
      <div>
        {pokemons.map((pokemon, index) => (
          <div key={index} className="wild__pokemon" onClick={() => handleCapture(pokemon)}>
            <img src={pokemon.sprites.front_default}></img>
          </div>
        ))}
      </div>
    </>
  );
}
