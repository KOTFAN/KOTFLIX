import { useState } from "react";
import MoviesList from "./MoviesList";
import Movie from "./Movie";
import ShowHideButton from "./ShowHideButton";
import Summary from "./Summary";

export default function WatchedMovies({ tempWatchedData }) {
  const [isOpen, setIsOpen] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <>
          <Summary watched={watched} />
          <MoviesList>
            {watched.map((movie) => (
              <Movie movie={movie} key={movie.imdbID}>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{movie.runtime} min</span>
                </p>
              </Movie>
            ))}
          </MoviesList>
        </>
      )}
    </div>
  );
}
