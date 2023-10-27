import { NavLink } from "@remix-run/react";

const Header = ({ count }: { count: number }) => {
  return (
    <header>
      <img src="/image/pokedex.png"></img>
      <nav><NavLink to="/">Accueil</NavLink><NavLink to="/pokedex">Pokedex</NavLink><NavLink to="/sac">Sac({count})</NavLink><NavLink to="/faq">FAQ</NavLink></nav>
    </header>
  );
};

export default Header;
