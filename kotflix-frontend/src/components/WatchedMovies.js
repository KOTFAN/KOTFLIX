import { useState } from "react";
import MoviesList from "./MoviesList";
import Movie from "./Movie";
import ShowHideButton from "./ShowHideButton";
import Summary from "./Summary";

export default function WatchedMovies({ tempWatchedData }) {
  const [isOpen, setIsOpen] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <>
          <Summary watched={watched} />
          <MoviesList moviesType={"WATCHED"} movies={watched} />
        </>
      )}
    </div>
  );
}
