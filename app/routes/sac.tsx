import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import Header from "../components/header";
import capturedPokemons from "../assets/data/bag.json";
import { Pokemon, bagPokemon } from "../types/pokemon";

import { json } from "@remix-run/node";
import fs from "fs/promises";

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
      uuid: pokemon.uuid,
      id: pokemon.id,
      name: pokemon.name,
      sprites: {
        front_default: pokemon.sprites.front_default,
      },
    };
    try {
      const response = await fetch("/?index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonReleased),
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
      <Header />
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

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ message: 'Méthode non autorisée' }, { status: 405 });
  }

  const pokemon = await request.json();

  const bagFilePath = './app/assets/data/bag.json';

  try {
    const bagData = await fs.readFile(bagFilePath, 'utf8');
    const bag = JSON.parse(bagData);

    const indexToDelete = bag.findIndex((item: bagPokemon) => item.uuid === pokemon.uuid);

    if (indexToDelete !== -1) {
      bag.splice(indexToDelete, 1);
      await fs.writeFile(bagFilePath, JSON.stringify(bag, null, 2), 'utf8');
      return json({ message: 'Pokémon capturé avec succès!' });
    } else {
      return json({ message: 'Le Pokémon n\'a pas été trouvé dans le sac' }, { status: 404 });
    }
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    return json({ message: 'Erreur lors de la manipulation du fichier JSON' }, { status: 500 });
  }
}
