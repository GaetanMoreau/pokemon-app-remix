import { Pokemon } from "../types/pokemon";

export function selectRandomPokemon(
  pokemons: Pokemon[],
  count: number
): Pokemon[] {
  const shuffled = [...pokemons].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 100));
  const y = Math.floor(Math.random() * (window.innerHeight - 100));
  return { x, y };
}
