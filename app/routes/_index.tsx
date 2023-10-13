import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import pokemons from "../assets/data/pokemons.json";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
    <Header />
    <h1>Attrape les pokemons et complète ton Pokedex !</h1>
    </>
  );
}
