import { useEffect, useRef, useState } from "react";

export default function Search({ searchMoviesHandler }) {
  const [query, setQuery] = useState("");
  const inputElement = useRef(null);

  useEffect(() => {
    function keyPressHandler(e) {
      if (e.code === "Enter" && document.activeElement !== inputElement.current) {
        inputElement.current.focus();
        setQuery("");
        searchMoviesHandler("");
      }
    }
    document.addEventListener("keydown", keyPressHandler);
    inputElement.current.focus();

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [searchMoviesHandler]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        searchMoviesHandler(e.target.value);
      }}
      ref={inputElement}
    />
  );
}
