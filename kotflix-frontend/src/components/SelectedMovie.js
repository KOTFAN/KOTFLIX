import { useEffect, useState } from "react";
import StarRating from "./StarRating/StarRating";
import Preloader from "./Preloader";

import posterNotFound from "./../assets/images/mov-not-found.png";

function SelectedMovie({
  movieId,
  closeMovieInfoHandler,
  addToWatchedHandler,
  ratedMovie,
}) {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  function addMovieHandler() {
    const watchedMovie = {
      title: movieData.Title,
      runtime: Number(movieData.Runtime.split(" ").at(0)) || 0,
      imdbRating: Number(movieData.imdbRating) || 0,
      imdbID: movieData.imdbID,
      poster: movieData.Poster,
      userRating: userRating,
    };

    addToWatchedHandler(watchedMovie);
    closeMovieInfoHandler();
  }

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
            <button className="btn-back" onClick={closeMovieInfoHandler}>
              ⬅
            </button>
            <img
              src={
                movieData.Poster === "N/A" ? posterNotFound : movieData.Poster
              }
              alt={"image of " + movieData.Title}
            />
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
            <div className="rating">
              <StarRating
                key={movieId}
                maxStars={10}
                size={25}
                setExternalRating={setUserRating}
              />

              {ratedMovie && (
                <p>U already rated this movie {ratedMovie.userRating}</p>
              )}

              {userRating > 0 && (
                <button className="btn-add" onClick={addMovieHandler}>
                  {ratedMovie ? "Change rating ✨" : "+ Add to watched list"}
                </button>
              )}
            </div>

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
