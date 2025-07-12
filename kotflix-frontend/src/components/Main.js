import WatchedMovies from "./WatchedMovies";
import FoundMovies from "./FoundMovies";

//make more children prop components (to avoid prop drilling and improve composition)
export default function Main({ tempWatchedData, movies }) {
  return (
    <main className="main">
      <FoundMovies movies={movies} />

      <WatchedMovies tempWatchedData={tempWatchedData} />
    </main>
  );
}
