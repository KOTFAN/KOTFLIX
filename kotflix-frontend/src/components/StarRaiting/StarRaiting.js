import { useState } from "react";
import "./StarRaiting.css";
import Star from "./Star";

function StarRaiting({ maxStars = 5 }) {
  const [raiting, setRaiting] = useState(0);
  const [tempRaiting, setTempRaiting] = useState(0);

  function handleRate(newRaiting) {
    setRaiting(newRaiting);
  }
  return (
    <div className="container">
      <div className="starsContainer">
        {Array.from({ length: maxStars }).map((e, i) => (
          <Star
            key={i}
            isFull={tempRaiting === 0 ? i + 1 <= raiting : i + 1 <= tempRaiting}
            onRate={() => handleRate(i + 1)}
            onHoverIn={() => {
              setTempRaiting(i + 1);
            }}
            onHoverOut={() => {
              setTempRaiting(0);
            }}
          />
        ))}
      </div>
      <p className="starCount"> {tempRaiting || raiting || ""}</p>
    </div>
  );
}

export default StarRaiting;
