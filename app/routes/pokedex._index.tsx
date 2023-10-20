import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import pokemons from "../assets/data/pokemons.json";
import Header from "../components/header";
import { Pokemon } from "../types/pokemon";

import pokemonsSeen from "../assets/data/seen.json";

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
  const pokemons = useLoaderData<Pokemon[]>();

  const handlePokemonClick = () => {
    console.log("ihoufiuhfishuus");
  };
  return (
    <>
      <Header />
      <section className="pokedex__container">
        {pokemons.map((pokemon, index) => {
          return (
            <NavLink to={`/pokedex/${pokemon.id}`}>
              <div
                className="pokemon__item"
                key={index}
                onClick={handlePokemonClick}
              >
                <div className="pokemon__header">
                  <img src="/image/pokeball.webp"></img>
                  <span>No.{pokemon.id}</span>
                </div>
                <img
                  className="pokemon__image"
                  src={pokemon.sprites.front_default}
                ></img>
                 <h2 className="pokemon__name">???</h2>
              </div>
            </NavLink>
          );
        })}
      </section>
    </>
  );
}
