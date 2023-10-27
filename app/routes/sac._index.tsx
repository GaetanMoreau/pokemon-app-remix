import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import capturedPokemons from "../assets/data/bag.json";
import { Pokemon } from "../types/pokemon";
import { useState } from 'react';
import { Form } from "@remix-run/react";
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

  const [currentPokemonToRename, setCurrentPokemonToRename] = useState<string>("");
  const [currentPokemonUuid, setCurrentPokemonUuid] = useState<number>();

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

  const handleRename = async (pokemon: Pokemon) => {
    let pokemonRenameForm = document.querySelector('.pokemon__form__container')
    pokemonRenameForm?.classList.add("in");
    setCurrentPokemonToRename(pokemon.name)
    setCurrentPokemonUuid(pokemon.uuid)
  }

  const handleFormSubmit = () => {
    let pokemonRenameForm = document.querySelector('.pokemon__form__container')
    pokemonRenameForm?.classList.remove("in");
    setCurrentPokemonToRename("")
    setCurrentPokemonUuid(0)
  }

  return (
    <>
      <section className="bag__container">
        {pokemons.map((pokemon, index) => {
          return (
            <div key={index}>
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
                <p className="pokemon__action" onClick={() => handleRename(pokemon)}>Renommer</p>
              </div>
            </div>
          );
        })}
      </section>
      <div className="pokemon__form__container">
        <h2>Choisissez le nouveau nom du pokemon</h2>
        <Form className="pokemon__form" method="post" action={`/sac`} onSubmit={handleFormSubmit}>
          <p>
            <input type="text" name="name" value={currentPokemonToRename} onChange={e => setCurrentPokemonToRename(e.target.value)} />
          </p>
          <p>
            <input type="hidden" name="uuid" defaultValue={currentPokemonUuid} />
          </p>
          <button type="submit">Renommer</button>
        </Form >
        <button onClick={handleFormSubmit}>Annuler</button>
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = new URLSearchParams(await request.text());
  const newName = formData.get("name");
  const uuid = formData.get("uuid");

  if (!uuid) {
    return json({ message: 'UUID not provided.' }, { status: 400 });
  }

  const bagFilePath = './app/assets/data/bag.json';

  try {
    const bagData = await fs.readFile(bagFilePath, 'utf8');
    const bag = JSON.parse(bagData);
    const numUuid = Number(uuid);

    for (let i = 0; i < bag.length; i++) {
      if (bag[i].uuid === numUuid) {
        bag[i].name = newName;
        break;
      }
    }

    await fs.writeFile(bagFilePath, JSON.stringify(bag, null, 2), 'utf8');

    return json({ message: 'Pokémon renomé avec succès.' }, { status: 200 });

  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    return json({ message: 'Erreur lors de la manipulation du fichier JSON' }, { status: 500 });
  }
}

