import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import pokemons from "../assets/data/pokemons.json";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function pokedex() {
  return (
    <>
      <section className="pokedex__container">
        {pokemons.map((pokemon, index) => {
          return (
            <div className="pokemon__item" key={index}>
                <div className="pokemon__header">
                    <img src="/image/pokeball.webp"></img>
                    <span>No.{pokemon.id}</span>
                </div>
              <img className="pokemon__image" src={pokemon.sprites.front_default}></img>
            </div>
          );
        })}
      </section>
    </>
  );
}
