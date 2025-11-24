import { useState, useEffect } from "react";
import { storage } from "../utils/storage";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = storage.load(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    storage.save(key, value);
  }, [key, value]);

  return [value, setValue];
};
