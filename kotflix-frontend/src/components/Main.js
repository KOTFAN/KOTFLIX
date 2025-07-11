import WatchedMovies from "./WatchedMovies";
import FoundMovies from "./FoundMovies";

export default function Main({ tempWatchedData, movies }) {
  return (
    <main className="main">
      <FoundMovies movies={movies} />

      <WatchedMovies tempWatchedData={tempWatchedData} />
    </main>
  );
}
