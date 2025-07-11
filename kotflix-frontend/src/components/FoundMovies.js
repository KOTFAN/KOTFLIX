import { useState } from "react";
import MoviesList from "./MoviesList";
import Movie from "./Movie";

export default function FoundMovies({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <MoviesList>
          {movies?.map((movie) => (
            <Movie movie={movie}>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </Movie>
          ))}
        </MoviesList>
      )}
    </div>
  );
}
