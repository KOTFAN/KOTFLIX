import { useState } from "react";
import MoviesList from "./MoviesList";
import ShowHideButton from "./ShowHideButton";

function FoundMovies({ movies }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <MoviesList movies={movies} moviesType={"FOUND"} />}
    </div>
  );
}

export default FoundMovies;
