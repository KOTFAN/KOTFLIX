export default function Movie({ movie, selectMovieHandler, movieType }) {
  return (
    <li
      onClick={() => {
        selectMovieHandler(movie.imdbID);
      }}
    >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        {movieType === "FOUND" && (
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        )}
        {movieType === "WATCHED" && (
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
      </div>
    </li>
  );
}
