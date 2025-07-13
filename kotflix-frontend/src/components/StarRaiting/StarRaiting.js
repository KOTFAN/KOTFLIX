import { useState } from "react";
import "./StarRaiting.css";
import Star from "./Star";

function StarRaiting({ maxStars = 5 }) {
  const [raiting, setRaiting] = useState(0);

  function handleRate(newRaiting) {
    setRaiting(newRaiting);
  }
  return (
    <div className="container">
      <div className="starsContainer">
        {Array.from({ length: maxStars }).map((e, i) => (
          <Star
            key={i}
            isFull={i + 1 <= raiting}
            onRate={() => handleRate(i + 1)}
          />
        ))}
      </div>
      <p className="starCount"> {raiting || ""}</p>
    </div>
  );
}

export default StarRaiting;
