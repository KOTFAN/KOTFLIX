import { useState } from "react";
import MoviesList from "./MoviesList";
import Movie from "./Movie";
import ShowHideButton from "./ShowHideButton";

export default function FoundMovies({ movies }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <MoviesList>
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID}>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </Movie>
          ))}
        </MoviesList>
      )}
    </div>
  );
}
