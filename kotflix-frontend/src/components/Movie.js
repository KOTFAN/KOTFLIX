import posterNotFound from "./../assets/images/mov-not-found.png";

export default function Movie({
  movie,
  selectMovieHandler,
  movieType,
  deleteWatchedMovieHandler,
}) {
  return (
    <li
      onClick={() => {
        if (movieType === "FOUND") {
          selectMovieHandler(movie.imdbID);
        }
      }}
    >
      <img
        src={movie.poster === "N/A" ? posterNotFound : movie.poster}
        alt={`${movie.title} poster`}
        onClick={() => {
          if (movieType === "WATCHED") {
            selectMovieHandler(movie.imdbID);
          }
        }}
      />
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
            <p>
              <button
                className="btn-delete"
                onClick={() => deleteWatchedMovieHandler(movie.imdbID)}
              >
                X
              </button>
            </p>
          </>
        )}
      </div>
    </li>
  );
}
