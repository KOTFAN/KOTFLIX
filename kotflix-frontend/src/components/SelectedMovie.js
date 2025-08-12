import { useEffect, useState } from "react";

function SelectedMovie({ movieId }) {
  const [movieData, setMovieData] = useState(null);

  function getMovieDetailsHandler(id) {
    const APIKEY = process.env.REACT_APP_OMDB_API_KEY;
    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
      .then((data) => data.json())
      .then((movieInfo) => {
        setMovieData(movieInfo);
      })
      .catch((err) => console.log("my err🔥", err));
  }
  useEffect(() => {
    getMovieDetailsHandler(movieId);
  }, [movieId]);
  return (
    <>
      {movieData ? (
        <div>
          <span>{movieData.Title}</span>
        </div>
      ) : (
        <div>no movie</div>
      )}
    </>
  );
}

export default SelectedMovie;
