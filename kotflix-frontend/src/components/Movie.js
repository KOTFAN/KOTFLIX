export default function Movie({ children, movie }) {
  //children - aditional info for movie
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div> {children}</div>
    </li>
  );
}
