import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import capturedPokemons from "../assets/data/bag.json";
import { Pokemon } from "../types/pokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Pokemon Catcher - Pokemon bag" },
    { name: "description", content: "Welcome to your bag. Here you will find all the pokemon you've captured" },
  ];
};

export async function loader({ }: LoaderFunctionArgs) {
  return capturedPokemons;
}

export default function Component() {
  const pokemons = useLoaderData<Pokemon[]>();

  const handleReleased = async (pokemon: Pokemon) => {
    const pokemonReleased = {
      uuid: pokemon.uuid
    };
    try {
      const response = await fetch("/sac/" + pokemon.uuid, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Problème lors de la libération du Pokémon");
      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <section className="bag__container">
        {pokemons.map((pokemon, index) => {
          return (
            <div>
              <NavLink to={`/pokedex/${pokemon.id}`}>
                <div className="pokemon__item" key={index}>
                  <div className="pokemon__header">
                    <img src="/image/pokeball.webp"></img>
                    <span>No.{pokemon.id}</span>
                  </div>
                  <img
                    className="pokemon__image"
                    src={pokemon.sprites.front_default}
                  ></img>
                  <h2 className="pokemon__name">{pokemon.name}</h2>
                </div>
              </NavLink>
              <div className="pokemon__action__container">
                <p className="pokemon__action" onClick={() => handleReleased(pokemon)}>Liberer</p>
                <p className="pokemon__action">Renommer</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

