import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import Header from "../components/header";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { selectRandomPokemon, getRandomPosition } from "../utils/pokemonUtils";
import pokemons from "../assets/data/pokemons.json";
import { Pokemon, PositionedPokemon } from "../types/pokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  return pokemons;
}

export default function Component() {
  const allPokemons = useLoaderData<Pokemon[]>();
  const [currentPokemons, setCurrentPokemons] = useState<PositionedPokemon[]>(
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedPokemons = selectRandomPokemon(allPokemons, 3).map(
        (pokemon: Pokemon) => ({
          ...pokemon,
          position: getRandomPosition(),
        })
      );
      setCurrentPokemons(updatedPokemons);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [allPokemons]);

  const handleCapture = (pokemon: Pokemon) => {
    console.log(pokemon);
  };

  return (
    <>
      <Header />
      <section className="home__container">
        <h1>Attrape les pokemons et complète ton Pokedex !</h1>
      </section>
      <div>
        {currentPokemons.map((pokemon, index) => (
          <div
            key={index}
            className="wild__pokemon"
            onClick={() => handleCapture(pokemon)}
            style={{
              position: "absolute",
              left: `${pokemon.position.x}px`,
              top: `${pokemon.position.y}px`,
            }}
          >
            <img src={pokemon.sprites.front_default} alt={`Pokemon ${index}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export async function action({}: LoaderFunctionArgs) {

}
