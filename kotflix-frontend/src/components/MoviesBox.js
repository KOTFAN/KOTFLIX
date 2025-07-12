import { useState } from "react";
import ShowHideButton from "./ShowHideButton";

function MoviesBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

export default MoviesBox;
