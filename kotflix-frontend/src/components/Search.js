import { useRef, useState } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ searchMoviesHandler }) {
  const [query, setQuery] = useState("");
  const inputElement = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement !== inputElement.current) {
      inputElement.current.focus();
      setQuery("");
      searchMoviesHandler("");
    }
  });

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
