import { useEffect, useState } from "react";

export function useLocalStorageState(key) {
  const [stored, setStored] = useState(() => {
    const isStored = localStorage.getItem(key);
    return isStored ? JSON.parse(localStorage.getItem(key)) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(stored));
  }, [stored, key]);

  return [stored, setStored];
}
