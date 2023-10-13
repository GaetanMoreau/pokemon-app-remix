import type { MetaFunction } from "@remix-run/node";
import pokemons from "../assets/data/pokemons.json";
import Header from "../components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function pokedex() {
    const handlePokemonClick = () => {
        console.log("ihoufiuhfishuus")
    }
  return (
    <>
     <Header />
      <section className="pokedex__container">
        {pokemons.map((pokemon, index) => {
          return (
            <div className="pokemon__item" key={index} onClick={handlePokemonClick}>
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
