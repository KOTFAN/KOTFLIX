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
          movieType={moviesType}
        />
      ))}
    </ul>
  );
}
