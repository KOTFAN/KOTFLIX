import "./StarRaiting.css";

function StarRaiting({ maxStars = 5 }) {
  return (
    <div className="container">
      <div className="starsContainer">
        {Array.from({ length: maxStars }).map((e, i) => i + 1)}
      </div>
      <p className="starCount"> {maxStars}</p>
    </div>
  );
}

export default StarRaiting;
