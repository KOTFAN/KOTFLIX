import { useState } from "react";
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
import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export default function App() {
  const { movies, isLoading, errorMessage, searchMoviesHandler } = useMovies();
  const [watched, setWatched] = useLocalStorageState("watched");
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
      const updatedWatched = [
        { ...movie, userRating: movie.userRating },
        ...currentWatched.filter((item) => item.imdbID !== movie.imdbID),
      ];

      return updatedWatched;
    });
  }

  function deleteWatchedMovieHandler(movieId) {
    setWatched((c) => c.filter((item) => item.imdbID !== movieId));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search searchMoviesHandler={searchMoviesHandler} />
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
