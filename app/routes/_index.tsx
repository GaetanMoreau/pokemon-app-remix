import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import Header from "../components/header";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { selectRandomPokemon, getRandomPosition } from "../utils/pokemonUtils";
import pokemons from "../assets/data/pokemons.json";
import { Pokemon, PositionedPokemon } from "../types/pokemon";

import { json } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

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
      const updatedPokemons = selectRandomPokemon(allPokemons, 10).map(
        (pokemon: Pokemon) => ({
          ...pokemon,
          position: getRandomPosition(),
        })
      );
      setCurrentPokemons(updatedPokemons);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [allPokemons]);

  const handleCapture = async (pokemon: Pokemon) => {
    const pokemonCaptured = {
      uuid: Date.now(),
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
        body: JSON.stringify(pokemonCaptured),
      });

      if (!response.ok) {
        throw new Error("Problème lors de la capture du Pokémon");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
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

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ message: "Méthode non autorisée" }, { status: 405 });
  }

  const pokemon = await request.json();

  const bagFilePath = "./app/assets/data/bag.json";
  const bag = JSON.parse(await fs.readFile(bagFilePath, "utf8"));

  const seenFilePath = "./app/assets/data/seen.json";
  const seen = new Set(JSON.parse(await fs.readFile(seenFilePath, "utf8")));

  bag.push(pokemon);

  seen.add(pokemon.id)

  await fs.writeFile(bagFilePath, JSON.stringify(bag, null, 2), "utf8");
  await fs.writeFile(seenFilePath, JSON.stringify([...seen], null, 2), "utf8");

  return json({ message: "Pokémon capturé avec succès!" });
}
