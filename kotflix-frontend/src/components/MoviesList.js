import Movie from "./Movie";

export default function MoviesList({
  movies,
  moviesType,
  updateMovieIdHandler,
}) {
  return (
    <ul className="list list-movie">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          updateMovieIdHandler={updateMovieIdHandler}
        >
          {moviesType === "FOUND" && (
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          )}
          {moviesType === "WATCHED" && (
            <>
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
            </>
          )}
        </Movie>
      ))}
    </ul>
  );
}
