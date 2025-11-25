import { useState, useEffect } from "react";
import { storage } from "../utils/storage";

// Custom hook that syncs state with localStorage
export const useLocalStorage = (key, initialValue) => {
  // Initialize state with lazy initialization - checks localStorage first
  const [value, setValue] = useState(() => {
    // Try to load existing value from localStorage

     try {
        // Try to load existing value from localStorage  
        const storedValue = storage.load(key);
        // Return stored value if exists, otherwise use initialValue
          return storedValue !== null ? storedValue : initialValue;
      } catch (error) {
        console.warn(`Error loading ${key} from storage:`, error);
        return initialValue;
      }
  });

  // Effect that saves to localStorage whenever value or key changes
  useEffect(() => {
    storage.save(key, value);
  }, [key, value]); // Dependency array - effect runs when key or value changes

  // Return the state and setter function (similar to useState interface)
  return [value, setValue];
};