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
      title: movieData.title,
      runtime: Number(movieData.runtime.split(" ").at(0)) || 0,
      imdbRating: Number(movieData.imdbRating) || 0,
      imdbID: movieData.imdbID,
      poster: movieData.poster,
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
        setMovieData({
          actors: movieInfo.Actors,
          country: movieInfo.Country,
          genre: movieInfo.Genre,
          language: movieInfo.Language,
          plot: movieInfo.Plot,
          poster: movieInfo.Poster,
          runtime: movieInfo.Runtime,
          title: movieInfo.Title,
          imdbID: movieInfo.imdbID,
          imdbRating: movieInfo.imdbRating,
          released: movieInfo.Released,
          director: movieInfo.Director,
        });
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

  useEffect(() => {
    if (movieData?.title) {
      document.title = `KOTFLIX | ${movieData?.title}`;
    }

    return () => {
      document.title = "KOTFLIX";
    };
  }, [movieData?.title]);

  useEffect(() => {
    function closeOnEscape(e) {
      if (e.key === "Escape") {
        closeMovieInfoHandler();
      }
    }
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  });
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
                movieData.poster === "N/A" ? posterNotFound : movieData.poster
              }
              alt={"image of " + movieData.title}
            />
            <div className="details-overview">
              <h3>{movieData.title}</h3>
              <p>
                {movieData.released} &bull; {movieData.runtime}
              </p>
              <p> {movieData.genre}</p>
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
                <p>
                  You already rated this movie {ratedMovie.userRating}{" "}
                  <span>🌟</span>
                </p>
              )}

              {userRating > 0 && (
                <button className="btn-add" onClick={addMovieHandler}>
                  {ratedMovie ? "Change rating ✨" : "+ Add to watched list"}
                </button>
              )}
            </div>

            <p>
              <em>{movieData.plot}</em>
            </p>
            <p>Actors {movieData.actors}</p>
            <p>Directed by {movieData.director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default SelectedMovie;
