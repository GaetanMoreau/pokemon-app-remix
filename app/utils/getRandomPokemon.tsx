import pokemons from "../assets/data/pokemons.json";

export const getRandomPokemon = () => {
  const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
  return randomPokemon;
}
