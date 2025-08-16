import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    function closeOnEscape(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [key, callback]);
}
