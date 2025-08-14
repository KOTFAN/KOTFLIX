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
  const [ratedMovie, setRatedMovie] = useState(null);

  function selectMovieHandler(id) {
    setSelectedMovieId((currentId) => (currentId === id ? null : id));
    setRatedMovie(watched.find((movie) => movie.imdbID === id) || null);
  }
  function closeMovieInfoHandler() {
    setSelectedMovieId(null);
  }

  function addToWatchedHandler(movie) {
    setWatched((currentWatched) => {
      return [
        { ...movie, userRating: movie.userRating },
        ...currentWatched.filter((item) => item.imdbID !== movie.imdbID),
      ];
    });
  }

  function deleteWatchedMovieHandler(movieId) {
    setWatched((c) => c.filter((item) => item.imdbID !== movieId));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovies(searchQuery) {
        try {
          setIsLoading(true);
          setErrorMessage("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchQuery}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Failed to load movies data");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movies not found");
          }

          setMovies(
            data.Search.map((movie) => {
              return {
                ...movie,
                title: movie.Title,
                runtime: movie.Runtime,
                imdbRating: movie.imdbRating,
                imdbID: movie.imdbID,
                poster: movie.Poster,
              };
            })
          );

          setErrorMessage("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setErrorMessage(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }
      getMovies(query);

      return () => {
        controller.abort();
      };
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
              selectMovieHandler={selectMovieHandler}
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
              addToWatchedHandler={addToWatchedHandler}
              ratedMovie={ratedMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MoviesList
                movies={watched}
                moviesType={"WATCHED"}
                selectMovieHandler={selectMovieHandler}
                deleteWatchedMovieHandler={deleteWatchedMovieHandler}
              />
            </>
          )}
        </MoviesBox>
      </Main>
    </>
  );
}
