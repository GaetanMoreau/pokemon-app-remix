import { NavLink } from "@remix-run/react";

const Header = () => {
  return (
    <header>
      <img src="/image/pokedex.png    "></img>
      <nav> <NavLink to="/">Accueil</NavLink><NavLink to="/pokedex">Pokedex</NavLink><NavLink to="/sac">Sac</NavLink></nav>
    </header>
  );
};

export default Header;
