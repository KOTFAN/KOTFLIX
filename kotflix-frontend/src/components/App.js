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
import ErrorMessage from "./ErrorMessage";

const APIKEY = process.env.REACT_APP_OMDB_API_KEY;
const seachQuery = "Squid game";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(function () {
    async function getMovies(query) {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Failed to load movies data");

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movies not found");
        }

        setMovies(data.Search);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
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
          {!errorMessage && !isLoading && (
            <MoviesList movies={movies} moviesType={"FOUND"} />
          )}
          {isLoading && <Preloader />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </MoviesBox>

        <MoviesBox>
          <Summary watched={watched} />
          <MoviesList movies={watched} moviesType={"WATCHED"} />
        </MoviesBox>
      </Main>
    </>
  );
}
