import WatchedMovies from "./WatchedMovies";
import FindMovies from "./FindMovies";

export default function Main({ tempWatchedData, movies }) {
  return (
    <main className="main">
      <FindMovies movies={movies} />

      <WatchedMovies tempWatchedData={tempWatchedData} />
    </main>
  );
}
