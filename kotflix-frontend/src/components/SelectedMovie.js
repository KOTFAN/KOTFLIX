import { useEffect, useState } from "react";
import StarRating from "./StarRating/StarRating";
import Preloader from "./Preloader";

function SelectedMovie({ movieId, closeMovieInfoHandler }) {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function getMovieDetailsHandler(id) {
    const APIKEY = process.env.REACT_APP_OMDB_API_KEY;
    setIsLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
      .then((data) => data.json())
      .then((movieInfo) => {
        setMovieData(movieInfo);
      })
      .catch((err) => {
        console.log("my err🔥", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getMovieDetailsHandler(movieId);
  }, [movieId]);
  return (
    <>
      {!movieData || isLoading ? ( //will fix in future)
        <Preloader />
      ) : (
        <div className="details">
          <header>
            {console.log(movieData)}
            <button className="btn-back" onClick={closeMovieInfoHandler}>
              ⬅
            </button>
            <img src={movieData?.Poster} alt={"image of " + movieData.Title} />
            <div className="details-overview">
              <h3>{movieData.Title}</h3>
              <p>
                {movieData.Released} &bull; {movieData.Runtime}
              </p>
              <p> {movieData.Genre}</p>
              <p>
                <span>⭐{movieData.imdbRating} IMDB Rating</span>
              </p>
            </div>
          </header>
          <section>
            <StarRating key={movieId} maxStars={10} size={25} />
            <p>
              <em>{movieData.Plot}</em>
            </p>
            <p>Actors {movieData.Actors}</p>
            <p>Directed by {movieData.Director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default SelectedMovie;
