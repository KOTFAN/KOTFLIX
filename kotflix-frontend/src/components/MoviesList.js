import Movie from "./Movie";

export default function MoviesList({
  movies,
  moviesType,
  selectMovieHandler,
  deleteWatchedMovieHandler,
}) {
  return (
    <ul className="list list-movie">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          selectMovieHandler={selectMovieHandler}
          movieType={moviesType}
          deleteWatchedMovieHandler={deleteWatchedMovieHandler}
        />
      ))}
    </ul>
  );
}
