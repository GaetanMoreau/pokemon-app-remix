import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import pokemons from "../assets/data/pokemons.json";
import { Pokemon } from "../types/pokemon";
import pokemonsSeen from "../assets/data/seen.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Pokemon Catcher - Pokedex" },
    { name: "description", content: "Welcome to your pokedex. Keep track of the Pokemon you've seen" },
  ];
};

export async function loader({ }: LoaderFunctionArgs) {
  return {
    pokemons,
    pokemonsSeen,
  };
}
type LoaderData = {
  pokemons: Pokemon[];
  pokemonsSeen: [];
};

export default function Component() {
  const data = useLoaderData<LoaderData>();
  const { pokemons, pokemonsSeen } = data;

  const isPokemonSeen = (pokemonId: number) => {
    return pokemonsSeen.some((seen) => seen === pokemonId);
  };

  const pokemonsSeenNumber = Object.keys(pokemonsSeen).length;
  const pokemonsNumber = Object.keys(pokemons).length;

  return (
    <>

      <section className="home__container">
        <h1>Vous avez rencontré {pokemonsSeenNumber} pokemons sur {pokemonsNumber}</h1>
      </section>
      <section className="pokedex__container">
        {pokemons.map((pokemon, index) => {
          const seenClass = isPokemonSeen(pokemon.id) ? "pokemon--seen" : "";
          return (
            <NavLink to={`/pokedex/${pokemon.id}`} key={index}>
              <div className={`pokemon__item ${seenClass}`}>
                <div className="pokemon__header">
                  <img src="/image/pokeball.webp"></img>
                  <span>No.{pokemon.id}</span>
                </div>
                <img
                  className="pokemon__image"
                  src={pokemon.sprites.front_default}
                ></img>
                <h2 className="pokemon__name">
                  {isPokemonSeen(pokemon.id) ? pokemon.name : "???"}
                </h2>
              </div>
            </NavLink>
          );
        })}
      </section>
    </>
  );
}
