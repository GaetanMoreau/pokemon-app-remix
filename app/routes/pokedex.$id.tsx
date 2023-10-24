import { useParams, useLoaderData, NavLink } from "@remix-run/react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import pokemons from "../assets/data/pokemons.json";
import Header from "../components/header";
import { Pokemon } from "../types/pokemon";
import pokemonsSeen from "../assets/data/seen.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Pokemon Catcher - Pokémon Details" },
    {
      name: "description",
      content: "Detailed information about a specific Pokémon.",
    },
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

export default function PokemonDetails() {
  const data = useLoaderData<LoaderData>();
  const { pokemons, pokemonsSeen } = data;

  const isPokemonSeen = (pokemonId: number) => {
    return pokemonsSeen.some((seen) => seen === pokemonId);
  };

  const { id: pokemonId } = useParams();

  if (!pokemonId) {
    return <div>Invalid Pokemon ID</div>;
  }

  const pokemonNumericId = parseInt(pokemonId, 10);

  const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonNumericId);

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }
  const seenClass = isPokemonSeen(pokemon.id) ? "pokemon--seen" : "";

  return (
    <>
      <Header />
      <section className="home__container">
        <NavLink to={"/pokedex"} className="pokedex__return">Retour au pokedex</NavLink>
      </section>
      <section className="pokemon-details__container">
        <div className={`pokemon__item ${seenClass}`}>
          <img
            className="pokemon-details__image"
            src={pokemon.sprites.front_default}
          ></img>
          <div className="pokemon-details__name">
            <h1>
              <span>No.{pokemon.id} </span>
              {isPokemonSeen(pokemon.id) ? pokemon.name : "???"}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
