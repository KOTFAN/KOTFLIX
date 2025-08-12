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
import SelectedMovie from "./SelectedMovie";

const APIKEY = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function updateMovieIdHandler(id) {
    setSelectedMovieId((currentId) => (currentId === id ? null : id));
  }
  function closeMovieInfoHandler() {
    setSelectedMovieId(null);
  }

  useEffect(
    function () {
      async function getMovies(searchQuery) {
        try {
          setIsLoading(true);
          setErrorMessage("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchQuery}`
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

      if (query.length < 3) {
        setMovies([]);
        return;
      }
      getMovies(query);
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumOfResults movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          {!errorMessage && !isLoading && (
            <MoviesList
              movies={movies}
              moviesType={"FOUND"}
              updateMovieIdHandler={updateMovieIdHandler}
            />
          )}
          {isLoading && <Preloader />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </MoviesBox>

        <MoviesBox>
          {selectedMovieId ? (
            <SelectedMovie
              movieId={selectedMovieId}
              closeMovieInfoHandler={closeMovieInfoHandler}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MoviesList movies={watched} moviesType={"WATCHED"} />
            </>
          )}
        </MoviesBox>
      </Main>
    </>
  );
}
