export default function Movie({ children, movie, updateMovieIdHandler }) {
  //children - aditional info for movie
  return (
    <li onClick={() => updateMovieIdHandler(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div> {children}</div>
    </li>
  );
}
