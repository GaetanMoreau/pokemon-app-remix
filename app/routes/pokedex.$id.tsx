import { useParams, useLoaderData } from "@remix-run/react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import pokemons from "../assets/data/pokemons.json";
import Header from "../components/header";
import { Pokemon } from "../types/pokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokémon Details" },
    {
      name: "description",
      content: "Detailed information about a specific Pokémon.",
    },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  return pokemons;
}

export default function PokemonDetails() {
  const pokemons = useLoaderData<Pokemon[]>();

  const { id: pokemonId } = useParams();

  if (!pokemonId) {
    return <div>Invalid Pokemon ID</div>;
  }

  const pokemonNumericId = parseInt(pokemonId, 10);

  const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonNumericId);

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  return (
    <>
      <Header />
      <section className="pokemon-details__container">
        <div className="pokemon__item">
          <img
            className="pokemon-details__image"
            src={pokemon.sprites.front_default}
          ></img>
          <div className="pokemon-details__name">
            <h1>
              <span>No.{pokemon.id}</span> {pokemon.name}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
