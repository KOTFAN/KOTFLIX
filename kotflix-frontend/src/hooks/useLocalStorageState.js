import { useEffect, useState } from "react";

export function useLocalStorageState(key, initial = []) {
  const [stored, setStored] = useState(() => {
    const isStored = localStorage.getItem(key);
    return isStored ? JSON.parse(localStorage.getItem(key)) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(stored));
  }, [stored, key]);

  return [stored, setStored];
}
