import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Main from "./Main";
import Logo from "./Logo";
import Search from "./Search";
import NumOfResults from "./NumOfResults";
import MoviesBox from "./MoviesBox";
import MoviesList from "./MoviesList";
import Summary from "./Summary";
import Preloader from "./Preloader";

const APIKEY = process.env.REACT_APP_OMDB_API_KEY;
const seachQuery = "overlord";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    async function getMovies(query) {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    }
    getMovies(seachQuery);
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumOfResults movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesList movies={movies} moviesType={"FOUND"} />
          )}
        </MoviesBox>

        <MoviesBox>
          <Summary watched={watched} />
          <MoviesList movies={watched} moviesType={"WATCHED"} />
        </MoviesBox>
      </Main>
    </>
  );
}
