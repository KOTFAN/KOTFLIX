import { useRef, useState } from "react";

const APIKEY = process.env.REACT_APP_OMDB_API_KEY;
export function useSearchMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const controller = useRef(null);

  function searchMoviesHandler(searchQuery) {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();
    async function getMovies(searchQuery) {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchQuery}`, {
          signal: controller.current.signal,
        });

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
          }),
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

    if (searchQuery.length < 3) {
      setMovies([]);
      return;
    }
    getMovies(searchQuery);
  }

  return { movies, isLoading, errorMessage, searchMoviesHandler };
}
