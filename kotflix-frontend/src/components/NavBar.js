import Logo from "./Logo";
import Search from "./Search";
import NumOfResults from "./NumOfResults";

function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumOfResults movies={movies} />
    </nav>
  );
}

export default NavBar;
