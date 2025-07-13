import { useState } from "react";
import "./StarRating.css";
import Star from "./Star";

function StarRating({
  maxStars = 5,
  size = 40,
  color = "#EFBF04",
  defaultStarsCount = 0, //can use when we specified initial state value
  setExternalRating = () => {},
  messages = [],
}) {
  const [raiting, setRaiting] = useState(
    defaultStarsCount <= maxStars ? defaultStarsCount : 0
  );
  const [tempRaiting, setTempRaiting] = useState(0);

  function handleRate(newRaiting) {
    setRaiting(newRaiting);
    setExternalRating(newRaiting);
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
            size={size}
            color={color}
          />
        ))}
      </div>

      <p className="starCount" style={{ fontSize: `${size / 1.5}px`, color }}>
        {/* 
         To be refactored:
         If messages.length === maxStars,
         display the messages instead of the numeric rating
         */}
        {messages.length === maxStars
          ? tempRaiting
            ? messages[tempRaiting - 1]
            : messages[raiting - 1]
          : tempRaiting || raiting || ""}
      </p>
    </div>
  );
}

export default StarRating;
