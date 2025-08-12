import Movie from "./Movie";

export default function MoviesList({
  movies,
  moviesType,
  selectedMovieId,
  setSelectedMovieId,
}) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedMovieId={setSelectedMovieId}
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
